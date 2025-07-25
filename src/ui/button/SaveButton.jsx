import React from "react";

export default function SaveButton({
  onClick,
  label = "Save",
  disabled = false,
  isLoading = false,
}) {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`relative inline-flex items-center justify-center px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-150
        ${
          disabled || isLoading
            ? "bg-teal-400 text-white opacity-70 cursor-not-allowed"
            : "bg-teal-600 cursor-pointer text-white hover:bg-teal-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-500"
        }`}
      aria-disabled={disabled || isLoading}
      aria-busy={isLoading}
    >
      {/* Loading animation */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex space-x-1">
            <span
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "-0.3s" }}
            ></span>
            <span
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "-0.15s" }}
            ></span>
            <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
          </div>
        </div>
      )}

      {/* Label text, preserved in layout */}
      <span className={`${isLoading ? "invisible" : "visible"}`}>
        {label}
      </span>
    </button>
  );
}
