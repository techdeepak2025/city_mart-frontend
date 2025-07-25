import { motion } from "framer-motion";
import { EditButton, DeleteButton } from "../../../ui/button";
import NoImageAvatar from "../../../ui/avatar/NoImageAvatar";

export default function ProductCard({
  product,
  onEdit,
  onDelete,
  hasProductImageError,
  onImageError,
}) {
  const productImage = product?.images?.[0];
  const brandImage = product?.brand?.logo;

  const hasValidImage = productImage?.url && !hasProductImageError;
  const productImageUrl = productImage?.url;
  const brandImageUrl = brandImage?.url || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow p-3 flex flex-col gap-3"
    >
      {/* Image */}
      <div className="flex justify-center h-40 bg-gray-100 p-2 rounded-lg">
        {hasValidImage ? (
          <img
            src={productImageUrl}
            alt={product?.name || "Product"}
            className="h-full object-contain"
            onError={() => onImageError?.(product._id)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <NoImageAvatar className="w-16 h-16" />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1">
        <h2 className="text-base font-medium text-gray-800 mb-1">{product.name}</h2>

        <div className="flex items-center text-sm text-gray-500">
          <span>{product.category?.name}</span>
          <span className="mx-1">•</span>
          <span>{product.subcategory?.name}</span>
        </div>

        {/* Brand with optional image */}
        {product.brand?.name && (
          <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
            <span>{product.brand.name}</span>
            {brandImageUrl && (
              <img
                src={brandImageUrl}
                alt="Brand"
                className="h-3 object-contain ml-2"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            )}
          </div>
        )}

        {/* Price or other info */}
        {product.mrp && (
          <p className="mt-2 text-sm text-green-600 font-semibold">₹{product.mrp}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-2">
        <EditButton onClick={() => onEdit(product)} />
        <DeleteButton onClick={() => onDelete(product)} />
      </div>
    </motion.div>
  );
}
