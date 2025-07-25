import React from "react";

export default function LoginButton({
  onClick,
  label = "Login",
  disabled = false,
  isLoading = false,
  width = "auto", 
}) {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled || isLoading}
      style={{ width }} 
      className={`relative inline-flex items-center justify-center px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-150
        ${
          disabled || isLoading
            ? "bg-blue-400 text-white opacity-70 cursor-not-allowed"
            : "bg-blue-600 cursor-pointer text-white hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400"
        }`}
      aria-disabled={disabled || isLoading}
      aria-busy={isLoading}
    >
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
      <span className={`${isLoading ? "invisible" : "visible"}`}>{label}</span>
    </button>
  );
}
