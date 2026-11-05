import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Small uppercase eyebrow + large tight heading, left-aligned.
// `action` sits to the right on desktop (e.g. "Voir le menu complet →").
// tone="green": for sections on seafoam. All text is pure white there —
// mint text and dimmed white both fail AA on #3E7D6E — and the mint accent
// lives in the small bar before the eyebrow instead.
export default function SectionHeader({
  eyebrow,
  heading,
  intro,
  action,
  tone = "light",
  className,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  action?: ReactNode;
  tone?: "light" | "green";
  className?: string;
}) {
  const green = tone === "green";
  return (
    <div
      data-reveal
      className={cn(
        "mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8",
        className
      )}
    >
      <div className="max-w-2xl">
        <p
          className={cn(
            "mb-3 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em]",
            green ? "text-white" : "text-seafoam-dark"
          )}
        >
          {green && <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-mint" />}
          {eyebrow}
        </p>
        <h2 className={cn("text-[2.25rem] font-bold sm:text-5xl lg:text-[3.5rem]", green ? "text-white" : "text-charcoal")}>
          {heading}
        </h2>
        {intro && (
          <p className={cn("mt-4 max-w-[54ch] text-lg leading-relaxed", green ? "text-white" : "text-charcoal/75")}>
            {intro}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
