import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const REMOTE = process.env.CHROME_REMOTE_URL ?? "http://127.0.0.1:9222";
const TARGET_URL = "https://upshot.cards/";

const ASSETS = [
  {
    url: "https://upshot.cards/_next/static/media/GoodHeadlinePro-s.p.cc76b22d.otf",
    output: "public/fonts/good-headline-regular.otf",
  },
  {
    url: "https://upshot.cards/_next/static/media/GoodHeadlinePro_Medium-s.p.3765500f.otf",
    output: "public/fonts/good-headline-medium.otf",
  },
  {
    url: "https://upshot.cards/_next/static/media/GoodHeadlinePro_Bold-s.p.f18f39e5.otf",
    output: "public/fonts/good-headline-bold.otf",
  },
  {
    url: "https://upshot.cards/_next/static/media/83afe278b6a6bb3c-s.p.3a6ba036.woff2",
    output: "public/fonts/inter-latin.woff2",
  },
  {
    url: "https://upshot.cards/branding/upshot_logo_bw.svg",
    output: "public/images/upshot-logo-bw.svg",
  },
  {
    url: "https://upshot.cards/branding/shooting_star_icon.svg",
    output: "public/images/shooting-star.svg",
  },
  {
    url: "https://upshot.cards/carousel-stars.svg",
    output: "public/images/carousel-stars.svg",
  },
  {
    url: "https://upshot.cards/social/x.svg",
    output: "public/images/social-x.svg",
  },
  {
    url: "https://upshot.cards/social/discord.svg",
    output: "public/images/social-discord.svg",
  },
  {
    url: "https://upshot.cards/cards/tile-1.png",
    output: "public/images/hero/tile-1.png",
  },
  {
    url: "https://upshot.cards/cards/tile-2.png",
    output: "public/images/hero/tile-2.png",
  },
  {
    url: "https://upshot.cards/cards/tile-3.png",
    output: "public/images/hero/tile-3.png",
  },
  {
    url: "https://upshot.cards/onboard/open-mystery-packs-compressed.mp4",
    output: "public/videos/onboard/open-mystery-packs-compressed.mp4",
  },
  {
    url: "https://upshot.cards/onboard/each-card-is-a-prediction-compressed.mp4",
    output: "public/videos/onboard/each-card-is-a-prediction-compressed.mp4",
  },
  {
    url: "https://upshot.cards/onboard/win-cash-prizes-compressed.mp4",
    output: "public/videos/onboard/win-cash-prizes-compressed.mp4",
  },
  {
    url: "https://upshot.cards/onboard/daily-free-gifts-compressed.mp4",
    output: "public/videos/onboard/daily-free-gifts-compressed.mp4",
  },
  {
    url: "https://upshot.cards/onboard/join-contests-compressed.mp4",
    output: "public/videos/onboard/join-contests-compressed.mp4",
  },
  {
    url: "https://upshot.cards/onboard/open-pack-now-compressed.mp4",
    output: "public/videos/onboard/open-pack-now-compressed.mp4",
  },
  {
    url: "https://arweave.net/QejZ-LBtKbfG17-zd-A_fvuBa3icdeVBkuixIPe0KNI",
    output: "public/images/categories/sports.svg",
  },
  {
    url: "https://arweave.net/IB0yfn0pt64QNIquxtXhpQbaq4zYVR6wF--b-bfTvMc",
    output: "public/images/categories/entertainment.svg",
  },
  {
    url: "https://arweave.net/WQYlWRF7urSBtm8VkvtCjb_YG_EfeL63Tvddnnh6R38",
    output: "public/images/categories/internet-culture.svg",
  },
  {
    url: "https://arweave.net/4Pj7DOLMNKRVenuodzbG5a1RhK3-2URjzlqVU8kopmg",
    output: "public/images/categories/gaming.svg",
  },
  {
    url: "https://arweave.net/qJjOheibzmnTzBJsclr5YTLT7YgnILGYY3eiqHMBiNg",
    output: "public/images/categories/finance.svg",
  },
  {
    url: "https://arweave.net/niQem4Sex7q7aikAJO5qORAYypUWytBtvUzcBnI_HDc",
    output: "public/images/categories/crypto.svg",
  },
  {
    url: "https://arweave.net/7XlnzOdPKz4e7p-D2lC4kch_q1ErU6WgsDKIwzckxF0",
    output: "public/images/categories/politics.svg",
  },
  {
    url: "https://assets.upshotcards.net/packages/event/temp-1773721920290-iw3tgmr.png",
    output: "public/images/events/japan-f1-event.png",
  },
  {
    url: "https://assets.upshotcards.net/packages/card/temp-1773721947462-uaftxk1.png",
    output: "public/images/events/japan-f1-card-1.png",
  },
  {
    url: "https://assets.upshotcards.net/packages/card/temp-1773721951220-tc828lg.png",
    output: "public/images/events/japan-f1-card-2.png",
  },
  {
    url: "https://assets.upshotcards.net/packages/card/temp-1773721954999-r13jeqb.png",
    output: "public/images/events/japan-f1-card-3.png",
  },
  {
    url: "https://assets.upshotcards.net/packages/card/temp-1773722127984-iczwcn5.png",
    output: "public/images/events/japan-f1-card-4.png",
  },
  {
    url: "https://assets.upshotcards.net/packages/event/temp-1773420779958-pmycay7.png",
    output: "public/images/events/ncaa-event.png",
  },
  {
    url: "https://assets.upshotcards.net/packages/card/temp-1773420803910-febg6qx.png",
    output: "public/images/events/ncaa-card-1.png",
  },
  {
    url: "https://assets.upshotcards.net/packages/card/temp-1773420807352-m7une65.png",
    output: "public/images/events/ncaa-card-2.png",
  },
  {
    url: "https://assets.upshotcards.net/uploads/1773472257791-image.png",
    output: "public/images/contests/pick-3-sports-madness.png",
  },
  {
    url: "https://assets.upshotcards.net/uploads/1773377590270-image.png",
    output: "public/images/contests/pick-5-mid-march-prime-time.png",
  },
  {
    url: "https://arweave.net/CGMLYAnJUCjxbls8IZs1b9NeK8_6DmKBnPG5fJ_DNYU",
    output: "public/images/contests/pick-5-march-markets-and-power.png",
  },
  {
    url: "https://arweave.net/gpCB1rhieKYYXhhAoev35jZfrXEhkCvU6SBWp1IBu3w",
    output: "public/images/contests/pick-5-march-screens-and-scoreboards.png",
  },
  {
    url: "https://assets.upshotcards.net/packages/card/temp-1773760319221-l2k8mfq.png",
    output: "public/images/cards/featured-1.png",
  },
  {
    url: "https://assets.upshotcards.net/packages/card/temp-1773760151691-vrziltn.png",
    output: "public/images/cards/featured-2.png",
  },
  {
    url: "https://assets.upshotcards.net/packages/card/temp-1773720186887-ing36ut.png",
    output: "public/images/cards/featured-3.png",
  },
  {
    url: "https://assets.upshotcards.net/packages/card/temp-1774243779312-c1ztwct.png",
    output: "public/images/cards/featured-4.png",
  },
  {
    url: "https://assets.upshotcards.net/packages/card/temp-1774240657460-e6w9abu.png",
    output: "public/images/cards/featured-5.png",
  },
  {
    url: "https://assets.upshotcards.net/packages/card/temp-1774243400445-ynfpvq2.png",
    output: "public/images/cards/featured-6.png",
  },
  {
    url: "https://assets.upshotcards.net/packages/card/temp-1774242684954-v1rybdc.png",
    output: "public/images/cards/featured-7.png",
  },
  {
    url: "https://assets.upshotcards.net/packages/card/temp-1774245056842-ylpdvmo.png",
    output: "public/images/cards/featured-8.png",
  },
];

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
  if (!exact) {
    throw new Error("Upshot page target not found in local headless Chrome. Start inspect-upshot first.");
  }
  return exact;
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

