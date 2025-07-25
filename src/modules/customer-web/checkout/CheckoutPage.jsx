import React from "react";
import { useCart } from "../../../context/CartContext";
import { toast } from "react-toastify";

export default function CheckoutPage() {
  const { cartItems, totalAmount } = useCart();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // Simulate order submission
    toast.success("🎉 Order placed successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Billing Info */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Address Line 1"
            required
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Address Line 2"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="City"
            required
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="State"
            required
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Postal Code"
            required
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Country"
            required
            className="w-full px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Place Order
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="bg-white rounded-xl p-4 shadow space-y-4">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between border-b pb-2"
                >
                  <span>{item.name}</span>
                  <span>
                    {item.quantity} × ₹{item.price}
                  </span>
                </div>
              ))}
              <div className="flex justify-between pt-4 font-semibold text-lg">
                <span>Total:</span>
                <span>₹{totalAmount}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
