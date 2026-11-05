import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { navLinks } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { formatRange, groupHours } from "@/lib/hours";
import CashNote from "./CashNote";
import Logo from "./Logo";
import { FacebookIcon } from "./icons";

const heading = "mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/60";

export default async function Footer() {
  const [t, tNav, tHeader, tShort, tFind, rawLocale] = await Promise.all([
    getTranslations("footer"),
    getTranslations("nav"),
    getTranslations("header"),
    getTranslations("daysShort"),
    getTranslations("home.findUs"),
    getLocale(),
  ]);
  const locale = rawLocale as "fr" | "en";
  const groups = groupHours(siteConfig.hours);

  return (
    <footer className="on-dark border-t border-white/10 bg-charcoal text-white/70">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_0.8fr_1.2fr_1.2fr] lg:gap-12 lg:px-8 lg:py-20">
        {/* Brand */}
        <div>
          <Link href={`/${locale}`} className="inline-flex min-h-11 items-center rounded-md">
            <Logo tone="dark" />
          </Link>
          <p className="mt-4 max-w-[32ch] text-[0.95rem] leading-relaxed">{t("tagline")}</p>
          {siteConfig.social.facebook && (
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tHeader("facebook")}
              data-track="facebook"
              data-track-location="footer"
              className="-ml-2.5 mt-3 inline-flex size-11 items-center justify-center rounded-full text-white/70 transition-colors duration-200 hover:text-white"
            >
              <FacebookIcon className="size-[1.15rem]" />
            </a>
          )}
        </div>

        {/* Navigation */}
        <nav aria-label={t("explore")}>
          <h2 className={heading}>{t("explore")}</h2>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/${locale}${link.href}`}
                  className="inline-flex min-h-11 items-center text-[0.95rem] transition-colors duration-200 hover:text-white"
                >
                  {tNav(link.translationKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Condensed hours + payment */}
        <div>
          <h2 className={heading}>{t("hours")}</h2>
          <ul className="space-y-2 text-[0.95rem]">
            {groups.map((g) => (
              <li key={g.from} className="flex justify-between gap-4">
                <span>
                  {tShort(g.from)}
                  {g.from !== g.to && ` – ${tShort(g.to)}`}
                </span>
                <span className="tabular text-white/85">{formatRange(g.sample, locale, tFind("closed"))}</span>
              </li>
            ))}
          </ul>
          <CashNote tone="dark" className="mt-5 text-sm" />
        </div>

        {/* NAP */}
        <div>
          <h2 className={heading}>{t("findUs")}</h2>
          <address className="not-italic text-[0.95rem] leading-relaxed">
            <p>
              {siteConfig.address.street}
              <br />
              {siteConfig.address.locality}, {siteConfig.address.region} {siteConfig.address.postalCode}
            </p>
            <a
              href={siteConfig.phone.href}
              data-track="call"
              data-track-location="footer"
              className="tabular mt-2 inline-flex min-h-11 items-center text-lg font-semibold text-white transition-colors duration-200 hover:text-mint"
            >
              {siteConfig.phone.display}
            </a>
          </address>
          <a
            href={siteConfig.address.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-track="directions"
            data-track-location="footer"
            className="inline-flex min-h-11 items-center text-[0.95rem] font-semibold text-mint transition-colors duration-200 hover:text-white"
          >
            {t("directions")}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 pb-28 text-sm text-white/60 sm:px-6 lg:px-8 lg:pb-6">
          <p>
            &copy; 2026 {siteConfig.name}. {t("builtBy")}{" "}
            <a
              href="https://aurentis.ca"
              target="_blank"
              rel="noopener"
              className="font-medium text-white/85 underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
            >
              Aurentis
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
