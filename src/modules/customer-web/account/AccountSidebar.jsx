import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MapPin, PackageCheck, Gift, ShieldCheck, Menu } from "lucide-react";

export default function AccountSidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      label: "My Addresses",
      to: "/account/addresses",
      icon: <MapPin size={15} />,
    },
    {
      label: "My Orders",
      to: "/account/orders",
      icon: <PackageCheck size={15} />,
    },
    {
      label: "E-Gift Card",
      to: "/account/gift-card",
      icon: <Gift size={15} />,
    },
    {
      label: "Account Privacy",
      to: "/account/privacy",
      icon: <ShieldCheck size={15} />,
    },
  ];

  return (
    <>
      {/* Toggle button only on mobile */}
      <div className="md:hidden p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Account Menu</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu size={20} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-gray-100 md:block w-full md:w-64 p-4 md:relative z-10 transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <nav className="flex flex-col space-y-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${
                location.pathname === link.to ? "bg-gray-300 font-semibold" : ""
              }`}
              onClick={() => setIsOpen(false)} 
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
