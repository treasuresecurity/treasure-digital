import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
        <svg
          width="22"
          height="14"
          viewBox="0 0 200 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100,60 C100,20 40,20 40,60 C40,100 100,100 100,60 C100,20 160,20 160,60 C160,100 100,100 100,60"
            stroke="url(#g)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="200" y2="0">
              <stop offset="0%" stopColor="#0061FE" />
              <stop offset="100%" stopColor="#E8A50B" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    ),
    { ...size },
  );
}
