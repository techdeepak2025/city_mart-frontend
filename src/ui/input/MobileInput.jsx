import React, { useId, useState } from "react";
import { Smartphone } from "lucide-react";

export default function MobileInput({
  label,
  placeholder = "123-456-7890",
  value,
  onChange,
  required = false,
  error = "",
  showIcon = false,
}) {
  const id = useId();
  const [touched, setTouched] = useState(false);

  const rawValue = value.replace(/\D/g, "").slice(0, 10);

  const formattedValue = rawValue.replace(
    /^(\d{3})(\d{0,3})(\d{0,4}).*/,
    (_, p1, p2, p3) => [p1, p2, p3].filter(Boolean).join("-")
  );

  const isEmpty = required && rawValue === "";
  const isInvalidMobile = rawValue.length !== 10;
  const showError = touched && (isEmpty || isInvalidMobile || error);
  const finalError = isEmpty
    ? "This field is required"
    : isInvalidMobile
    ? "Mobile number must be 10 digits"
    : error;

  const hasError = !!finalError && showError;

  const handleInputChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    onChange({ target: { value: digitsOnly } });

    if (!touched) setTouched(true);
  };

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

      {/* Input with icon */}
      <div
        className={`flex items-center gap-2 px-3 py-2 border rounded-lg transition-all
          ${hasError ? "border-red-500" : "border-gray-300"}
          focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent`}
      >
        {showIcon && (
          <Smartphone
            size={18}
            className={`${hasError ? "text-red-500" : "text-gray-400"}`}
          />
        )}
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={formattedValue}
          onChange={handleInputChange}
          onBlur={() => setTouched(true)}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className={`flex-1 bg-transparent outline-none text-sm text-gray-900`}
        />
      </div>

      {/* Error message */}
      {hasError && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {finalError}
        </p>
      )}
    </div>
  );
}
