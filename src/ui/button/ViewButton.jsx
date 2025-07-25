import React from "react";
import { Eye } from "lucide-react";

export default function ViewButton({
  onClick,
  disabled = false,
  size = 18,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="View"
      title="View"
      className={`group relative flex items-center justify-center w-9 h-9 rounded-md transition-all duration-200 ease-in-out
        ${
          disabled
            ? "text-teal-300 cursor-not-allowed"
            : "text-teal-600 cursor-pointer hover:text-teal-700 hover:bg-teal-50 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
        }`}
    >
      <Eye
        size={size}
        strokeWidth={2}
        className="transition-transform duration-200 ease-in-out group-hover:scale-110"
      />
    </button>
  );
}
