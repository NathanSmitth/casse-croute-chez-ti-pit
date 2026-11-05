import Image from "next/image";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { signatureDishes } from "@/data/content";
import Marquee from "./Marquee";
import SectionHeader from "./SectionHeader";
import { ArrowRightIcon } from "./icons";

// Each half of the marquee must be wider than the widest viewport, so the
// six dishes are repeated once inside each half (2 × 6 × ~320px ≈ 3.8k px).
const LOOP = [...signatureDishes, ...signatureDishes];

export default async function SignatureDishes() {
  const [t, tMarquee, locale] = await Promise.all([
    getTranslations("home.dishes"),
    getTranslations("marquee"),
    getLocale(),
  ]);

  const menuLink = (
    <Link
      href={`/${locale}/menu`}
      className="red-on-green group inline-flex min-h-12 items-center gap-2 rounded-xl bg-ketchup px-5 py-3 text-[0.975rem] font-semibold text-white transition-[background-color,transform] duration-200 ease-[var(--ease-hover)] hover:bg-ketchup-dark active:scale-[0.98]"
    >
      {t("cta")}
      <ArrowRightIcon className="size-4 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-1" />
    </Link>
  );

  return (
    <section id="dishes" className="on-green overflow-hidden bg-seafoam py-20 sm:py-24 lg:py-28">
      <SectionHeader eyebrow={t("eyebrow")} heading={t("heading")} intro={t("intro")} action={menuLink} tone="green" />

      <Marquee
        label={t("listLabel")}
        pauseLabel={tMarquee("pause")}
        playLabel={tMarquee("play")}
        duration={60}
        tone="green"
        className="mt-12"
      >
        {LOOP.map((dish, i) => (
          <li key={`${dish.id}-${i}`} className="w-[16rem] shrink-0 sm:w-[19rem]">
            <figure className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-line transition-shadow duration-300 ease-[var(--ease-hover)] group-hover:shadow-[0_18px_40px_-18px_rgb(20_40_35/0.6)]">
                <Image
                  src={dish.image}
                  alt={t(`items.${dish.id}.alt`)}
                  fill
                  sizes="(min-width: 640px) 304px, 256px"
                  className="object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="mt-4 px-0.5">
                <span className="block text-[1.05rem] font-medium text-white">{t(`items.${dish.id}.name`)}</span>
                {/* Pure white: dimmed white fails AA on seafoam; hierarchy comes from size */}
                <span className="mt-0.5 block text-[0.9rem] leading-snug text-white">
                  {t(`items.${dish.id}.blurb`)}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </Marquee>
    </section>
  );
}
