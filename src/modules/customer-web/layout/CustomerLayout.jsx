import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import CustomerHeader from "../header/CustomerHeader";
import { Drawer } from "../../../ui/layout";
import Cart from "../cart/Cart";
import { useCart } from "../../../context/CartContext";

export default function CustomerLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <div>
      <CustomerHeader
        onCartClick={() => setIsCartOpen(true)}
        cartCount={totalItems}
      />

      <main className="pt-[65px] sm:pt-[100px] md:pt-[100px] lg:pt-[100px]">
        <Outlet />
      </main>

      <Drawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        title="Your Cart"
        width="w-full sm:w-[400px]"
      >
        <Cart />
      </Drawer>
    </div>
  );
}
