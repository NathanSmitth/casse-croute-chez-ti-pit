import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og-fonts";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
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
          color: "#FFFFFF",
          fontFamily: "Plus Jakarta Sans",
          fontSize: 84,
          letterSpacing: -3,
        }}
      >
        TP
      </div>
    ),
    { ...size, fonts: await ogFonts() }
  );
}
