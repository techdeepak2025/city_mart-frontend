import React, { useId, useState } from "react";

export default function DatePicker({
  label,
  value,
  onChange,
  required = false,
  error = "",
}) {
  const id = useId();
  const [touched, setTouched] = useState(false);

  const isEmpty = required && !value;
  const showError = touched && (isEmpty || error);
  const finalError = isEmpty ? "This field is required" : error;

  return (
    <div className="w-full">
      {/* Label */}
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Input */}
      <input
        id={id}
        type="date"
        value={value}
        onChange={onChange}
        onBlur={() => setTouched(true)}
        required={required}
        aria-invalid={!!showError}
        aria-describedby={showError ? `${id}-error` : undefined}
        className={`w-full px-4 py-2 text-sm rounded-lg border transition-all
          ${
            showError
              ? "border-red-500 text-gray-900"
              : "border-gray-300 text-gray-900"
          }
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
      />

      {/* Error */}
      {showError && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {finalError}
        </p>
      )}
    </div>
  );
}
