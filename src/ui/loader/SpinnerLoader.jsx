import React from "react";

export default function SpinnerLoader({
  size = 48,
  color = "#0D9488",
  showText = false,
  text = "Loading...",
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-2">
        <div
          className="animate-spin"
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: `conic-gradient(from 0deg, ${color}, ${color}20, transparent)`,
            maskImage: "radial-gradient(transparent 60%, black 61%)",
            WebkitMaskImage: "radial-gradient(transparent 60%, black 61%)",
          }}
        />
        {showText && (
          <p className="text-sm text-gray-500 animate-pulse">{text}</p>
        )}
      </div>
    </div>
  );
}
