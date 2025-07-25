import React from "react";

const defaultIcons = ["🍇", "🥕", "🌾", "🥤", "🥫", "🍼", "💊", "🧃", "🧼"];

export default function GroceryLoader({ icons = defaultIcons }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="grid grid-cols-3 gap-[5px] text-xs leading-none">
        {icons.slice(0, 9).map((icon, idx) => (
          <span
            key={idx}
            style={{
              animation: `miniPulse 1.4s ease-in-out ${idx * 0.08}s infinite`,
              display: "inline-block",
              fontSize: "0.90rem",
            }}
          >
            {icon}
          </span>
        ))}
      </div>

      <style>
        {`
          @keyframes miniPulse {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.2); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
