import React from "react";
import { Link, useLocation } from "react-router-dom";
import { accountRoutes } from "../../../navigation/userNavigation";

export default function AccountSidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:block bg-gray-100 w-64 p-4 border-r">
      <nav className="flex flex-col space-y-2">
        {accountRoutes.map(({ label, to, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-2 p-2 rounded transition ${
              location.pathname === to
                ? "bg-gray-300 font-semibold"
                : "hover:bg-gray-200"
            }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}