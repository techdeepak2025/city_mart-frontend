import React, { useState, useRef, useEffect, useId } from "react";
import { Check, ChevronDown } from "lucide-react";

export default function SelectDropdown({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  required = false,
  error = "",
  className = "",
}) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const measureRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const [dropdownWidth, setDropdownWidth] = useState("auto");

  const safeOptions = Array.isArray(options) ? options : [];

  const selectedOption = safeOptions.find((opt) => opt.value === value);
  const hasError = !!error;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-position dropdown
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      setDropdownPosition(rect.bottom + 250 > windowHeight ? "top" : "bottom");
    }
  }, [isOpen]);

  // Measure dropdown width
  useEffect(() => {
    if (measureRef.current) {
      const widths = Array.from(measureRef.current.children).map((el) =>
        el.getBoundingClientRect().width
      );
      const maxWidth = Math.max(...widths, 120);
      setDropdownWidth(`${maxWidth + 40}px`);
    }
  }, [safeOptions]);

  const handleSelect = (val) => {
    onChange?.({ target: { value: val } });
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} style={{ width: dropdownWidth }}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && (
            <>
              <span className="text-red-500 ml-1">*</span>
              <span className="sr-only"> (required)</span>
            </>
          )}
        </label>
      )}

      {/* Trigger */}
      <div
        ref={triggerRef}
        className={`relative border rounded-lg px-3 py-2 text-sm cursor-pointer flex items-center justify-between
          ${hasError ? "border-red-500" : "border-gray-300"}
          focus-within:ring-2 focus-within:ring-blue-500`}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen(!isOpen)}
      >
        <span className={`truncate ${selectedOption ? "text-gray-900" : "text-gray-400"}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 ${hasError ? "text-red-600" : "text-gray-400"}`} />
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <ul
          ref={dropdownRef}
          className={`absolute text-sm z-50 bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto
            ${dropdownPosition === "top" ? "bottom-full mb-2" : "top-full mt-1"}`}
          style={{ maxHeight: "min(250px, 40vh)", width: dropdownWidth }}
        >
          {safeOptions.length > 0 ? (
            safeOptions.map((opt) => (
              <li
                key={opt.value}
                className={`px-4 py-2 flex items-center gap-2 hover:bg-blue-100 cursor-pointer ${
                  value === opt.value ? "font-semibold text-blue-600" : ""
                }`}
                onClick={() => handleSelect(opt.value)}
              >
                {value === opt.value ? (
                  <Check className="w-4 h-4 text-blue-600" />
                ) : (
                  <span className="w-4 h-4" />
                )}
                <span>{opt.label}</span>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500 italic">No options available</li>
          )}
        </ul>
      )}

      {/* Error message */}
      {hasError && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}

      {/* Hidden width measurer */}
      <ul ref={measureRef} className="invisible absolute w-auto whitespace-nowrap p-0 m-0">
        {safeOptions.map((opt) => (
          <li key={opt.value} className="px-4 py-2 text-sm font-normal">
            {opt.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
