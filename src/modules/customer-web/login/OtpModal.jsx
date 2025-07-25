import React, { useState } from "react";
import { MoveLeft } from "lucide-react";
import { OtpInput } from "../../../ui/input";

export default function OtpModal({ isOpen, onClose, phone, onVerify, onBack }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    setError("");
    onVerify(otp); 
  };

  const isOtpValid = otp.length === 6;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative z-50 bg-white rounded-lg shadow-lg max-w-lg w-full p-6 pt-4 text-center">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
        >
          <MoveLeft size={22} />
        </button>

        {/* Logo */}
        <div className="mb-3 mt-2">
          <img src="/logo.png" alt="Logo" className="mx-auto h-20" />
        </div>

        {/* Header */}
        <p className="text-xl font-semibold text-gray-800">Verify OTP</p>
        <p className="text-sm text-gray-500 mb-4">Sent to +91 {phone}</p>

        {/* OTP Input */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-4"
        >
          <OtpInput
            length={6}
            value={otp}
            onChange={setOtp}
            required
            error={error}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={!isOtpValid}
            className={`w-full py-3 rounded text-white transition-all ${
              isOtpValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Verify & Continue
          </button>
        </form>

        {/* Resend Placeholder */}
        <p className="text-xs text-gray-500 mt-4">
          Didn't get the code?{" "}
          <span className="text-blue-600 cursor-pointer">Resend</span>
        </p>
      </div>
    </div>
  );
}
