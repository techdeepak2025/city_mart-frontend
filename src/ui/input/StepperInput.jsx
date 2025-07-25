import React from "react";
import { Plus, Minus } from "lucide-react";

export default function StepperInput({
  label = "Quantity",
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  required = false,
  error = "",
  color = "gray",
  width = "max-w-xs",
}) {
  const increment = () => {
    if (value + step <= max) onChange(value + step);
  };

  const decrement = () => {
    if (value - step >= min) onChange(value - step);
  };

  const hasError = !!error;

  const colorClass =
    {
      gray: "bg-gray-100 hover:bg-gray-200 text-gray-700",
      blue: "bg-blue-100 hover:bg-blue-200 text-blue-700",
      green: "bg-green-100 hover:bg-green-200 text-green-700",
      red: "bg-red-100 hover:bg-red-200 text-red-700",
      yellow: "bg-yellow-100 hover:bg-yellow-200 text-yellow-700",
    }[color] || "bg-gray-100 hover:bg-gray-200 text-gray-700";

  return (
    <div className={`${width}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={`flex items-center border rounded-lg overflow-hidden w-full
          ${hasError ? "border-red-500" : "border-gray-300"}`}
      >
        <button
          type="button"
          onClick={decrement}
          className={`px-3 py-2 ${colorClass} disabled:opacity-50`}
          disabled={value <= min}
        >
          <Minus size={16} />
        </button>

        <input
          type="text"
          value={value}
          readOnly
          className="w-full text-center text-sm outline-none py-2 bg-white cursor-default select-none"
        />

        <button
          type="button"
          onClick={increment}
          className={`px-3 py-2 ${colorClass} disabled:opacity-50`}
          disabled={value >= max}
        >
          <Plus size={16} />
        </button>
      </div>

      {hasError && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
