import React, { useId, useState } from "react";

export default function MultiselectInput({
  label = "Select Options",
  options = [],
  selectedValues = [],
  onChange,
  required = false,
  error = "",
}) {
  const id = useId();
  const [touched, setTouched] = useState(false);

  const isEmpty = required && selectedValues.length === 0;
  const showError = touched && (isEmpty || error);
  const finalError = isEmpty ? "Please select at least one option" : error;

  const toggleValue = (value) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    onChange && onChange(newValues);
  };

  return (
    <div className="w-full">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Checkboxes in row */}
      <div
        onBlur={() => setTouched(true)}
        className={`flex flex-wrap items-center gap-4 px-4 py-3 rounded-lg border transition-all
          ${showError ? "border-red-500" : "border-gray-300"}
        `}
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2 cursor-pointer select-none text-sm"
          >
            <input
              type="checkbox"
              value={opt.value}
              checked={selectedValues.includes(opt.value)}
              onChange={() => toggleValue(opt.value)}
              className="accent-blue-600"
            />
            {opt.label}
          </label>
        ))}
      </div>

      {/* Error message */}
      {showError && <p className="mt-1 text-xs text-red-600">{finalError}</p>}
    </div>
  );
}
