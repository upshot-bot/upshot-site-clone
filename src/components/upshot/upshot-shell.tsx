/* eslint-disable @next/next/no-img-element */

import type { ComponentPropsWithoutRef, ReactNode } from "react";

import Link from "next/link";

import { DocsIcon } from "@/components/icons";
import { AnalyticsBanner } from "@/components/upshot/analytics-banner";
import { footerLinks, navLinks, socialLinks } from "@/lib/upshot-data";

export const primaryButtonClass =
  "inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#89fdfc] to-[#96e3ff] px-4 py-2.5 font-good-headline-medium text-[14px] leading-5 text-[#111] md:px-5";

export const secondaryButtonClass =
  "inline-flex items-center justify-center rounded-full bg-[#221f40] px-4 py-2.5 font-good-headline-medium text-[14px] leading-5 text-white md:px-5";

const headerLogoSrc = "https://upshot.cards/branding/upshot_logo.svg?dpl=dpl_HexM6xPEaL4oYURmoJQ2PKD6Fn5h";

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

type UpshotLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
};

export function UpshotLink({ href, children, rel, target, ...props }: UpshotLinkProps) {
  if (isExternalHref(href)) {
    return (
      <a href={href} rel={rel ?? "noreferrer"} target={target ?? "_blank"} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} rel={rel} target={target} {...props}>
      {children}
    </Link>
  );
}

export function UpshotHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#050505f2] backdrop-blur-[10px]">
      <div className="mx-auto flex h-[52px] w-full max-w-[1120px] items-center justify-between px-3 md:px-4">
        <div className="flex items-center gap-4">
          <UpshotLink href="/" className="flex shrink-0 items-center gap-4" aria-label="Go to homepage">
            <img src={headerLogoSrc} alt="Upshot" className="h-[22px] w-[75px] object-contain md:h-[28px] md:w-[98px]" />
            <span className="hidden h-6 w-px bg-white/14 md:block" aria-hidden="true" />
          </UpshotLink>
          <nav className="hidden items-center gap-5 md:flex">
            {navLinks.map((link) => (
              <UpshotLink
                key={link.label}
                href={link.href}
                className="font-sans text-[11px] font-medium leading-4 text-white/78 transition-colors hover:text-white lg:text-[13px]"
              >
                {link.label}
              </UpshotLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <UpshotLink
            href="https://docs.upshot.cards/"
            className="hidden h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-[#171717] text-white/60 transition-colors hover:text-white/85 md:flex"
            aria-label="Docs"
          >
            <DocsIcon className="h-[13px] w-[13px]" />
          </UpshotLink>
          <UpshotLink
            href="/login"
            className="rounded-full bg-[#a8ebff] px-4 py-2 font-sans text-[11px] font-semibold leading-4 text-[#111] transition-transform hover:scale-[1.01] md:px-6 md:text-[13px]"
          >
            Login / Register
          </UpshotLink>
        </div>
      </div>
    </header>
  );
}

export function UpshotFooter() {
  return (
    <footer className="mx-auto flex w-full max-w-[1120px] flex-col gap-6 px-4 pb-8 pt-5 md:flex-row md:items-end md:justify-between md:px-4 md:pb-10">
      <div className="flex flex-col items-start gap-6">
        <UpshotLink href="/" aria-label="Go to homepage">
          <img src="/images/upshot-logo-bw.svg" alt="Upshot" className="h-[28px] w-[69px]" />
        </UpshotLink>
        <span className="max-w-[200px] font-sans text-[12px] leading-4 text-[#999] md:max-w-none">
          © 2026 Upshot. All rights reserved.
        </span>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <UpshotLink key={link.label} href={link.href} aria-label={link.label}>
              <img src={link.icon} alt="" className="h-5 w-5" />
            </UpshotLink>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 md:items-end">
        <div className="flex items-center gap-4">
          {footerLinks.map((link) => (
            <UpshotLink
              key={link.label}
              href={link.href}
              className="font-sans text-[14px] leading-5 text-[#999] underline underline-offset-4 transition-colors hover:text-white"
            >
              {link.label}
            </UpshotLink>
          ))}
        </div>
      </div>
    </footer>
  );
}

export function UpshotPageFrame({
  children,
  showAnalyticsBanner = true,
}: {
  children: ReactNode;
  showAnalyticsBanner?: boolean;
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed]">
      <UpshotHeader />
      <main className="overflow-x-clip pt-[52px]">
        {children}
        <UpshotFooter />
      </main>
      {showAnalyticsBanner ? <AnalyticsBanner /> : null}
    </div>
  );
}
