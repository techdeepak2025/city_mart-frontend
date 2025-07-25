import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Settings, ChevronDown, ChevronRight, X } from "lucide-react";
import { navItems } from "../../../navigation/adminNavigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminSidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openGroup, setOpenGroup] = useState(null);

  const handleGroupClick = (name) => {
    setOpenGroup((prev) => (prev === name ? null : name));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleNavClick = () => {
    if (window.innerWidth < 1024) onClose(); 
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen z-50 transform transition-transform duration-300
        w-64 bg-gradient-to-br from-[#1f44a8] via-[#3b82f6] to-[#7bb0ec]
        text-white shadow-xl border-r border-blue-300 flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static
      `}
    >
      {/* Header / Logo */}
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-8 drop-shadow-md" />
          <h1 className="text-lg font-bold">Admin Panel</h1>
        </div>
        {/* Close Button (Mobile) */}
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded hover:bg-white/20 transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin pr-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActiveParent = item.children?.some((child) =>
              location.pathname.startsWith(child.path)
            );
            const isOpenGroup = openGroup === item.name;

            return (
              <li key={item.name}>
                <div className={`relative ${isActiveParent || isOpenGroup ? "bg-white/10" : ""}`}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => handleGroupClick(item.name)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 transition-all duration-200 ${
                          isActiveParent
                            ? "text-white font-semibold"
                            : "text-white/80 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span>{item.name}</span>
                        </div>
                        {isOpenGroup ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </button>

                      <AnimatePresence>
                        {isOpenGroup && (
                          <motion.div
                            className="ml-5 pl-3 border-l border-white/30 overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                          >
                            <ul className="space-y-1 mt-1">
                              {item.children.map((child) => (
                                <li key={child.name}>
                                  <NavLink
                                    to={child.path}
                                    onClick={handleNavClick}
                                    className={({ isActive }) =>
                                      `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                                        isActive
                                          ? "bg-white/90 text-blue-900 font-semibold shadow"
                                          : "text-white/70 hover:text-white hover:bg-white/10"
                                      }`
                                    }
                                  >
                                    {child.icon && <child.icon className="w-4 h-4" />}
                                    <span>{child.name}</span>
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <NavLink
                      to={item.path}
                      end
                      onClick={handleNavClick}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-md transition ${
                          isActive
                            ? "bg-white/90 text-blue-900 font-semibold shadow"
                            : "text-white/80 hover:text-white hover:bg-white/20"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </NavLink>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Actions */}
      <div className="p-3 flex justify-between items-center">
        <NavLink
          to="/settings"
          title="Settings"
          onClick={handleNavClick}
          className={({ isActive }) =>
            `p-2 rounded-full transition hover:bg-white/20 ${
              isActive ? "bg-white/80 text-blue-900" : "text-white/80"
            }`
          }
        >
          <Settings size={20} />
        </NavLink>

        <button
          onClick={handleLogout}
          title="Logout"
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/20 text-red-500 hover:bg-red-100 transition font-medium"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
