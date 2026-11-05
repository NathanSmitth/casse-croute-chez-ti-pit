import { getTranslations, getLocale } from "next-intl/server";
import { siteConfig } from "@/data/site";
import { formatRange } from "@/lib/hours";
import HoursTable from "./HoursTable";
import MapEmbed from "./MapEmbed";
import CallButton from "./CallButton";
import CashNote from "./CashNote";
import SectionHeader from "./SectionHeader";
import { ArrowUpRightIcon, ClockIcon, MapPinIcon, PhoneIcon } from "./icons";

export default async function FindUs() {
  const [t, tDays, rawLocale] = await Promise.all([
    getTranslations("home.findUs"),
    getTranslations("days"),
    getLocale(),
  ]);
  const locale = rawLocale as "fr" | "en";

  const rows = siteConfig.hours.map((d) => ({
    day: d.day,
    label: tDays(d.day),
    hours: formatRange(d, locale, t("closed")),
    closed: !d.open,
  }));

  return (
    <section id="find-us" className="on-green bg-seafoam py-20 sm:py-24 lg:py-28">
      <SectionHeader eyebrow={t("eyebrow")} heading={t("heading")} tone="green" />

      <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:px-8">
        {/* Left — hours + contact */}
        <div className="flex flex-col gap-5 lg:gap-6">
          <div data-reveal className="rounded-2xl bg-white p-6 sm:p-8">
            <h3 className="mb-4 flex items-center gap-2.5 text-lg font-semibold text-charcoal">
              <ClockIcon className="size-5 text-seafoam-dark" />
              {t("hoursLabel")}
            </h3>
            <HoursTable
              rows={rows}
              raw={siteConfig.hours}
              confirmed={siteConfig.hoursConfirmed}
              labels={{
                today: t("today"),
                openNow: t("openNow"),
                closedNow: t("closedNow"),
                tbc: t("hoursTbc"),
              }}
            />
            <CashNote className="mt-5 border-t border-line pt-5" />
          </div>

          <div data-reveal className="rounded-2xl bg-white p-6 sm:p-8">
            <div className="grid gap-8 sm:grid-cols-2">
              {/* Address */}
              <div>
                <h3 className="mb-3 flex items-center gap-2.5 text-lg font-semibold text-charcoal">
                  <MapPinIcon className="size-5 text-seafoam-dark" />
                  {t("locationLabel")}
                </h3>
                <address className="not-italic leading-relaxed text-charcoal/80">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.locality}, {siteConfig.address.region} {siteConfig.address.postalCode}
                  <span className="mt-1 block text-sm text-charcoal/70">{t("areaNote")}</span>
                </address>
                <a
                  href={siteConfig.address.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="directions"
                  data-track-location="find-us"
                  className="group mt-3 inline-flex min-h-11 items-center gap-1.5 font-semibold text-seafoam-dark transition-colors duration-200 hover:text-charcoal"
                >
                  {t("directions")}
                  <ArrowUpRightIcon className="size-4 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>

              {/* Call */}
              <div>
                <h3 className="mb-3 flex items-center gap-2.5 text-lg font-semibold text-charcoal">
                  <PhoneIcon className="size-5 text-seafoam-dark" />
                  {t("callLabel")}
                </h3>
                <p className="text-charcoal/80">{t("callBody")}</p>
                <a
                  href={siteConfig.phone.href}
                  data-track="call"
                  data-track-location="find-us-number"
                  className="tabular mt-2 inline-flex min-h-11 items-center font-heading text-2xl font-bold tracking-[-0.02em] text-charcoal transition-colors duration-200 hover:text-seafoam-dark"
                >
                  {siteConfig.phone.display}
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 border-t border-line pt-6">
              <CallButton label={t("callCta")} location="find-us" variant="red" className="w-full sm:w-auto sm:self-start" />
              <CashNote />
              <p className="text-sm text-charcoal/70">{t("callNote")}</p>
            </div>
          </div>
        </div>

        {/* Right — map */}
        <div
          data-reveal
          className="min-h-[340px] overflow-hidden rounded-2xl bg-white lg:min-h-full"
        >
          <MapEmbed src={siteConfig.address.embedUrl} title={t("mapTitle")} />
        </div>
      </div>
    </section>
  );
}
