import React, { useId } from "react";

export default function Checkbox({
  label,
  checked,
  onChange,
  required = false,
  error = "",
}) {
  const id = useId();

  return (
    <div className="flex flex-col space-y-1 w-full">
      <label htmlFor={id} className="inline-flex items-center space-x-2">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          required={required}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
      </label>

      {error && (
        <p className="text-xs text-red-600 ml-6" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
