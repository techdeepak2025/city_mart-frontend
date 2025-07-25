import React, { useId, useState } from "react";
import { RotateCcw } from "lucide-react";

// Utility: CAPTCHA string generator
const generateCaptcha = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

export default function CaptchaInput({
  label = "Captcha",
  value,
  onChange,
  required = false,
  error = "",
}) {
  const id = useId();
  const [touched, setTouched] = useState(false);
  const [captchaText, setCaptchaText] = useState(generateCaptcha());

  const isEmpty = required && value.trim() === "";
  const showError = touched && (isEmpty || error);
  const finalError = isEmpty ? "This field is required" : error;

  const handleRefresh = () => {
    setCaptchaText(generateCaptcha());
  };

  return (
    <div className="w-fit">
      {/* Label */}
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Captcha preview + Refresh button */}
      <div className="flex items-center justify-between mb-2">
        <div
          role="img"
          aria-label="captcha"
          className="font-mono text-lg font-bold tracking-[6px] select-none px-4 py-2 bg-gray-100 border rounded-xl text-gray-800 shadow-inner"
        >
          {captchaText}
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          className="ml-3 p-2 rounded-full hover:bg-gray-200 active:rotate-180 transition-all duration-300"
          title="Refresh Captcha"
        >
          <RotateCcw className="text-gray-600" size={18} />
        </button>
      </div>

      {/* Input */}
      <input
        id={id}
        type="text"
        inputMode="text"
        value={value}
        onChange={onChange}
        onBlur={() => setTouched(true)}
        placeholder="Enter captcha above"
        required={required}
        aria-invalid={!!showError}
        aria-describedby={showError ? `${id}-error` : undefined}
        className={`w-full px-4 py-2 text-sm rounded-lg border transition-all
          ${showError ? "border-red-500" : "border-gray-300"}
          text-gray-900 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
      />

      {/* Error Message */}
      {showError && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {finalError}
        </p>
      )}
    </div>
  );
}
