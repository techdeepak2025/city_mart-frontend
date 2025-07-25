import React, { useId, useState } from "react";

export default function FileInput({
  label = "Upload File",
  required = false,
  accept = "*", // e.g., "image/*", ".pdf"
  error = "",
  onChange,
}) {
  const id = useId();
  const [touched, setTouched] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
    onChange && onChange(e);
  };

  const isEmpty = required && !fileName;
  const showError = touched && (isEmpty || error);
  const finalError = isEmpty ? "File is required" : error;

  return (
    <div className="w-full">
      {/* Label */}
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Input */}
      <input
        id={id}
        type="file"
        accept={accept}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        className={`w-full text-sm file:mr-4 file:py-2 file:px-4 rounded-lg
          file:border-0 file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100
          ${
            showError
              ? "border border-red-500 text-red-600"
              : "border border-gray-300"
          }
        `}
      />

      {/* File name */}
      {fileName && (
        <p className="mt-1 text-sm text-gray-600">Selected: {fileName}</p>
      )}

      {/* Error */}
      {showError && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {finalError}
        </p>
      )}
    </div>
  );
}
