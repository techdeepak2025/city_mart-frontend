import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { BASE_URL } from "../../utils/axiosInstance";

export default function InventoryHeader({ user, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-100 via-sky-200 to-violet-200 sticky top-0 z-50 flex justify-between items-center px-6 py-2 shadow-md border-b border-blue-200">
      <div className="flex items-center space-x-3">
        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
        <div>
          <h1 className="text-xl font-bold text-gray-900">Inventory Panel</h1>
          <p className="text-sm">
            🏬 Store No:{" "}
            <span className="font-semibold text-indigo-600">
              {user?.store?.number || "N/A"}
            </span>
          </p>
        </div>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-md hover:bg-gray-100 transition"
        >
          <div className="border rounded-full overflow-hidden">
            <img
              src={
                user?.avatar
                  ? `${BASE_URL}/uploads/users/${user.avatar}`
                  : "/default-avatar.png"
              }
              alt="User Avatar"
              className="h-8 w-8 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-avatar.png";
              }}
            />
          </div>
          <span className="font-medium text-sm text-gray-800">
            {user?.name || "..."}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-800" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
            <button
              onClick={onLogout}
              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
