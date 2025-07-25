import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 flex-shrink-0 order-1">
      <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
      <p className="text-lg font-semibold text-gray-800 font-sans whitespace-nowrap">
        <span className="text-purple-700 font-bold">CITY</span>
        <span className="text-orange-400">MART</span>
      </p>
    </div>
  );
}
