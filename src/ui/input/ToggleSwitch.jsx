import React from "react";

export default function ToggleSwitch({
    enabled = false,
  onChange,
  disabled = false,
}) {
  return (
   <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={enabled ? "Enabled" : "Disabled"}
      title={enabled ? "Enabled" : "Disabled"}
      disabled={disabled}
      onClick={() => !disabled && onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
        ${disabled
          ? "bg-gray-300 cursor-not-allowed"
          : enabled
          ? "bg-teal-500 hover:bg-teal-600"
          : "bg-gray-400 hover:bg-gray-500"}
      `}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
          ${enabled ? "translate-x-5" : "translate-x-1"}
        `}
      />
    </button>
  );
}
