import React from "react";
import { motion } from "framer-motion";
import { EditButton, DeleteButton } from "../../../ui/button";
import NoImageAvatar from "../../../ui/avatar/NoImageAvatar";
import { BASE_URL } from "../../../utils/axiosInstance";

export default function BrandCard({ brand, onEdit, onDelete }) {
  const hasLogo = brand.logo?.url;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white w-30 p-2 rounded-lg shadow-md border border-gray-100 relative overflow-hidden"
    >
      <div className="w-full">
        <div className="h-18 flex justify-center items-center">
          {hasLogo ? (
            <img
              src={brand.logo.url}
              alt={brand.name || "Brand Logo"}
              className="object-content max-h-[60px]"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-image.png";
              }}
            />
          ) : (
            <NoImageAvatar />
          )}
        </div>

        <p className="text-gray-800 font-medium text-sm truncate mt-2 text-center">
          {brand.name}
        </p>
      </div>

      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <EditButton onClick={() => onEdit(brand)} />
        <DeleteButton onClick={() => onDelete(brand)} />
      </div>
    </motion.div>
  );
}

