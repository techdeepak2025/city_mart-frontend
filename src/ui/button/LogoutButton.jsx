import React from "react";
import { LogOut } from "lucide-react";

export default function LogoutButton({
  onClick,
  label = "Logout",
  disabled = false,
  isLoading = false,
  width = "w-32", 
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`relative inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${width}
        ${
          disabled || isLoading
            ? "bg-red-400 text-white opacity-70 cursor-not-allowed"
            : "bg-red-600 cursor-pointer text-white hover:bg-red-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400"
        }`}
      aria-disabled={disabled || isLoading}
      aria-busy={isLoading}
    >
      {/* Loading animation */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex space-x-1">
            <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "-0.3s" }} />
            <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "-0.15s" }} />
            <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      )}

      {/* Icon + label */}
      <span className={`flex items-center gap-2 ${isLoading ? "invisible" : "visible"}`}>
        <LogOut size={18} strokeWidth={2} />
        {label}
      </span>
    </button>
  );
}
