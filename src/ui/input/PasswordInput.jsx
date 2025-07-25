import React, { useId, useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  label,
  placeholder,
  value,
  onChange,
  error = "",
  required = false,
  showIcon = false,
  onBlur,
}) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);

  const hasError = !!error;

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div
        className={`flex items-center gap-2 px-3 py-2 border rounded-lg transition-all
          ${hasError ? "border-red-500" : "border-gray-300"}
          focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent`}
      >
        {showIcon && (
          <Lock
            size={18}
            className={`${hasError ? "text-red-500" : "text-gray-400"}`}
          />
        )}

        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className="flex-1 bg-transparent outline-none text-sm w-full text-gray-900"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {hasError && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
