import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DESIGN_DIR = path.join(ROOT, "docs", "design-references");
const RESEARCH_DIR = path.join(ROOT, "docs", "research");
const REMOTE = process.env.CHROME_REMOTE_URL ?? "http://127.0.0.1:9222";
const TARGET_URL = process.argv[2] ?? "https://upshot.cards/";

class CdpClient {
  #id = 0;
  #pending = new Map();
  #ws;

  constructor(wsUrl) {
    this.wsUrl = wsUrl;
  }

  async connect() {
    this.#ws = new WebSocket(this.wsUrl);

    await new Promise((resolve, reject) => {
      const handleOpen = () => {
        this.#ws.removeEventListener("error", handleError);
        resolve();
      };
      const handleError = (event) => {
        this.#ws.removeEventListener("open", handleOpen);
        reject(event.error ?? new Error("Failed to connect to Chrome DevTools"));
      };

      this.#ws.addEventListener("open", handleOpen, { once: true });
      this.#ws.addEventListener("error", handleError, { once: true });
    });

    this.#ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (!("id" in message)) {
        return;
      }

      const pending = this.#pending.get(message.id);
      if (!pending) {
        return;
      }

      this.#pending.delete(message.id);

      if (message.error) {
        pending.reject(new Error(message.error.message));
        return;
      }

      pending.resolve(message.result);
    });
  }

  async send(method, params = {}) {
    const id = ++this.#id;
    const payload = JSON.stringify({ id, method, params });

    return await new Promise((resolve, reject) => {
      this.#pending.set(id, { resolve, reject });
      this.#ws.send(payload, (error) => {
        if (!error) {
          return;
        }
        this.#pending.delete(id);
        reject(error);
      });
    });
  }

  async close() {
    if (!this.#ws) {
      return;
    }

    await new Promise((resolve) => {
      this.#ws.addEventListener("close", () => resolve(), { once: true });
      this.#ws.close();
    });
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fileSafe(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

async function fetchJson(url, init) {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return await response.json();
}

async function ensureTarget() {
  const targets = await fetchJson(`${REMOTE}/json/list`);
  const exact = targets.find(
    (target) => target.type === "page" && target.url.replace(/\/$/, "") === TARGET_URL.replace(/\/$/, ""),
  );
  if (exact) {
    return exact;
  }

  const created = await fetchJson(`${REMOTE}/json/new?${encodeURIComponent(TARGET_URL)}`, { method: "PUT" });
  await sleep(1500);
  return created;
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });

  if (result.exceptionDetails) {
    const message =
      result.exceptionDetails.exception?.description ??
      result.exceptionDetails.exception?.value ??
      result.exceptionDetails.text;
    throw new Error(`Runtime evaluation failed: ${message}`);
  }

  return result.result.value;
}

async function setViewport(client, options) {
  const {
    width,
    height,
    mobile = false,
    deviceScaleFactor = 1,
  } = options;

  await client.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    mobile,
    deviceScaleFactor,
    screenWidth: width,
    screenHeight: height,
  });

  if (mobile) {
    await client.send("Emulation.setUserAgentOverride", {
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
      platform: "iPhone",
    });
  } else {
    await client.send("Emulation.setUserAgentOverride", {
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36",
      platform: "MacIntel",
    });
  }
}

async function waitForSettled(client) {
  await evaluate(
    client,
    `(async () => {
      if (document.readyState !== "complete") {
        await new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));
      }
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      await new Promise((resolve) => setTimeout(resolve, 1200));
      return {
        readyState: document.readyState,
        title: document.title,
        height: document.documentElement.scrollHeight,
      };
    })()`,
  );
}

async function captureFullPage(client, outputPath) {
  const metrics = await client.send("Page.getLayoutMetrics");
  const contentSize = metrics.cssContentSize ?? metrics.contentSize;
  const screenshot = await client.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: true,
    clip: {
      x: 0,
      y: 0,
      width: Math.ceil(contentSize.width),
      height: Math.ceil(contentSize.height),
      scale: 1,
    },
  });

  await fs.writeFile(outputPath, Buffer.from(screenshot.data, "base64"));
}

