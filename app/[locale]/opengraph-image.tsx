import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/data/site";
import { ogFonts } from "@/lib/og-fonts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Casse-Croûte chez Ti-Pit — Val-d'Or";

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const tReviews = await getTranslations({ locale, namespace: "home.reviews" });
  const fmt = locale === "fr" ? "fr-CA" : "en-CA";
  const rating = siteConfig.rating.value.toLocaleString(fmt);
  const count = siteConfig.rating.countLabel;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#F6F7F5",
          color: "#2E3336",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "#2F6458" }}>
          {t("ogLocation")}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: 104, lineHeight: 1.02, letterSpacing: -4 }}>
            Casse-Croûte
          </div>
          <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: 104, lineHeight: 1.02, letterSpacing: -4 }}>
            chez Ti-Pit
          </div>
          <div style={{ marginTop: 24, fontSize: 36, fontWeight: 500, color: "rgba(46,51,54,0.75)" }}>{t("ogTagline")}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 22px",
              borderRadius: 999,
              background: "#FFFFFF",
              border: "1px solid #E3E7E4",
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            {/* SVG star: the bundled fonts have no ★ glyph */}
            <svg width="28" height="28" viewBox="0 0 24 24" style={{ marginRight: 10 }}>
              <path
                fill="#F2C230"
                d="M12 2.5l2.94 5.96 6.56.95-4.75 4.63 1.12 6.54L12 17.5l-5.87 3.08 1.12-6.54L2.5 9.41l6.56-.95L12 2.5z"
              />
            </svg>
            {`${rating} · ${tReviews("count", { count })}`}
          </div>
          <div
            style={{
              display: "flex",
              padding: "16px 30px",
              borderRadius: 16,
              background: "#3E7D6E",
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: 34,
            }}
          >
            {siteConfig.phone.display}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() }
  );
}
