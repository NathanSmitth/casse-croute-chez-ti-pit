import Image from "next/image";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { siteConfig } from "@/data/site";
import CallButton from "./CallButton";
import { StarIcon } from "./icons";

// Photo-led hero: one large rounded image, a dark gradient at the bottom only,
// and the copy anchored bottom-left.
export default async function Hero() {
  const [t, tReviews, locale] = await Promise.all([
    getTranslations("home.hero"),
    getTranslations("home.reviews"),
    getLocale(),
  ]);
  const fmt = locale === "fr" ? "fr-CA" : "en-CA";
  const rating = siteConfig.rating.value.toLocaleString(fmt);
  const count = siteConfig.rating.countLabel;

  return (
    <section className="px-2 pt-[4.5rem] sm:px-4 lg:px-6">
      <div className="relative mx-auto flex min-h-[calc(100svh-5.25rem)] max-w-[100rem] items-end overflow-hidden rounded-2xl bg-charcoal sm:rounded-3xl lg:min-h-[min(calc(100svh-6rem),880px)]">
        {/* PLACEHOLDER: replace /public/images/exterior.jpg with the real building (or a poutine shot) */}
        <Image
          src="/images/exterior.jpg"
          alt={t("imageAlt")}
          fill
          priority
          fetchPriority="high"
          quality={72}
          className="object-cover object-center"
          sizes="(min-width: 1600px) 1600px, 100vw"
        />
        {/* Bottom-only gradient: keeps the photo clean, the text legible */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[92%] bg-gradient-to-t from-charcoal-dark via-charcoal-dark/80 via-55% to-transparent sm:h-[75%]"
        />

        <div className="on-dark relative z-10 w-full max-w-4xl px-5 pb-8 sm:px-10 sm:pb-12 lg:px-[5.5rem] lg:pb-16">
          <p
            className="rise mb-5 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[0.8rem] font-semibold text-charcoal"
            style={{ "--i": 0 } as React.CSSProperties}
          >
            <StarIcon className="size-3.5 text-sun" />
            <span className="tabular">{rating}</span>
            <span aria-hidden="true" className="text-charcoal/40">·</span>
            <span>{tReviews("count", { count })}</span>
          </p>

          <p
            className="rise mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/85"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {t("eyebrow")}
          </p>

          <h1
            className="rise text-[2.75rem] font-bold leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl lg:text-[5.25rem]"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {t("headingTop")} {t("headingChez")} {t("headingName")}
          </h1>

          <p
            className="rise mt-4 max-w-[40ch] text-lg leading-relaxed text-white/90 sm:text-xl"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            {t("tagline")}
          </p>

          <div
            className="rise mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            <CallButton label={t("ctaCall")} showNumber location="hero" variant="red" />
            <Link
              href={`/${locale}/menu`}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/45 px-5 py-3 text-[0.975rem] font-semibold text-white backdrop-blur-sm transition-[background-color,border-color,transform] duration-200 ease-[var(--ease-hover)] hover:border-white/80 hover:bg-white/10 active:scale-[0.98]"
            >
              {t("ctaMenu")}
            </Link>
          </div>

          <p
            className="rise mt-6 text-sm text-white/80"
            style={{ "--i": 5 } as React.CSSProperties}
          >
            {t("services")}
            <span aria-hidden="true" className="px-2 text-white/40">·</span>
            {t("area")}
          </p>
        </div>
      </div>
    </section>
  );
}
