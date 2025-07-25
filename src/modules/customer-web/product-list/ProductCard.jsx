import React, { useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductCard({
  _id,
  image,
  title,
  price = 0,
  discount = 0,
  quantityAvailable = 0,
  measurement,
  unit,
  brand,
  currency = "INR",
}) {
  const [qty, setQty] = useState(0);
  const { cartItems, addItem, removeItem, updateQty } = useCart();

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });

  const discountedPrice = Math.round(price - (price * discount) / 100);

  const productImage = image || "/fallback-image.png";

  const brandLogoUrl =
    typeof brand === "object" && brand?.logo?.url
      ? brand.logo.url
      : null;

  const handleAdd = (e) => {
    e.stopPropagation();
    if (qty < quantityAvailable) {
      setQty(qty + 1);
      const isExisting = cartItems.find((item) => item._id === _id);
      if (isExisting) {
        updateQty(_id, 1);
      } else {
        addItem({
          _id,
          name: title,
          price,
          discount,
          image: image, // ✅ Keep full Cloudinary URL
          quantity: 1,
        });
      }
    }
  };

  const handleMinus = (e) => {
    e.stopPropagation();
    if (qty > 0) {
      setQty(qty - 1);
      if (qty === 1) {
        removeItem(_id);
      } else {
        updateQty(_id, -1);
      }
    }
  };

  useEffect(() => {
    const cartItem = cartItems.find((item) => item._id === _id);
    if (cartItem) {
      setQty(cartItem.quantity);
    } else {
      setQty(0);
    }
  }, [cartItems, _id]);

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-300 w-full max-w-xs sm:w-[48%] md:w-full border border-gray-200 overflow-hidden">
      <Link
        to={`/product/${_id}`}
        className="block relative h-40 sm:h-44 md:h-48 bg-gray-100 overflow-hidden"
      >
        <img
          src={productImage}
          alt={title}
          onError={(e) => (e.target.src = "/fallback-image.png")}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            {discount}% OFF
          </span>
        )}
      </Link>

      {brand && brandLogoUrl && (
        <div className="px-3 pt-1">
          <img
            src={brandLogoUrl}
            alt={brand.name || "Brand"}
            className="h-3 object-contain"
          />
        </div>
      )}

      <div className="px-3 pb-3">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
          <Link to={`/product/${_id}`}>{title}</Link>
        </h3>

        {measurement && unit && (
          <span className="text-xs text-gray-500">{`${measurement} ${unit}`}</span>
        )}

        <div className="flex justify-between items-end mt-1">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-700">
              {formatter.format(discountedPrice)}
            </span>
            {discount > 0 && (
              <span className="text-xs line-through text-gray-400">
                {formatter.format(price)}
              </span>
            )}
          </div>

          {qty === 0 ? (
            <button
              onClick={handleAdd}
              disabled={quantityAvailable === 0}
              className={`h-8 px-3 text-xs w-20 font-medium rounded-lg border transition ${
                quantityAvailable === 0
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-green-600 hover:bg-green-100 border-green-500"
              }`}
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center h-8 bg-green-600 text-white rounded-lg text-sm">
              <button
                onClick={handleMinus}
                disabled={qty <= 0}
                className="px-2 text-lg disabled:opacity-40 hover:font-bold"
              >
                −
              </button>
              <span className="w-6 cursor-default text-center font-medium">
                {qty}
              </span>
              <button
                onClick={handleAdd}
                disabled={qty >= quantityAvailable}
                className="px-2 text-lg disabled:opacity-40 hover:font-bold"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
