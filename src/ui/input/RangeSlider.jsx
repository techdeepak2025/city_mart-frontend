import React, { useId, useState } from "react";

export default function RangeSlider({
  label = "Select value",
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  required = false,
  error = "",
}) {
  const id = useId();
  const [touched, setTouched] = useState(false);

  const isEmpty = required && (value === null || value === undefined || value === "");
  const showError = touched && (isEmpty || error);
  const finalError = isEmpty ? "This field is required" : error;

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      {/* Label */}
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Range input */}
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onBlur={() => setTouched(true)}
        className="w-full h-2 appearance-none rounded-full outline-none"
        style={{
          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
        }}
      />

      {/* Min / value / max display */}
      <div className="flex justify-between text-sm mt-1 text-gray-600">
        <span>{min}</span>
        <span className={`${showError ? "text-red-600" : "text-gray-800"} font-medium`}>
          {value}
        </span>
        <span>{max}</span>
      </div>

      {/* Error message */}
      {showError && (
        <p className="mt-1 text-xs text-red-600">{finalError}</p>
      )}
    </div>
  );
}
