import React, { useEffect } from "react";
import {
  ChevronUp,
  ChevronDown,
  LogOut,
  CircleUser,
  X,
  UserCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { userNavigation } from "../../../navigation/userNavigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Account({
  isDropdownOpen,
  setIsDropdownOpen,
  handleLogout,
  isMobile = false,
}) {
  const handleClose = () => setIsDropdownOpen(false);

  useEffect(() => {
    const handleEscape = (e) => e.key === "Escape" && handleClose();
    const handleScroll = () => !isMobile && isDropdownOpen && handleClose();

    document.addEventListener("keydown", handleEscape);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDropdownOpen, isMobile]);

  const menuItems = (
    <>
      {userNavigation(handleClose).map((item, index) => (
        <li key={index} onClick={item.onClick}>
          <Link
            to={item.to}
            className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100"
          >
            <item.icon size={16} />
            {item.label}
          </Link>
        </li>
      ))}
      <li
        className="px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center gap-2 cursor-pointer"
        onClick={handleLogout}
      >
        <LogOut size={16} />
        Log Out
      </li>
    </>
  );

  return (
    <div className="relative z-50">
      {/* Trigger Button */}
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
      >
        {isMobile ? (
          <CircleUser />
        ) : (
          <>
            <span className="hidden md:inline font-semibold text-sm">
              <UserCircle />
            </span>
            {isDropdownOpen ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </>
        )}
      </button>

      {/* Desktop Dropdown */}
      <AnimatePresence>
        {!isMobile && isDropdownOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-52 bg-white border border-gray-400 rounded shadow-lg z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="text-sm text-gray-700">{menuItems}</ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobile && isDropdownOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              onClick={handleClose}
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 w-64 h-screen bg-white shadow-lg z-50"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center gap-2 font-bold text-lg">
                  <img src="/logo.png" alt="Logo" className="h-5 w-5" />
                  <span>
                    <span className="text-purple-700">CITY</span>
                    <span className="text-orange-400">MART</span>
                  </span>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-600 hover:text-red-500"
                >
                  <X size={20} />
                </button>
              </div>
              <ul className="text-sm text-gray-700">{menuItems}</ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
