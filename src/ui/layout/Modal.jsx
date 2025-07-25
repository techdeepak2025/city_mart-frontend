import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({
  isOpen,
  onClose,
  title = "Modal Title",
  children,
  color = "bg-blue-600",
}) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl max-w-2xl w-fitt max-h-[90vh] mx-4 shadow-xl flex flex-col"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header (fixed) */}
            <div className={`flex items-center justify-between px-4 py-2 ${color} sticky top-0 z-10 rounded-t-xl`}>
              <h3 className="text-base font-semibold text-white truncate">{title}</h3>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="w-8 h-8 hover:bg-white/10 rounded-lg flex items-center justify-center text-white hover:text-red-500 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="px-4 py-4 text-sm text-gray-700 mb-0">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