async function captureClip(client, rect, outputPath) {
  const screenshot = await client.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: true,
    clip: {
      x: Math.max(0, rect.left),
      y: Math.max(0, rect.top),
      width: Math.max(1, rect.width),
      height: Math.max(1, rect.height),
      scale: 1,
    },
  });

  await fs.writeFile(outputPath, Buffer.from(screenshot.data, "base64"));
}

function buildMarkdownList(items) {
  if (!items.length) {
    return "- None";
  }
  return items.map((item) => `- ${item}`).join("\n");
}

function renderDesignTokens(data) {
  const colors = data.colors.map((entry) => `- \`${entry.value}\` used ${entry.count} times`).join("\n") || "- None";
  const backgrounds =
    data.backgroundColors.map((entry) => `- \`${entry.value}\` used ${entry.count} times`).join("\n") || "- None";
  const fonts =
    data.fontFamilies.map((entry) => `- \`${entry.family}\` on ${entry.count} sampled elements`).join("\n") || "- None";

  return `# Design Tokens

## Fonts
${fonts}

## Loaded Font Faces
${buildMarkdownList(data.fontFaces.map((face) => `\`${face.family}\` weight ${face.weight || "auto"} style ${face.style || "normal"} (${face.status})`))}

## Text Colors
${colors}

## Background Colors
${backgrounds}

## Radius Samples
${buildMarkdownList(data.radiusSamples.map((entry) => `\`${entry.value}\` used ${entry.count} times`))}

## Shadow Samples
${buildMarkdownList(data.shadowSamples.map((entry) => `\`${entry.value}\` used ${entry.count} times`))}
`;
}

function renderPageTopology(data) {
  const sections = data.sections
    .map((section, index) => {
      const name = section.heading || section.ariaLabel || `${section.tag}.${section.className || "section"}`;
      return `## ${index + 1}. ${name}

- Tag: \`${section.tag}\`
- Classes: \`${section.className || "(none)"}\`
- Approx. size: ${section.rect.width}px x ${section.rect.height}px
- Top offset: ${section.rect.top}px
- Text sample: ${section.textSample || "N/A"}
- Images: ${section.imageCount}
- Links: ${section.linkCount}
- Buttons: ${section.buttonCount}
- Background: \`${section.styles.backgroundColor || section.styles.background || "transparent"}\`
`;
    })
    .join("\n");

  return `# Page Topology

- URL: ${data.url}
- Title: ${data.title}
- Main height: ${data.page.height}px
- Fixed elements: ${data.fixedElements.length}
- Scroll containers: ${data.scrollContainers.length}

${sections}
`;
}

function renderBehaviorNotes(data) {
  return `# Behaviors

## Observed Platform Signals
- Page height at desktop inspection: ${data.page.height}px
- Fixed elements discovered: ${data.fixedElements.length}
- Scroll containers discovered: ${data.scrollContainers.length}
- Reduced motion preference in browser: ${data.page.prefersReducedMotion}

## Fixed Elements
${buildMarkdownList(
    data.fixedElements.map(
      (element) =>
        `\`${element.tag}\` \`${element.className || "(no class)"}\` at top ${element.rect.top}px left ${element.rect.left}px`,
    ),
  )}

## Interactive Elements
${buildMarkdownList(
    data.interactiveElements
      .slice(0, 40)
      .map((element) => `${element.tag} "${element.label || element.href || element.className || "unlabeled"}"`),
  )}

## Notes
- A full hover and scroll-state diff still needs per-section extraction once the static baseline is in place.
- The page embeds Privy wallet UI and hCaptcha frames. Those are out of scope for the static marketing clone baseline.
`;
}

function renderLayoutArchitecture(data) {
  return `# Layout Architecture

## Root Containers
${buildMarkdownList(
    data.layoutRoots.map(
      (root) =>
        `\`${root.tag}\` \`${root.className || "(no class)"}\` display ${root.styles.display || "block"} width ${root.styles.width || "auto"}`,
    ),
  )}

