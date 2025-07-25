import React, { useState } from "react";
import {   MoveLeft } from "lucide-react";

export default function MobileModal({ isOpen, onClose, onContinue }) {
  const [mobileRaw, setMobileRaw] = useState("");
  const [error, setError] = useState("");

  const formatMobile = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const handleChange = (e) => {
    const rawValue = e.target.value;
    const formatted = formatMobile(rawValue);
    setMobileRaw(formatted);
    setError(""); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const plainMobile = mobileRaw.replace(/\D/g, "");
    if (plainMobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    onContinue(plainMobile); 
  };

  const isMobileValid = mobileRaw.replace(/\D/g, "").length === 10;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80" onClick={onClose}></div>

      <div className="relative z-50 bg-white rounded-lg shadow-lg max-w-lg w-full p-6 pt-4 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
        >
          <MoveLeft size={22} />
        </button>

        <div className="mb-3 mt-2">
          <img src="/logo.png" alt="Logo" className="mx-auto h-20" />
        </div>

        <p className="text-2xl font-bold text-gray-800">India's last minute app</p>
        <h2 className="text-md mb-4">Log in or Sign up</h2>

        <form className="space-y-2" onSubmit={handleSubmit}>
          <div className="flex items-center font-semibold border border-gray-300 rounded overflow-hidden focus-within:ring focus-within:ring-blue-500">
            <span className="px-3 py-3 bg-gray-100 text-gray-700">+91</span>
            <input
              type="tel"
              placeholder="123-456-7890"
              className="flex-1 px-3 py-3 outline-none"
              value={mobileRaw}
              onChange={handleChange}
              required
            />
          </div>

          {/* Validation Error */}
          {error && <p className="text-red-500 text-sm text-left">{error}</p>}

          <button
            type="submit"
            disabled={!isMobileValid}
            className={`w-full py-3 mt-2 rounded text-white transition-all ${
              isMobileValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4 px-2">
          By continuing, you agree to our{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Terms of service
          </span>{" "}
          &{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Privacy policy
          </span>
          .
        </p>
      </div>
    </div>
  );
}
