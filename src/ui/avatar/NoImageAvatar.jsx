import React from "react";

export default function NoImageAvatar({ label = "N/A" }) {
  return (
    <div
      className="flex items-center justify-center w-20 h-20 rounded-lg bg-gray-100 text-gray-600 border border-dashed border-gray-300 text-sm font-semibold"
      title={label}
    >
      {label}
    </div>
  );
}
