"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_NAMES: Record<string, string> = { fr: "Français", en: "English" };

// FR | EN pill toggle — real links (crawlable, work without JS), preserving the current page.
export default function LocaleSwitcher({ locale, label }: { locale: string; label: string }) {
  const pathname = usePathname();

  const pathFor = (next: string) => {
    const segments = pathname.split("/");
    segments[1] = next;
    return segments.join("/") || `/${next}`;
  };

  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center rounded-full border border-line bg-white p-1 text-[0.8rem] font-semibold"
    >
      {routing.locales.map((l) => (
        <Link
          key={l}
          href={pathFor(l)}
          hrefLang={l === "fr" ? "fr-CA" : "en-CA"}
          lang={l}
          aria-label={LOCALE_NAMES[l]}
          aria-current={locale === l ? "true" : undefined}
          scroll={false}
          className={`inline-flex min-h-9 min-w-11 items-center justify-center rounded-full px-3 transition-colors duration-200 ease-[var(--ease-hover)] ${
            locale === l ? "bg-ketchup text-white" : "text-charcoal/70 hover:text-charcoal"
          }`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
