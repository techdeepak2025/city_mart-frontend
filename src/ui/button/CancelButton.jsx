import React from "react";

export default function CancelButton({
  onClick,
  label = "Cancel",
  disabled = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-150
        ${
          disabled
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-gray-100 cursor-pointer text-gray-800 hover:bg-gray-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400"
        }`}
    >
      {label}
    </button>
  );
}
