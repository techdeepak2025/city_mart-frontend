import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "./Logo";
import DeliveryAddress from "./DeliveryAddress";
import CartButton from "./CartButton";
import SearchBar from "./SearchBar";
import LoginModal from "../login/LoginModal";
import AddressModal from "../address/AddressModal";
import Account from "./Account";

export default function CustomerHeader({ onCartClick, cartCount = 0 }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Load saved address
  useEffect(() => {
    const stored = localStorage.getItem("selectedAddress");
    if (stored) setSelectedAddress(JSON.parse(stored));
  }, []);

  // Load login state
  useEffect(() => {
    const storedCustomer = localStorage.getItem("customer");
    setIsLoggedIn(!!storedCustomer);
  }, []);

  // Handle dropdown outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    localStorage.setItem("selectedAddress", JSON.stringify(address));
  };

  const handleLoginSuccess = () => {
    const customerData = { phone: "******", name: "Guest User" };
    localStorage.setItem("customer", JSON.stringify(customerData));
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem("customer");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate("/", { replace: true });
  }, [navigate]);

  const renderAuthControls = (isMobile = false) =>
    !isLoggedIn ? (
      <button
        onClick={() => setIsLoginOpen(true)}
        className={`bg-blue-600 text-white ${
          isMobile ? "px-3 py-1" : "px-4 py-1.5"
        } text-sm font-semibold rounded hover:bg-blue-700`}
      >
        Login
      </button>
    ) : (
      <Account
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        handleLogout={handleLogout}
        isMobile={isMobile}
      />
    );

  return (
    <>
      <header className="fixed h-[60px] w-full bg-gradient-to-tr from-purple-100 via-blue-200 to-blue-300 shadow-2xl border-b border-blue-200 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 relative">
          {/* Desktop Header */}
          <div className="hidden sm:flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Logo />
              <DeliveryAddress
                onClick={() => setIsAddressOpen(true)}
                selectedAddress={selectedAddress}
              />
            </div>

            <div className="flex-grow max-w-md">
              <SearchBar />
            </div>

            <div className="flex items-center gap-3" ref={dropdownRef}>
              {renderAuthControls(false)}
              <CartButton onClick={onCartClick} cartCount={cartCount} />
            </div>
          </div>

          {/* Mobile Header */}
          <div className="sm:hidden flex flex-col gap-2">
            <div className="flex items-center gap-3" ref={dropdownRef}>
              <div className="flex-1 min-w-0">
                <DeliveryAddress
                  onClick={() => setIsAddressOpen(true)}
                  selectedAddress={selectedAddress}
                />
              </div>
              <CartButton onClick={onCartClick} cartCount={cartCount} />
              {renderAuthControls(true)}
            </div>
            <SearchBar />
          </div>
        </div>
      </header>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <AddressModal
        isOpen={isAddressOpen}
        onClose={() => setIsAddressOpen(false)}
        onSelectAddress={handleSelectAddress}
      />
    </>
  );
}
