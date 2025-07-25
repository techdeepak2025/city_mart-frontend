import React, { useState } from "react";

export default function RatingInput({
  label = "Rating",
  value = 0,
  onChange,
  max = 5,
  required = false,
  error = "",
}) {
  const [hovered, setHovered] = useState(null);
  const [touched, setTouched] = useState(false);

  const isEmpty = required && value === 0;
  const showError = touched && (isEmpty || error);
  const finalError = isEmpty ? "Rating is required" : error;

  const handleSelect = (rating) => {
    onChange(rating);
    setTouched(true);
  };

  return (
    <div className="w-full">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Stars */}
      <div className="flex items-center gap-1">
        {[...Array(max)].map((_, index) => {
          const starValue = index + 1;
          const isActive = hovered
            ? starValue <= hovered
            : starValue <= value;

          return (
            <svg
              key={starValue}
              onClick={() => handleSelect(starValue)}
              onMouseEnter={() => setHovered(starValue)}
              onMouseLeave={() => setHovered(null)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isActive ? "#facc15" : "#e5e7eb"} // yellow-400 or gray-200
              className="w-6 h-6 cursor-pointer transition"
            >
              <path
                d="M12 17.27L18.18 21l-1.63-7.03L22 9.24l-7.19-.61L12 2 9.19 
                8.63 2 9.24l5.45 4.73L5.82 21z"
              />
            </svg>
          );
        })}
      </div>

      {/* Error */}
      {showError && (
        <p className="mt-1 text-xs text-red-600">{finalError}</p>
      )}
    </div>
  );
}
