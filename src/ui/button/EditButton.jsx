import React from "react";
import { Pencil } from "lucide-react";

export default function EditButton({
  onClick,
  disabled = false,
  size = 15,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Edit"
      title="Edit"
      className={`group relative flex items-center justify-center w-6 h-6  rounded-md transition-all duration-200 ease-in-out
        ${
          disabled
            ? "text-blue-300 cursor-not-allowed"
            : "text-blue-600 cursor-pointer hover:text-blue-700 hover:bg-blue-50 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        }`}
    >
      <Pencil
        size={size}
        strokeWidth={2}
        className="transition-transform duration-200 ease-in-out group-hover:scale-110"
      />
    </button>
  );
}
