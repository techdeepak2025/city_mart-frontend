import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { accountRoutes } from "../../../navigation/userNavigation";

export default function AccountSidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      className={`bg-gray-200 md:block w-full md:w-64 p-4 md:relative z-10 transition-all duration-300 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <nav className="flex flex-col space-y-2">
        {accountRoutes.map(({ label, to, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${
              location.pathname === to ? "bg-gray-300 font-semibold" : ""
            }`}
          >
            <Icon size={15} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
