import { ImageResponse } from "next/og";

export const alt = "Treasure Digital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "#000817",
          color: "#FFFFFF",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}
        >
          <span style={{ color: "#FFFFFF" }}>TREASURE</span>
          <span style={{ color: "#2E7BFF" }}>DIGITAL</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p
            style={{
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: "900px",
              margin: 0,
            }}
          >
            Websites, apps and campaigns that bring customers
          </p>
          <p style={{ fontSize: 28, color: "#9AA7BD", margin: 0 }}>
            treasuredigital.bg
          </p>
        </div>
        <div
          style={{
            height: "6px",
            width: "240px",
            background: "linear-gradient(120deg, #0061FE 0%, #2E7BFF 45%, #E8A50B 100%)",
            borderRadius: "999px",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
