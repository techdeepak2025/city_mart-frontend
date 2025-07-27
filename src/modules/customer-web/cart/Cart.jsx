import React, { useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext";
import CartItem from "./CartItem";
import DeliveryEstimate from "./DeliveryEstimate";
import BillSummary from "./BillSummary";
import CancellationPolicy from "./CancellationPolicy";
import CartFooter from "./CartFooter";
import LoginModal from "../login/LoginModal";
import { dummyAddresses } from "../address/Addresses";
import AddressDrawer from "../address/AddressDrawer";
import emptyCartImage from "../../../assets/empty-cart.png.png";

export default function Cart() {
  const { cartItems, removeItem, updateQty } = useCart();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddressConfirmed, setIsAddressConfirmed] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(() => {
    const stored = localStorage.getItem("selectedAddress");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const storedCustomer = localStorage.getItem("customer");
    setIsLoggedIn(!!storedCustomer);
  }, []);

  const handleConfirmAddress = (address) => {
    setIsDrawerOpen(false);
    setIsAddressConfirmed(true);
    setSelectedAddress(address);
    localStorage.setItem("selectedAddress", JSON.stringify(address));
  };

  const DELIVERY_CHARGE = 30;
  const HANDLING_CHARGE = 10;

  const calculateItemTotal = () => {
    return cartItems.reduce((acc, item) => {
      const discounted = Math.round(
        item.price - (item.price * item.discount) / 100
      );
      return acc + discounted * item.quantity;
    }, 0);
  };

  const itemTotal = calculateItemTotal();
  const grandTotal = itemTotal + DELIVERY_CHARGE + HANDLING_CHARGE;

  // Enhanced empty cart UI
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center px-4 py-12">
        <img
          src={emptyCartImage}
          alt="Empty cart"
          className="w-64 h-auto mb-6"
        />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven't added anything yet.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition-all"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-64px)] lg:h-auto max-w-4xl mx-auto">
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-25 sm:pb-10">
          <DeliveryEstimate />
          {cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              onRemove={removeItem}
              onUpdateQty={updateQty}
            />
          ))}
          <BillSummary
            itemTotal={itemTotal}
            deliveryCharge={DELIVERY_CHARGE}
            handlingCharge={HANDLING_CHARGE}
            grandTotal={grandTotal}
          />
          <CancellationPolicy />
        </div>

        <CartFooter
          grandTotal={grandTotal}
          onContinueClick={() => setIsDrawerOpen(true)}
        />

        <AddressDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          addresses={dummyAddresses}
          onEdit={() => {}}
          onDelete={() => {}}
          onConfirm={handleConfirmAddress}
          selectedAddressId={selectedAddress?.id}
        />
      </div>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          setIsLoginOpen(false);
        }}
      />
    </>
  );
}
