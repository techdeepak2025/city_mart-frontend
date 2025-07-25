import React from "react";
import { motion } from "framer-motion";
import { EditButton, DeleteButton } from "../../../ui/button";
import NoImageAvatar from "../../../ui/avatar/NoImageAvatar";
import { BASE_URL } from "../../../utils/axiosInstance";

export default function BrandCard({
  brand,
  onEdit,
  onDelete,
  hasImageError,
  onImageError,
}) {
  let imageUrl = "";
  let hasValidImage = false;

  if (typeof brand.logo === "string") {
    if (brand.logo.startsWith("http")) {
      imageUrl = brand.logo;
      hasValidImage = !hasImageError;
    } else {
      imageUrl = `${BASE_URL}/uploads/brands/${brand.logo}`;
      hasValidImage = brand.logo !== "" && !hasImageError;
    }
  } else if (
    brand.logo &&
    typeof brand.logo === "object" &&
    typeof brand.logo.url === "string"
  ) {
    imageUrl = brand.logo.url;
    hasValidImage = !hasImageError;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 flex items-center justify-between gap-6 min-h-[120px] relative"
    >
      {/* Brand Logo and Name */}
      <div className="flex items-center gap-4">
        {hasValidImage ? (
          <img
            src={imageUrl}
            alt={brand.name || "Brand Logo"}
            className="w-20 h-20 rounded object-contain border border-gray-200"
            onError={() => onImageError?.(brand._id)}
          />
        ) : (
          <NoImageAvatar />
        )}
        <p className="text-gray-800 font-medium truncate max-w-[150px]">
          {brand.name}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <EditButton onClick={() => onEdit(brand)} />
        <DeleteButton onClick={() => onDelete(brand)} />
      </div>
    </motion.div>
  );
}
