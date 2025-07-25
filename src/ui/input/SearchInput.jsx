import React, { useEffect, useId, useRef, useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchInput({
  placeholder = "Search...",
  value,
  onChange,
}) {
  const id = useId();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const inputRef = useRef(null);

  // Close input on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsMobileOpen(false);
      }
    }

    if (isMobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileOpen]);

  return (
    <div className="w-full relative">
      {/* Full input (visible on sm and up) */}
      <div className="hidden sm:flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm transition-all focus-within:ring-2 focus-within:ring-blue-500">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          id={id}
          type="search"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-transparent w-full outline-none text-sm text-gray-900 placeholder-gray-400"
        />
      </div>

      {/* Mobile version */}
      <div className="sm:hidden">
        {isMobileOpen ? (
          <div
            ref={inputRef}
            className="flex items-center absolute left-0 top-10 w-[20rem] bg-white gap-2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm transition-all focus-within:ring-2 focus-within:ring-blue-500 z-50"
          >
            <Search className="w-4 h-4 text-gray-400" />
            <input
              id={id}
              type="search"
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className="flex-1 w-full bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400"
              autoFocus
            />
          </div>
        ) : (
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 bg-gray-200 rounded-full border border-gray-300 shadow-sm text-gray-500 hover:text-blue-600 hover:ring-2 hover:ring-blue-400 transition-all"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
