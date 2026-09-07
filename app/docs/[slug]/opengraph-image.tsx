import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ").toUpperCase();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          backgroundColor: "#F6F0E0",
          color: "#17130C",
          border: "16px solid #17130C",
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#BC3A28" }}>BIGBULLUI</div>
        <div style={{ fontSize: 84, fontWeight: 900 }}>{title}</div>
        <div style={{ fontSize: 28, borderTop: "4px dashed #17130C", paddingTop: 16 }}>
          Zero-dependency ticket stub component
        </div>
      </div>
    ),
    { ...size }
  );
}
