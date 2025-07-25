import { motion } from "framer-motion";

import { EditButton, DeleteButton } from "../../../ui/button";
import NoImageAvatar from "../../../ui/avatar/NoImageAvatar";
import { BASE_URL } from "../../../utils/axiosInstance";

export default function SubCategoryCard({
  subCategory,
  onEdit,
  onDelete,
  hasImageError,
  onImageError,
}) {
  const hasValidImage = subCategory.image?.url && !hasImageError;
  const imageUrl = subCategory.image?.url || "";

  const createdAtFormatted = subCategory.createdAt
    ? new Date(subCategory.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

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
      {/* Image + Info */}
      <div className="flex items-center gap-4">
        {hasValidImage ? (
          <img
            src={imageUrl}
            alt={subCategory.name}
            className="w-20 h-20 rounded object-content border border-gray-200"
            onError={() => onImageError(subCategory._id)}
          />
        ) : (
          <NoImageAvatar />
        )}
        <div>
          <p className="text-gray-800 font-medium">{subCategory.name}</p>
          <p className="text-sm text-gray-600">
            Parent: {subCategory.category?.name || "N/A"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Created: {createdAtFormatted}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <EditButton onClick={() => onEdit(subCategory)} />
        <DeleteButton onClick={() => onDelete(subCategory)} />
      </div>
    </motion.div>
  );
}