## Scroll Containers
${buildMarkdownList(
    data.scrollContainers.map(
      (container) =>
        `\`${container.tag}\` \`${container.className || "(no class)"}\` overflowY ${container.styles.overflowY || "visible"} height ${container.styles.height || "auto"}`,
    ),
  )}

## Sticky or Fixed Layers
${buildMarkdownList(
    data.fixedElements.map(
      (element) =>
        `\`${element.tag}\` \`${element.className || "(no class)"}\` position ${element.styles.position} z-index ${element.styles.zIndex || "auto"}`,
    ),
  )}
`;
}

function renderTechStack(data) {
  return `# Tech Stack Analysis

## Signals
${buildMarkdownList(data.techSignals)}

## Scripts
${buildMarkdownList(data.scripts.slice(0, 30).map((script) => script.src || "[inline script]"))}

## Stylesheets
${buildMarkdownList(data.stylesheets.map((sheet) => sheet.href))}
`;
}

function renderComponentInventory(data) {
  const lines = data.sections.map((section, index) => {
    const name = section.heading || section.ariaLabel || `${section.tag}.${section.className || "section"}`;
    return `## ${index + 1}. ${name}
- Container: \`${section.tag}\`
- Headings: ${section.headings.length ? section.headings.join(" | ") : "None"}
- Buttons: ${section.buttons.length ? section.buttons.map((button) => button.label || "[icon button]").join(" | ") : "None"}
- Links: ${section.links.length ? section.links.map((link) => link.label || link.href || "[link]").join(" | ") : "None"}
- Images: ${section.images.length ? section.images.map((image) => image.src).join(" | ") : "None"}
`;
  });

  return `# Component Inventory

${lines.join("\n")}
`;
}

