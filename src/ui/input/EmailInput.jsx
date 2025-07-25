import React, { useId, useState } from "react";
import { Mail } from "lucide-react";

export default function EmailInput({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  error = "",
  showIcon = false,
}) {
  const id = useId();
  const [touched, setTouched] = useState(false);

  const isEmpty = required && value.trim() === "";
  const isInvalidEmail =
    value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const showError = touched && (isEmpty || isInvalidEmail || error);
  const finalError = isEmpty
    ? "This field is required"
    : isInvalidEmail
    ? "Please enter a valid email address"
    : error;

  const hasError = showError && finalError;

  return (
    <div className="w-full">
      {/* Label */}
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Input Wrapper */}
      <div
        className={`flex items-center gap-2 px-3 py-2 border rounded-lg transition-all
          ${hasError ? "border-red-500" : "border-gray-300"}
          focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent`}
      >
        {showIcon && (
          <Mail
            size={18}
            className={`${hasError ? "text-red-500" : "text-gray-400"}`}
          />
        )}
        <input
          id={id}
          type="email"
          value={value}
          onChange={onChange}
          onBlur={() => setTouched(true)}
          placeholder={placeholder}
          required={required}
          aria-invalid={!!hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className="flex-1 bg-transparent outline-none text-sm text-gray-900"
        />
      </div>

      {/* Error Message */}
      {hasError && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {finalError}
        </p>
      )}
    </div>
  );
}
