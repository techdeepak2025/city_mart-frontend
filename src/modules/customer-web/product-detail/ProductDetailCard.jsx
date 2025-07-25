import React, { useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext";
import { MoveRight, Plus } from "lucide-react";

export default function ProductDetailCard({ product }) {
  const [qty, setQty] = useState(0);
  const { addItem, updateQty, removeItem, cartItems } = useCart();
  const stock = product.stock || 0;

  useEffect(() => {
    const cartItem = cartItems.find((item) => item._id === product._id);
    if (cartItem) {
      setQty(cartItem.quantity);
    } else {
      setQty(0);
    }
  }, [cartItems, product._id]);

  const add = () => {
    if (qty < stock) {
      setQty(qty + 1);
      const exists = cartItems.find((item) => item._id === product._id);
      if (exists) {
        updateQty(product._id, 1);
      } else {
        addItem({
          _id: product._id,
          name: product.name,
          price: product.mrp,
          discount: product.discount || 0,
          image: product.images?.[0],
          quantity: 1,
        });
      }
    }
  };

  const minus = () => {
    if (qty > 0) {
      setQty(qty - 1);
      if (qty === 1) {
        removeItem(product._id);
      } else {
        updateQty(product._id, -1);
      }
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-md shadow-sm">
      <p className="text-gray-900 text-lg sm:text-xl font-semibold">
        {product.name}
      </p>

      {/* Brand section */}
      <div className="flex items-center justify-between bg-gray-100 p-2 rounded border border-gray-200">
        {product.brand?.logo?.url && (
          <img
            src={product.brand.logo.url}
            alt={product.brand.name || "Brand"}
            className="h-5 sm:h-6 object-contain"
          />
        )}
        <MoveRight className="text-gray-700" />
      </div>

      {/* Unit Selector */}
      <div>
        <label className="text-sm font-medium text-gray-800">Select Unit</label>
        <div className="mt-2 flex gap-3 flex-wrap">
          {[500, 1000].map((ml, i) => (
            <button
              key={i}
              className="flex flex-col text-sm py-1 items-center border bg-green-50 border-green-500 rounded-md w-[90px]"
            >
              <span>{ml}ml</span>
              <span className="font-semibold">₹ {29}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price & Add to Cart */}
      <div className="flex justify-between items-center border-y border-gray-200 py-2">
        <div>
          <p className="text-sm text-gray-700">500ml</p>
          <p className="text-xl font-bold text-green-700">
            ₹{product.mrp?.toFixed(2)}
          </p>
        </div>

        <div>
          {qty === 0 ? (
            <button
              onClick={add}
              disabled={stock === 0}
              className={`h-9 px-4 text-sm font-medium flex items-center gap-2 text-white rounded-md ${
                stock === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              <Plus size={18} /> Add to cart
            </button>
          ) : (
            <div className="flex items-center h-10 bg-green-600 text-white rounded-md">
              <button
                onClick={minus}
                disabled={qty <= 0}
                className="px-3 text-lg"
              >
                −
              </button>
              <span className="px-3 select-none">{qty}</span>
              <button
                onClick={add}
                disabled={qty >= stock}
                className="px-3 text-lg"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Why Shop section */}
      <div className="space-y-3 mt-4">
        <h2 className="text-sm font-semibold text-gray-700">
          Why shop from <span className="text-purple-600">City</span>{" "}
          <span className="text-yellow-500">Mart</span>?
        </h2>

        {[
          {
            img: "/delivery.avif",
            title: "Superfast Delivery",
            desc: "Get your order delivered to your doorstep at the earliest from dark stores near you.",
          },
          {
            img: "/Best_Prices_Offers.avif",
            title: "Best Prices & Offers",
            desc: "Best price destination with offers directly from the manufacturers.",
          },
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <img src={item.img} alt={item.title} className="w-10 h-10" />
            <div className="text-xs text-gray-600">
              <p className="font-semibold text-gray-800">{item.title}</p>
              <p className="text-gray-500 mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
