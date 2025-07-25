import React, { useId } from "react";

export default function TextInput({
  label,
  placeholder,
  required = false,
  error = "",
  name,
  onChange,
  onBlur,
  value,
  inputRef,
  id: propId,
  ...props
}) {
  const reactId = useId();
  const inputId = propId || `${name || "input"}-${reactId}`;
  const hasError = !!error;

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        id={inputId}
        name={name}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        ref={inputRef}
        value={value}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${inputId}-error` : undefined}
        className={`w-full px-4 py-2 text-sm rounded-lg border transition-all
          ${hasError ? "border-red-500" : "border-gray-300"}
          text-gray-900
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        {...props}
      />

      {hasError && (
        <p id={`${inputId}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
