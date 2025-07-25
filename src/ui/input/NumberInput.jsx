import React from "react";

export default function NumberInput({
  label,
  placeholder,
  value,
  onChange,
  name,
  required = false, 
  error = "",
  maxLength,
  onBlur,
  inputRef,
}) {
  const hasError = !!error;

  const handleChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    if (!maxLength || onlyNums.length <= maxLength) {
      onChange?.(onlyNums);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        type="text"
        inputMode="numeric"
        pattern="\d*"
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        ref={inputRef}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
        className={`w-full px-4 py-2 text-sm rounded-lg border transition-all
        ${hasError ? "border-red-500" : "border-gray-300"}
        text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />

      {hasError && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
