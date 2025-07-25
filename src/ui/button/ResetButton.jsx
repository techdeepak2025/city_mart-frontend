import React from "react";

export default function ResetButton({
  onClick,
  label = "Reset",
  disabled = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-150
        ${
          disabled
            ? "bg-yellow-300 text-white opacity-70 cursor-not-allowed"
            : "bg-yellow-500 cursor-pointer text-white hover:bg-yellow-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        }`}
    >
      {label}
    </button>
  );
}
