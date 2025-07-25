import React, { useState } from "react";
import MobileModal from "./MobileModal";
import OtpModal from "./OtpModal";
import { toast } from "react-toastify";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [phone, setPhone] = useState("");

  const handleLoginSubmit = (mobile) => {
    setPhone(mobile);
    setIsOtpOpen(true);
    toast.info(`OTP sent to +91 ${mobile}`, {
      position: "top-center",
    });
  };

  const handleOtpVerify = (otp) => {
    if (otp === "123456") {
      toast.success("OTP Verified Successfully!", {
        position: "top-center",
      });

      // 🔐 Save customer mock info to localStorage
      const customerData = {
        phone,
        name: "Guest User",
      };
      localStorage.setItem("customer", JSON.stringify(customerData));
      localStorage.setItem("isLoggedIn", "true");

      onLoginSuccess();
    } else {
      toast.error("Invalid OTP. Please try again.", {
        position: "top-center",
      });
    }
  };

  const handleCloseAll = () => {
    setIsOtpOpen(false);
    onClose();
  };

  return (
    <>
      <MobileModal
        isOpen={isOpen && !isOtpOpen}
        onClose={handleCloseAll}
        onContinue={handleLoginSubmit}
      />
      <OtpModal
        isOpen={isOpen && isOtpOpen}
        onClose={handleCloseAll}
        onBack={() => setIsOtpOpen(false)}
        onVerify={handleOtpVerify}
        phone={phone}
      />
    </>
  );
}
