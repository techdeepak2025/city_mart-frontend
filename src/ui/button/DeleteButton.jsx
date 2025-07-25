import React from "react";
import { Trash2 } from "lucide-react";

export default function DeleteButton({
  onClick,
  disabled = false,
  size = 15,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Delete"
      title="Delete"
      className={`group relative flex items-center justify-center w-6 h-6 rounded-md transition-all duration-200 ease-in-out
        ${
          disabled
            ? "text-red-300 cursor-not-allowed"
            : "text-red-600 cursor-pointer hover:text-red-700 hover:bg-red-50 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        }`}
    >
      <Trash2
        size={size}
        strokeWidth={2}
        className="transition-transform duration-200 ease-in-out group-hover:scale-110"
      />
    </button>
  );
}
