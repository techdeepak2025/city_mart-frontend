import React from "react";

export default function TextArea({
  label = "Description",
  placeholder = "Enter text here...",
  value = "",
  onChange,
  name,
  error = "",
  required = false,
  rows = 4,
  onBlur,
  inputRef,
}) {
  const hasError = !!error;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <textarea
        className={`w-full px-4 py-2 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 ${
          hasError
            ? "border-red-500 focus:ring-red-300"
            : "border-gray-300 focus:ring-blue-300"
        }`}
        placeholder={placeholder}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        ref={inputRef}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
      />

      {hasError && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