const extractionExpression = `(() => {
  const clean = (value) => String(value ?? "").replace(/\\s+/g, " ").trim();
  const topEntries = (map, limit = 12) =>
    [...map.entries()]
      .sort((left, right) => right[1] - left[1])
      .slice(0, limit)
      .map(([value, count]) => ({ value, count }));
  const styleSubset = (element) => {
    const styles = getComputedStyle(element);
    const keys = [
      "display",
      "position",
      "width",
      "height",
      "maxWidth",
      "minHeight",
      "paddingTop",
      "paddingRight",
      "paddingBottom",
      "paddingLeft",
      "marginTop",
      "marginBottom",
      "gap",
      "justifyContent",
      "alignItems",
      "background",
      "backgroundColor",
      "color",
      "borderRadius",
      "boxShadow",
      "overflow",
      "overflowY",
      "zIndex",
      "fontFamily",
      "fontSize",
      "fontWeight",
      "lineHeight"
    ];
    return Object.fromEntries(keys.map((key) => [key, styles[key]]));
  };

  const sampledElements = [...document.querySelectorAll("body *")].slice(0, 1800);
  const colorCounts = new Map();
  const backgroundCounts = new Map();
  const fontCounts = new Map();
  const radiusCounts = new Map();
  const shadowCounts = new Map();

  for (const element of sampledElements) {
    const styles = getComputedStyle(element);
    const color = styles.color;
    const background = styles.backgroundColor;
    const fontFamily = styles.fontFamily;
    const radius = styles.borderRadius;
    const shadow = styles.boxShadow;

    if (color && color !== "rgba(0, 0, 0, 0)") {
      colorCounts.set(color, (colorCounts.get(color) || 0) + 1);
    }
    if (background && background !== "rgba(0, 0, 0, 0)") {
      backgroundCounts.set(background, (backgroundCounts.get(background) || 0) + 1);
    }
    if (fontFamily) {
      fontCounts.set(fontFamily, (fontCounts.get(fontFamily) || 0) + 1);
    }
    if (radius && radius !== "0px") {
      radiusCounts.set(radius, (radiusCounts.get(radius) || 0) + 1);
    }
    if (shadow && shadow !== "none") {
      shadowCounts.set(shadow, (shadowCounts.get(shadow) || 0) + 1);
    }
  }

  const iconLinks = [...document.querySelectorAll('link[rel*="icon"], link[rel="manifest"], meta[property="og:image"]')].map((node) => ({
    rel: node.rel || node.getAttribute("property"),
    href: node.href || node.content,
    sizes: node.sizes?.toString() || null
  }));

  const stylesheets = [...document.querySelectorAll('link[rel="stylesheet"]')].map((sheet) => ({
    href: sheet.href
  }));

  const scripts = [...document.querySelectorAll("script")].map((script) => ({
    src: script.src || null,
    type: script.type || null
  }));

  const main = document.querySelector("main") || document.body;
  const sectionCandidates = [...main.children].filter((element) => element.getBoundingClientRect().height > 40);
  const sections = sectionCandidates.map((element) => {
    const rect = element.getBoundingClientRect();
    const headings = [...element.querySelectorAll("h1, h2, h3")].map((heading) => clean(heading.textContent)).filter(Boolean);
    const links = [...element.querySelectorAll("a")].slice(0, 20).map((link) => ({
      label: clean(link.textContent),
      href: link.href || null
    }));
    const buttons = [...element.querySelectorAll("button")].slice(0, 20).map((button) => ({
      label: clean(button.textContent),
      ariaLabel: button.getAttribute("aria-label")
    }));
    const images = [...element.querySelectorAll("img")].slice(0, 20).map((image) => ({
      src: image.currentSrc || image.src || null,
      alt: image.alt || "",
      width: image.naturalWidth,
      height: image.naturalHeight
    }));

    return {
      tag: element.tagName.toLowerCase(),
      id: element.id || null,
      ariaLabel: element.getAttribute("aria-label"),
      className: clean(element.className),
      heading: headings[0] || null,
      headings,
      textSample: clean(element.innerText).slice(0, 220),
      rect: {
        top: Math.round(rect.top + window.scrollY),
        left: Math.round(rect.left + window.scrollX),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      },
      styles: styleSubset(element),
      imageCount: element.querySelectorAll("img").length,
      linkCount: element.querySelectorAll("a").length,
      buttonCount: element.querySelectorAll("button").length,
      links,
      buttons,
      images
    };
  });

  const fixedElements = [...document.querySelectorAll("body *")]
    .filter((element) => {
      const styles = getComputedStyle(element);
      return (styles.position === "fixed" || styles.position === "sticky") && element.getBoundingClientRect().height > 20;
    })
    .slice(0, 20)
    .map((element) => {
      const rect = element.getBoundingClientRect();
      return {
        tag: element.tagName.toLowerCase(),
        className: clean(element.className),
        rect: {
          top: Math.round(rect.top + window.scrollY),
          left: Math.round(rect.left + window.scrollX),
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        },
        styles: styleSubset(element)
      };
    });

  const scrollContainers = [...document.querySelectorAll("body *")]
    .filter((element) => {
      const styles = getComputedStyle(element);
      return ["auto", "scroll"].includes(styles.overflowY) && element.scrollHeight > element.clientHeight + 20;
    })
    .slice(0, 20)
    .map((element) => ({
      tag: element.tagName.toLowerCase(),
      className: clean(element.className),
      styles: styleSubset(element)
    }));

  const interactiveElements = [...document.querySelectorAll("a, button, [role=\\"button\\"]")]
    .slice(0, 80)
    .map((element) => ({
      tag: element.tagName.toLowerCase(),
      className: clean(element.className),
      label: clean(element.textContent) || element.getAttribute("aria-label"),
      href: element.href || null
    }));

  const backgroundImages = [...document.querySelectorAll("body *")]
    .map((element) => {
      const backgroundImage = getComputedStyle(element).backgroundImage;
      if (!backgroundImage || backgroundImage === "none") {
        return null;
      }
      return {
        tag: element.tagName.toLowerCase(),
        className: clean(element.className),
        backgroundImage
      };
    })
    .filter(Boolean)
    .slice(0, 50);

  const assets = {
    images: [...new Set([...document.querySelectorAll("img")].map((image) => image.currentSrc || image.src).filter(Boolean))],
    videos: [...new Set([...document.querySelectorAll("video")].flatMap((video) => [video.currentSrc || video.src, video.poster]).filter(Boolean))],
    backgroundImages
  };

  const structuredLinks = (selector, filter) =>
    [...document.querySelectorAll(selector)]
      .filter((element) => (filter ? filter(element) : true))
      .map((element) => ({
        href: element.href || null,
        text: clean(element.innerText),
        label: clean(element.textContent),
        image: element.querySelector("img")?.currentSrc || element.querySelector("img")?.src || null,
      }));

  const html = document.documentElement;
  const body = document.body;
  const techSignals = [];
  if (document.querySelector("script[src*='_next']")) techSignals.push("Next.js runtime assets detected");
  if ([...document.querySelectorAll("*")].some((node) => clean(node.className).includes("lenis"))) techSignals.push("Lenis class detected");
  if (scripts.some((script) => (script.src || "").includes("privy"))) techSignals.push("Privy embed scripts detected");
  if (scripts.some((script) => (script.src || "").includes("hcaptcha"))) techSignals.push("hCaptcha detected");

  return {
    url: location.href,
    title: document.title,
    lang: html.lang || null,
    metaDescription: document.querySelector('meta[name="description"]')?.content || null,
    themeColor: document.querySelector('meta[name="theme-color"]')?.content || null,
    page: {
      width: Math.round(html.clientWidth),
      height: Math.round(html.scrollHeight),
      bodyBackground: getComputedStyle(body).backgroundColor,
      prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
    },
    colors: topEntries(colorCounts),
    backgroundColors: topEntries(backgroundCounts),
    fontFamilies: topEntries(fontCounts, 8).map((entry) => ({ family: entry.value, count: entry.count })),
    radiusSamples: topEntries(radiusCounts, 8),
    shadowSamples: topEntries(shadowCounts, 8),
    fontFaces: [...document.fonts].map((font) => ({
      family: font.family,
      weight: font.weight,
      style: font.style,
      status: font.status
    })),
    icons: iconLinks,
    stylesheets,
    scripts,
    layoutRoots: [document.body, main].filter(Boolean).map((element) => ({
      tag: element.tagName.toLowerCase(),
      className: clean(element.className),
      styles: styleSubset(element)
    })),
    sections,
    fixedElements,
    scrollContainers,
    interactiveElements,
    assets,
    header: document.querySelector("header")
      ? {
          text: clean(document.querySelector("header").innerText),
          styles: styleSubset(document.querySelector("header")),
          actions: [...document.querySelector("header").querySelectorAll("a, button")].map((element) => ({
            tag: element.tagName.toLowerCase(),
            label: clean(element.innerText) || element.getAttribute("aria-label"),
            href: element.href || null,
          })),
        }
      : null,
    footer: document.querySelector("footer")
      ? {
          text: clean(document.querySelector("footer").innerText),
          styles: styleSubset(document.querySelector("footer")),
          links: [...document.querySelector("footer").querySelectorAll("a")].map((element) => ({
            label: clean(element.innerText) || element.getAttribute("aria-label"),
            href: element.href || null,
          })),
        }
      : null,
    eventCards: structuredLinks(
      "a[href*='/event/']",
      (element) => /\\/event\\/[a-z0-9]/i.test(new URL(element.href).pathname),
    ).slice(0, 12),
    contests: structuredLinks(
      "a[href*='/contests/']",
      (element) => /\\/contests\\/[a-z0-9]/i.test(new URL(element.href).pathname),
    ).slice(0, 12),
    cards: structuredLinks(
      "a[href*='/card-detail/']",
      (element) => /\\/card-detail\\/[a-z0-9]/i.test(new URL(element.href).pathname),
    ).slice(0, 16),
    techSignals
  };
})()`;

