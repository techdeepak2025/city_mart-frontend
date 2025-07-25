import React from "react";
import { ShoppingCart } from "lucide-react";

export default function CartButton({ onClick, cartCount }) {
  return (
    <button onClick={onClick} className="relative text-gray-700 hover:text-blue-600">
      <ShoppingCart size={22} />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
          {cartCount}
        </span>
      )}
    </button>
  );
}
