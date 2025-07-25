import { motion } from "framer-motion";
import { EditButton, DeleteButton } from "../../../ui/button";
import NoImageAvatar from "../../../ui/avatar/NoImageAvatar";
import { BASE_URL } from "../../../utils/axiosInstance";

export default function CategoryCard({
  category,
  onEdit,
  onDelete,
  hasImageError,
  onImageError,
}) {
  let imageUrl = "";
  let hasValidImage = false;

  if (typeof category.image === "string") {
    if (category.image.startsWith("http")) {
      imageUrl = category.image;
      hasValidImage = !hasImageError;
    } else {
      imageUrl = `${BASE_URL}/uploads/categories/${category.image}`;
      hasValidImage = category.image !== "" && !hasImageError;
    }
  } else if (
    category.image &&
    typeof category.image === "object" &&
    typeof category.image.url === "string"
  ) {
    imageUrl = category.image.url;
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
      {/* Category Image and Name */}
      <div className="flex items-center gap-4">
        {hasValidImage ? (
          <img
            src={imageUrl}
            alt={category.name || "Category Image"}
            className="w-20 h-20 rounded object-cover border border-gray-200"
            onError={() => onImageError?.(category._id)}
          />
        ) : (
          <NoImageAvatar />
        )}
        <p className="text-gray-800 font-medium truncate max-w-[150px]">
          {category.name}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <EditButton onClick={() => onEdit(category)} />
        <DeleteButton onClick={() => onDelete(category)} />
      </div>
    </motion.div>
  );
}
