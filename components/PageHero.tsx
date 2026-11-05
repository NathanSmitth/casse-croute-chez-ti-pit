import type { ReactNode } from "react";

// Inner-page header: seafoam band, left-aligned, typographic. All text is
// pure white (dimmed white and mint text fail AA on #3E7D6E).
export default function PageHero({
  eyebrow,
  heading,
  subheading,
  children,
}: {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  /** Extra row under the subheading (e.g. the cash-only info row) */
  children?: ReactNode;
}) {
  return (
    <section className="on-green bg-seafoam pb-12 pt-32 sm:pb-16 sm:pt-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="rise mb-3 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white">
            <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-mint" />
            {eyebrow}
          </p>
        )}
        <h1
          className="rise text-5xl font-bold tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {heading}
        </h1>
        {subheading && (
          <p
            className="rise mt-5 max-w-[52ch] text-lg leading-relaxed text-white"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {subheading}
          </p>
        )}
        {children && (
          <div className="rise mt-6" style={{ "--i": 3 } as React.CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