async function downloadViaBrowser(client, url) {
  return await evaluate(
    client,
    `(async () => {
      const response = await fetch(${JSON.stringify(url)}, { credentials: "include" });
      if (!response.ok) {
        throw new Error(\`Fetch failed for ${url}: \${response.status} \${response.statusText}\`);
      }

      const bytes = new Uint8Array(await response.arrayBuffer());
      let binary = "";
      const chunkSize = 0x8000;
      for (let index = 0; index < bytes.length; index += chunkSize) {
        binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
      }

      return {
        base64: btoa(binary),
        contentType: response.headers.get("content-type"),
      };
    })()`,
  );
}

async function downloadDirect(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36",
    },
  });

  if (!response.ok) {
    throw new Error(`Fetch failed for ${url}: ${response.status} ${response.statusText}`);
  }

  return {
    bytes: new Uint8Array(await response.arrayBuffer()),
    contentType: response.headers.get("content-type"),
  };
}

async function downloadAsset(client, url) {
  try {
    const downloaded = await downloadViaBrowser(client, url);
    return {
      bytes: Buffer.from(downloaded.base64, "base64"),
      contentType: downloaded.contentType,
      transport: "browser",
    };
  } catch {
    const downloaded = await downloadDirect(url);
    return {
      bytes: Buffer.from(downloaded.bytes),
      contentType: downloaded.contentType,
      transport: "direct",
    };
  }
}

async function main() {
  const target = await ensureTarget();
  const client = new CdpClient(target.webSocketDebuggerUrl);
  await client.connect();

  try {
    await client.send("Runtime.enable");

    for (const asset of ASSETS) {
      const outputPath = path.join(ROOT, asset.output);
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      const alreadyExists = await fs
        .access(outputPath)
        .then(() => true)
        .catch(() => false);
      if (alreadyExists) {
        console.log(`skip ${asset.output}`);
        continue;
      }
      const downloaded = await downloadAsset(client, asset.url);
      await fs.writeFile(outputPath, downloaded.bytes);
      console.log(`${asset.url} -> ${asset.output} (${downloaded.contentType ?? "unknown"}, ${downloaded.transport})`);
    }
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
