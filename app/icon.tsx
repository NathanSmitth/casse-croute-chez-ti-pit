import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og-fonts";

// Favicon — replace with the real logo mark once provided (or drop an icon.png here).
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#3E7D6E",
          borderRadius: 16,
          color: "#FFFFFF",
          fontFamily: "Plus Jakarta Sans",
          fontSize: 30,
          letterSpacing: -1,
        }}
      >
        TP
      </div>
    ),
    { ...size, fonts: await ogFonts() }
  );
}
