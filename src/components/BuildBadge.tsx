// src/components/BuildBadge.tsx
import React from "react";
import { BUILD_ID } from "../buildInfo";

type Props = {
  host?: string;
  selectedTheme?: string | null;
};

export default function BuildBadge({ host, selectedTheme }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        right: 12,
        bottom: 12,
        zIndex: 999999,
        background: "rgba(0,0,0,0.85)",
        color: "#22c55e",
        padding: "10px 12px",
        borderRadius: 10,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        fontSize: 12,
        lineHeight: 1.35,
        maxWidth: 420,
        pointerEvents: "none",
        whiteSpace: "pre-wrap",
      }}
    >
      {`BUILD_ID: ${BUILD_ID}
Host: ${host ?? "-"}
Selected Theme: ${selectedTheme ?? "-"}`}
    </div>
  );
}