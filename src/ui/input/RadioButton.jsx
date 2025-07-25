import React, { useId, useState } from "react";

export default function RadioButton({
  label = "Choose one",
  options = [],
  selectedValue = "",
  onChange,
  required = false,
  error = "",
}) {
  const id = useId();
  const [touched, setTouched] = useState(false);

  const isEmpty = required && !selectedValue;
  const showError = touched && (isEmpty || error);
  const finalError = isEmpty ? "Please select an option" : error;

  return (
    <div className="w-full">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Radio buttons in a row */}
      <div
        onBlur={() => setTouched(true)}
        className={`flex flex-wrap gap-6 border px-4 py-3 rounded-lg transition-all
          ${showError ? "border-red-500" : "border-gray-300"}
        `}
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2 cursor-pointer text-sm"
          >
            <input
              type="radio"
              name={id}
              value={opt.value}
              checked={selectedValue === opt.value}
              onChange={() => onChange(opt.value)}
              className="accent-blue-600"
            />
            {opt.label}
          </label>
        ))}
      </div>

      {/* Error message */}
      {showError && (
        <p className="mt-1 text-xs text-red-600">{finalError}</p>
      )}
    </div>
  );
}
