import React, { useEffect, useState } from "react";
import axiosInstance, { BASE_URL } from "../../../utils/axiosInstance";
import { NumberInput } from "../../../ui/input";
import { SaveButton, ResetButton } from "../../../ui/button";
import { productStockSchema } from "./validation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminStockPage() {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [imageErrorIds, setImageErrorIds] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/products");
      const data = Array.isArray(res.data) ? res.data.filter(Boolean) : [];
      setProducts(data);
      setOriginalProducts(JSON.parse(JSON.stringify(data)));
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const handleStockChange = (index, newStock) => {
    const updated = [...products];
    const product = updated[index];
    const stock = Number(newStock);

    product.stock = stock;

    const result = productStockSchema.safeParse({ stock });

    const newErrors = { ...errors };
    if (!result.success && result.error?.errors) {
      const messages = result.error.errors.map((e) => e.message);
      newErrors[product._id] = messages.join(", ");
    } else {
      delete newErrors[product._id];
    }

    setProducts(updated);
    setErrors(newErrors);
  };

  const resetProduct = (index) => {
    const updated = [...products];
    updated[index] = { ...originalProducts[index] };

    const newErrors = { ...errors };
    delete newErrors[updated[index]._id];

    setProducts(updated);
    setErrors(newErrors);
  };

  const saveStock = async (productId, stock) => {
    if (errors[productId]) {
      toast.error("Please fix validation errors before saving.");
      return;
    }

    setSavingId(productId);
    try {
      await axiosInstance.patch(`/products/${productId}`, {
        stock: parseInt(stock),
      });
      toast.success("Stock updated successfully.");
      const updatedOriginal = products.map((p) =>
        p._id === productId ? { ...p } : p
      );
      setOriginalProducts(updatedOriginal);
    } catch (error) {
      console.error("Error saving stock:", error.response?.data || error);
      toast.error("Failed to save stock. Please try again.");
    } finally {
      setSavingId(null);
    }
  };

  const handleImageError = (id) => {
    setImageErrorIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  if (loading) {
    return <div className="p-4 text-gray-600">Loading products...</div>;
  }

  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-lg sm:text-xl font-bold mb-4">
        Manage Product Stock
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto max-h-[calc(100vh-76px)] pb-6 overflow-x-hidden">
        <AnimatePresence>
          {products.map((product, index) => {
            const imageFile = Array.isArray(product.images)
              ? product.images[0]
              : null;

            const hasImageError = imageErrorIds.includes(product._id);

            // Proper image URL handling (Cloudinary or local)
            let imageUrl = null;
            if (imageFile) {
              if (typeof imageFile === "string") {
                imageUrl = `${BASE_URL}/uploads/products/${imageFile}`;
              } else if (imageFile.url) {
                imageUrl = imageFile.url.startsWith("http")
                  ? imageFile.url
                  : `${BASE_URL}/${imageFile.url}`;
              } else if (imageFile.path) {
                imageUrl = `${BASE_URL}/${imageFile.path}`;
              }
            }

            return (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                whileHover={{ scale: 1.02 }}
                className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm space-y-2 flex flex-col h-auto"
              >
                {/* Image */}
                <div className="h-36 sm:h-40 bg-gray-100 flex justify-center items-center rounded">
                  {imageUrl && !hasImageError ? (
                    <img
                      src={imageUrl}
                      alt={product.name}
                      onError={() => handleImageError(product._id)}
                      className="h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No Image</span>
                  )}
                </div>

                {/* Info */}
                <h2 className="font-semibold text-sm sm:text-base mt-1">
                  {product.name}
                </h2>
                <p className="text-xs text-gray-600">
                  Brand: {product.brand?.name || "-"}
                </p>

                {/* Stock Input */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Stock</label>
                  <NumberInput
                    name={`stock-${index}`}
                    value={product.stock ?? 0}
                    min={0}
                    onChange={(val) => {
                      const parsed = Number(val);
                      handleStockChange(index, isNaN(parsed) ? 0 : parsed);
                    }}
                  />
                  {errors[product._id] && (
                    <span className="text-sm text-red-500">
                      {errors[product._id]}
                    </span>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-auto pt-2">
                  <ResetButton onClick={() => resetProduct(index)} />
                  <SaveButton
                    onClick={() => saveStock(product._id, product.stock)}
                    isLoading={savingId === product._id}
                    disabled={savingId === product._id}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
