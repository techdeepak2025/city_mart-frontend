import React from "react";
import { Trash2 } from "lucide-react";

export default function CartItem({ item, onRemove, onUpdateQty }) {
  const discountedPrice = Math.round(
    item.price - (item.price * item.discount) / 100
  );

  const imageUrl =
    typeof item.image === "string"
      ? item.image
      : item.image?.url || "/no-image.png";

  return (
    <div className="flex justify-between gap-3 border-b pb-4">
      {/* Left: Image and Info */}
      <div className="flex gap-4 items-start sm:items-center flex-1">
        <img
          src={imageUrl}
          alt={item.name}
          className="w-20 h-20 object-contain bg-gray-200 rounded"
        />
        <div className="flex flex-col">
          <h2 className="font-medium text-sm text-gray-800 line-clamp-2">
            {item.name}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm font-semibold text-gray-700">
              ₹{discountedPrice} × {item.quantity}
            </p>
            {item.discount > 0 && (
              <p className="text-xs text-gray-400 line-through">
                ₹{item.price.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right: Quantity and Remove */}
      <div className="flex items-center gap-3 sm:justify-end">
        {/* Quantity Controls */}
        <div className="flex items-center bg-green-600 text-white rounded-lg overflow-hidden">
          <button
            onClick={() => onUpdateQty(item._id, -1)}
            className="w-8 h-8 hover:bg-green-700 transition"
          >
            −
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => onUpdateQty(item._id, 1)}
            className="w-8 h-8 hover:bg-green-700 transition"
          >
            +
          </button>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => onRemove(item._id)}
          className="text-red-500 hover:text-red-700 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
