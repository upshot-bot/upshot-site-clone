import type { SVGProps } from "react";

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function DocsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 6.4c-1.45-1.18-3.3-1.78-5.55-1.78A1.35 1.35 0 0 0 5.1 5.97v9.9a1.35 1.35 0 0 0 1.35 1.35c2.15 0 4 .52 5.55 1.57" />
      <path d="M12 6.4c1.45-1.18 3.3-1.78 5.55-1.78a1.35 1.35 0 0 1 1.35 1.35v9.9a1.35 1.35 0 0 1-1.35 1.35c-2.15 0-4 .52-5.55 1.57" />
      <path d="M12 6.55v12.1" />
    </svg>
  );
}

export function SparkleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="m12 1.5 2.3 6.2 6.2 2.3-6.2 2.3L12 18.5l-2.3-6.2-6.2-2.3 6.2-2.3L12 1.5Z" />
      <path d="m19.5 14 1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z" />
    </svg>
  );
}
