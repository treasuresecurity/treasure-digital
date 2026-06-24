import { ImageResponse } from "next/og";
import { FaviconMark } from "@/components/brand/favicon-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000817",
        }}
      >
        <FaviconMark size={100} />
      </div>
    ),
    { ...size },
  );
}
