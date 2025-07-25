import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Drawer({
  isOpen,
  onClose,
  title = "Drawer Title",
  children,
  width = "w-80",
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer Panel */}
          <motion.div
            className={`absolute top-0 right-0 h-full bg-white shadow-xl ${width}`}
            variants={{
              hidden: { x: "100%" },
              visible: { x: 0 },
              exit: { x: "100%" },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-blue-600 text-white">
              <h2 className="text-base font-semibold truncate">{title}</h2>
              <button
                onClick={onClose}
                aria-label="Close drawer"
                className="w-8 h-8 cursor-pointer hover:bg-gray-50/20 rounded-lg flex items-center justify-center text-white hover:text-red-500 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
