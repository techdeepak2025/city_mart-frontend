import React from "react";

export default function DotsLoader({
  dotCount = 3,
  dotSize = 6,
  color = "bg-teal-600",
  text = "Loading...",
  showText = false,
}) {
  const dots = Array.from({ length: dotCount });

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2">
        {dots.map((_, i) => (
          <span
            key={i}
            className={`rounded-full ${color}`}
            style={{
              width: dotSize,
              height: dotSize,
              animation: "dotFlare 1s infinite ease-in-out",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
      {showText && (
        <p className="text-sm text-gray-500 animate-pulse">{text}</p>
      )}

      {/* Custom keyframes */}
      <style jsx="true">{`
        @keyframes dotFlare {
          0%, 80%, 100% {
            transform: scale(0.7);
            opacity: 0.5;
          }
          40% {
            transform: scale(1.3);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
