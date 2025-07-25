import React from "react";
import { Plus } from "lucide-react";

export default function AddButton({
  onClick,
  label = "Add New",
  disabled = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-w-fit items-center justify-center gap-2 px-3 py-2 sm:px-4 text-sm sm:text-base font-semibold rounded-lg transition-all duration-150
        ${
          disabled
            ? "bg-blue-300 text-white opacity-70 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400"
        }`}
      aria-disabled={disabled}
    >
      <Plus size={18} strokeWidth={2} />
      {/* Hide label on mobile, show from sm+ */}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
