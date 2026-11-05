import { getTranslations, getLocale } from "next-intl/server";
import { reviews } from "@/data/content";
import { siteConfig } from "@/data/site";
import Marquee from "./Marquee";
import CallCta from "./CallCta";
import SectionHeader from "./SectionHeader";
import { ArrowRightIcon, GoogleIcon, StarIcon } from "./icons";

// 5 reviews × 2 per half (~3.8k px) keeps each half wider than a 2560px screen.
const LOOP = [...reviews, ...reviews];

const googleReviewsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${siteConfig.name} ${siteConfig.address.full}`
)}`;

function Stars({ value, className = "size-5" }: { value: number; className?: string }) {
  const pct = `${(value / 5) * 100}%`;
  return (
    <span aria-hidden="true" className="relative inline-flex">
      <span className="flex gap-0.5 text-line">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} className={className} />
        ))}
      </span>
      <span className="absolute inset-0 flex gap-0.5 overflow-hidden text-sun" style={{ width: pct }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} className={`${className} shrink-0`} />
        ))}
      </span>
    </span>
  );
}

export default async function Reviews() {
  const [t, tMarquee, locale] = await Promise.all([
    getTranslations("home.reviews"),
    getTranslations("marquee"),
    getLocale(),
  ]);
  const fmt = locale === "fr" ? "fr-CA" : "en-CA";
  const rating = siteConfig.rating.value.toLocaleString(fmt);
  const count = siteConfig.rating.countLabel;

  return (
    <section className="overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      <SectionHeader eyebrow={t("eyebrow")} heading={t("heading")} />

      <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12 lg:px-8">
        {/* Rating summary */}
        <div data-reveal className="px-4 sm:px-6 lg:px-0 lg:pt-2">
          <div className="flex items-center gap-4 lg:block">
            <p className="font-heading text-6xl font-bold leading-none tracking-[-0.04em] text-charcoal tabular lg:text-[5.5rem]">
              {rating}
              <span className="sr-only"> / 5</span>
            </p>
            <div className="lg:mt-4">
              <Stars value={siteConfig.rating.value} />
              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-charcoal/70 lg:mt-2">
                <GoogleIcon className="size-4" />
                {t("count", { count })}
              </p>
            </div>
          </div>
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-3 inline-flex min-h-11 items-center gap-2 text-[0.95rem] font-semibold lg:mt-5 text-seafoam-dark transition-colors duration-200 hover:text-charcoal"
          >
            {t("seeAll")}
            <ArrowRightIcon className="size-4 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-1" />
          </a>
        </div>

        {/* Review cards */}
        <Marquee
          label={t("listLabel")}
          pauseLabel={tMarquee("pause")}
          playLabel={tMarquee("play")}
          duration={65}
          className="min-w-0"
        >
          {LOOP.map((review, i) => (
            <li key={`${review.author ?? "anon"}-${i}`} className="w-[18.5rem] shrink-0 sm:w-[22rem]">
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 sm:p-7">
                {/* Per-review stars only when the rating is confirmed in data/content.ts */}
                {review.rating && (
                  <div className="mb-4">
                    <Stars value={review.rating} className="size-4" />
                    <span className="sr-only">{review.rating} / 5</span>
                  </div>
                )}
                {/* Kept in its original language on both locales */}
                <blockquote lang={review.lang} className="flex-1 text-[1.125rem] leading-relaxed text-charcoal">
                  <p>{review.quote}</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between gap-3 text-sm">
                  <span className="text-charcoal/70">
                    {review.author && <span className="font-medium text-charcoal">{review.author} · </span>}
                    {t("source")}
                    {review.localGuide && ` · ${t("localGuide")}`}
                  </span>
                  <GoogleIcon className="size-4 shrink-0" />
                </figcaption>
              </figure>
            </li>
          ))}
        </Marquee>
      </div>

      {/* Repeat CTA — never make a hungry visitor scroll back up */}
      <CallCta
        heading={t("ctaHeading")}
        body={t("ctaBody")}
        button={t("ctaButton")}
        location="reviews"
        className="mt-16 sm:mt-20"
      />
    </section>
  );
}