async function main() {
  await fs.mkdir(DESIGN_DIR, { recursive: true });
  await fs.mkdir(RESEARCH_DIR, { recursive: true });
  await fs.mkdir(path.join(RESEARCH_DIR, "stylesheets"), { recursive: true });

  const target = await ensureTarget();
  const client = new CdpClient(target.webSocketDebuggerUrl);
  await client.connect();

  try {
    await client.send("Page.enable");
    await client.send("Runtime.enable");
    await client.send("DOM.enable");

    await setViewport(client, { width: 1440, height: 900, mobile: false, deviceScaleFactor: 1 });
    await client.send("Page.navigate", { url: TARGET_URL });
    await waitForSettled(client);
    await evaluate(client, "window.scrollTo({ top: 0, behavior: 'instant' });");
    await sleep(500);

    const desktopFile = path.join(DESIGN_DIR, `${fileSafe(new URL(TARGET_URL).hostname)}-desktop-full.png`);
    await captureFullPage(client, desktopFile);
    const desktopData = await evaluate(client, extractionExpression);
    const stylesheetContents = await evaluate(
      client,
      `(async () => {
        const links = [...document.querySelectorAll('link[rel="stylesheet"]')];
        const results = [];
        for (const link of links) {
          const response = await fetch(link.href, { credentials: "include" });
          results.push({
            href: link.href,
            content: await response.text()
          });
        }
        return results;
      })()`,
    );
    for (let index = 0; index < desktopData.sections.length; index += 1) {
      const section = desktopData.sections[index];
      const sectionName = fileSafe(section.heading || section.ariaLabel || `${index + 1}-${section.tag}`);
      const outputPath = path.join(DESIGN_DIR, `${String(index + 1).padStart(2, "0")}-${sectionName}.png`);
      await captureClip(client, section.rect, outputPath);
    }

    await setViewport(client, { width: 390, height: 844, mobile: true, deviceScaleFactor: 3 });
    await client.send("Page.navigate", { url: TARGET_URL });
    await waitForSettled(client);
    await evaluate(client, "window.scrollTo({ top: 0, behavior: 'instant' });");
    await sleep(500);

    const mobileFile = path.join(DESIGN_DIR, `${fileSafe(new URL(TARGET_URL).hostname)}-mobile-full.png`);
    await captureFullPage(client, mobileFile);
    const mobileData = await evaluate(client, extractionExpression);

    const rawOutput = {
      desktop: desktopData,
      mobile: mobileData,
      stylesheets: stylesheetContents.map((sheet) => sheet.href),
      screenshots: {
        desktop: path.relative(ROOT, desktopFile),
        mobile: path.relative(ROOT, mobileFile),
      },
      capturedAt: new Date().toISOString(),
    };

    for (let index = 0; index < stylesheetContents.length; index += 1) {
      const stylesheet = stylesheetContents[index];
      const stylesheetName = `${String(index + 1).padStart(2, "0")}-${fileSafe(path.basename(new URL(stylesheet.href).pathname) || `stylesheet-${index + 1}`)}.css`;
      await fs.writeFile(path.join(RESEARCH_DIR, "stylesheets", stylesheetName), stylesheet.content);
    }

    await fs.writeFile(path.join(RESEARCH_DIR, "raw-page-data.json"), JSON.stringify(rawOutput, null, 2));
    await fs.writeFile(path.join(RESEARCH_DIR, "DESIGN_TOKENS.md"), renderDesignTokens(desktopData));
    await fs.writeFile(path.join(RESEARCH_DIR, "PAGE_TOPOLOGY.md"), renderPageTopology(desktopData));
    await fs.writeFile(path.join(RESEARCH_DIR, "BEHAVIORS.md"), renderBehaviorNotes(desktopData));
    await fs.writeFile(path.join(RESEARCH_DIR, "LAYOUT_ARCHITECTURE.md"), renderLayoutArchitecture(desktopData));
    await fs.writeFile(path.join(RESEARCH_DIR, "TECH_STACK_ANALYSIS.md"), renderTechStack(desktopData));
    await fs.writeFile(path.join(RESEARCH_DIR, "COMPONENT_INVENTORY.md"), renderComponentInventory(desktopData));

    console.log(JSON.stringify(rawOutput, null, 2));
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
