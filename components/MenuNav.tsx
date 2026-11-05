"use client";

import { useEffect, useRef, useState } from "react";

// Sticky category strip. Real anchor links (work without JS); the active pill
// follows the scroll position and is kept in view.
export default function MenuNav({ tabs, label }: { tabs: { id: string; label: string }[]; label: string }) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const stripRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Active = last section whose top has passed just below the header + strip.
    // rAF-throttled so it runs at most once per frame.
    const OFFSET = 170;
    let frame = 0;
    const pick = () => {
      frame = 0;
      let current = tabs[0]?.id ?? "";
      for (const t of tabs) {
        const el = document.getElementById(t.id);
        if (el && el.getBoundingClientRect().top <= OFFSET) current = t.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(pick);
    };
    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [tabs]);

  useEffect(() => {
    const strip = stripRef.current;
    const link = strip?.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`);
    if (!strip || !link) return;
    const left = link.offsetLeft - strip.offsetWidth / 2 + link.offsetWidth / 2;
    strip.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label={label}
      className="sticky top-[4.5rem] z-30 border-b border-line bg-white/90 backdrop-blur-xl"
    >
      <ul
        ref={stripRef}
        className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8"
      >
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <li key={tab.id} className="shrink-0">
              <a
                href={`#${tab.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`inline-flex min-h-10 items-center whitespace-nowrap rounded-full border px-4 text-[0.9rem] font-medium transition-colors duration-200 ease-[var(--ease-hover)] ${
                  isActive
                    ? "border-seafoam bg-seafoam text-white"
                    : "border-line bg-white text-charcoal/75 hover:border-charcoal/20 hover:text-charcoal"
                }`}
              >
                {tab.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
