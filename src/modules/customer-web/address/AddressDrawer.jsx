import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function AddressDrawer({
  isOpen,
  onClose,
  addresses = [],
  onConfirm,
  selectedAddressId,
}) {
  const drawerRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedId(selectedAddressId ?? null);

      const customer = localStorage.getItem("customer");
      console.log("Checking localStorage for login:", customer);

      if (customer) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
  }, [isOpen, selectedAddressId]);

  useEffect(() => {
    console.log("isLoggedIn state updated:", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleProceed = () => {
    const selected = addresses.find((a) => a.id === selectedId);
    if (!selected) return;

    onConfirm(selected);
    onClose();

    if (isLoggedIn) {
      window.location.href = "/checkout";
    } else {
      window.dispatchEvent(new CustomEvent("trigger-login-modal"));
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? "bg-black/60 visible" : "invisible opacity-0"
      }`}
    >
      <div className="absolute inset-0" />

      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-sm font-semibold text-gray-800">
            Choose Delivery Address
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 p-1 rounded hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Debug login state */}
        <div className="text-xs text-gray-500 px-4 pb-1">
          isLoggedIn = {isLoggedIn ? "true" : "false"}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-4 h-full overflow-y-auto">
          {/* Address List */}
          <div className="flex flex-col gap-3 max-h-[65vh] overflow-y-auto pr-1">
            {addresses.map((item) => (
              <label
                key={item.id}
                className={`border rounded-lg p-3 cursor-pointer flex items-start gap-3 transition-colors ${
                  selectedId === item.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                <input
                  type="radio"
                  name="address"
                  className="mt-1 accent-blue-600"
                  checked={selectedId === item.id}
                  onChange={() => setSelectedId(item.id)}
                />
                <div>
                  <p className="text-sm font-semibold">{item.type}</p>
                  <p className="text-xs text-gray-600">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.address}</p>
                  <p className="text-xs text-gray-500">{item.phone}</p>
                </div>
              </label>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-4 border-t">
            {selectedId === null && (
              <p className="text-xs text-red-500 mb-2">
                Please select an address to proceed.
              </p>
            )}
            <button
              onClick={handleProceed}
              disabled={!selectedId}
              className={`w-full py-2 rounded-md text-sm font-medium transition-all duration-200
                ${
                  selectedId
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              {isLoggedIn ? "Proceed to Checkout" : "Proceed to Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
