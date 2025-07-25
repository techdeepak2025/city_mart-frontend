import React, { useState, useRef, useId } from "react";

export default function OtpInput({
  label = "OTP",
  length = 6,
  value = "",
  onChange,
  required = false,
  error = "",
}) {
  const id = useId();
  const [touched, setTouched] = useState(false);
  const inputsRef = useRef([]);

  const otp = Array.from({ length }, (_, i) => value[i] || "");

  const isEmpty = required && value.trim().length !== length;
  const showError = touched && (isEmpty || error);
  const finalError = isEmpty
    ? `Please enter a ${length}-digit OTP`
    : error;

  const handleChange = (index, e) => {
    const val = e.target.value.replace(/\D/g, "").charAt(0);
    if (!val) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    onChange(newOtp.join(""));

    // Focus next input
    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      if (newOtp[index]) {
        newOtp[index] = "";
        onChange(newOtp.join(""));
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (pasted) {
      onChange(pasted.padEnd(length, ""));
      inputsRef.current[pasted.length - 1]?.focus();
    }
  };

  return (
    <div className="w-fit">
      {/* Label */}
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* OTP Boxes */}
      <div
        className={`flex gap-2 px-1 py-1 rounded-lg border
          ${showError ? "border-red-500" : "border-gray-300"}
          focus-within:ring-2 focus-within:ring-blue-500 transition-all`}
        onBlur={() => setTouched(true)}
        onPaste={handlePaste}
      >
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-10 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-invalid={!!showError}
            aria-describedby={showError ? `${id}-error` : undefined}
          />
        ))}
      </div>

      {/* Error */}
      {showError && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {finalError}
        </p>
      )}
    </div>
  );
}
