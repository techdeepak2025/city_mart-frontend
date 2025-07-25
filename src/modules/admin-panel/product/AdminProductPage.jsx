import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import axiosInstance from "../../../utils/axiosInstance";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm";
import ProductCard from "./ProductCard";
import { DeleteConfirmationDialog } from "../../../ui/dialog";
import { AddButton } from "../../../ui/button";
import SearchInput from "../../../ui/input/SearchInput";
import SelectDropdown from "../../../ui/input/SelectDropdown";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");

  const [showAddForm, setShowAddForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [imageErrorIds, setImageErrorIds] = useState([]);

  const [categoriesMap, setCategoriesMap] = useState({});
  const [brandsMap, setBrandsMap] = useState({});
  const [subCategoriesMap, setSubCategoriesMap] = useState({});

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
    fetchSubCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/products");
      const cleanProducts = Array.isArray(res.data)
        ? res.data.filter((p) => p && p._id)
        : [];
      setProducts(cleanProducts);
    } catch (err) {
      console.error("Failed to fetch products", err);
      toast.error("Failed to fetch products");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      const map = {};
      for (const c of res.data) map[c._id] = c.name;
      setCategoriesMap(map);
    } catch (err) {
      toast.error("Failed to fetch categories");
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await axiosInstance.get("/brands");
      const map = {};
      for (const b of res.data) map[b._id] = b.name;
      setBrandsMap(map);
    } catch (err) {
      toast.error("Failed to fetch brands");
    }
  };

  const fetchSubCategories = async () => {
    try {
      const res = await axiosInstance.get("/sub-categories");
      const map = {};
      for (const sc of res.data) map[sc._id] = sc.name;
      setSubCategoriesMap(map);
    } catch (err) {
      toast.error("Failed to fetch subcategories");
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete?._id) return;

    try {
      await axiosInstance.delete(`/products/${productToDelete._id}`);
      toast.success("Product deleted successfully");
      setProductToDelete(null);
      setProducts((prev) => prev.filter((p) => p?._id !== productToDelete._id));
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  const handleImageError = (productId) => {
    setImageErrorIds((prev) =>
      prev.includes(productId) ? prev : [...prev, productId]
    );
  };

  const handleFormSuccess = (product, isEdit = false) => {
    if (!product || !product._id) return;

    setShowAddForm(false);
    setProductToEdit(null);

    if (isEdit) {
      setProducts((prev) =>
        prev.map((p) => (p._id === product._id ? product : p))
      );
    } else {
      setProducts((prev) => [product, ...prev]);
    }
  };

  const getDisplayName = (ref, map) => {
    if (!ref) return "Unknown";
    if (typeof ref === "object") return ref?.name || "Unknown";
    return map?.[ref] || "Unknown";
  };

  const filteredProducts = products.filter((product) => {
    try {
      if (!product || !product.name) return false;

      const nameMatch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const categoryName = getDisplayName(product.category, categoriesMap);
      const brandName = getDisplayName(product.brand, brandsMap);
      const subCategoryName = getDisplayName(
        product.subcategory,
        subCategoriesMap
      );

      const categoryMatch =
        selectedCategory === "All" || selectedCategory === categoryName;
      const brandMatch = selectedBrand === "All" || selectedBrand === brandName;
      const subCategoryMatch =
        selectedSubCategory === "All" ||
        selectedSubCategory === subCategoryName;

      return nameMatch && categoryMatch && brandMatch && subCategoryMatch;
    } catch (err) {
      return false;
    }
  });

  const getFilterOptions = (items, getKey) => {
    const counts = {};
    for (const item of items) {
      try {
        if (!item) continue;
        const key = getKey(item);
        if (key) counts[key] = (counts[key] || 0) + 1;
      } catch {}
    }

    return [
      { label: `All (${items.length})`, value: "All" },
      ...Object.entries(counts).map(([name, count]) => ({
        label: `${name} (${count})`,
        value: name,
      })),
    ];
  };

  const categoryOptions = getFilterOptions(products, (p) =>
    getDisplayName(p.category, categoriesMap)
  );
  const brandOptions = getFilterOptions(products, (p) =>
    getDisplayName(p.brand, brandsMap)
  );
  const subCategoryOptions = getFilterOptions(products, (p) =>
    getDisplayName(p.subcategory, subCategoriesMap)
  );

  return (
    <div className="bg-gray-50 pl-4 pt-4 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 ml-12 sm:ml-12 lg:ml-0">
        Product Management
      </h1>

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 mb-4 pr-4">
        <SearchInput
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SelectDropdown
          placeholder="Filter by Category"
          options={categoryOptions}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        />
        <SelectDropdown
          placeholder="Filter by Brand"
          options={brandOptions}
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        />
        <SelectDropdown
          placeholder="Filter by Subcategory"
          options={subCategoryOptions}
          value={selectedSubCategory}
          onChange={(e) => setSelectedSubCategory(e.target.value)}
        />
        <AddButton onClick={() => setShowAddForm(true)} label="Add Product" />
      </div>

      <div className="h-[calc(100vh-235px)] overflow-y-auto pr-4">
        {filteredProducts.length === 0 ? (
          <p className="text-gray-600 text-sm text-center">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product, idx) =>
              product && product._id ? (
                <ProductCard
                  key={product._id}
                  product={product}
                  onEdit={() => setProductToEdit(product)}
                  onDelete={() => setProductToDelete(product)}
                  hasImageError={imageErrorIds.includes(product._id)}
                  onImageError={() => handleImageError(product._id)}
                />
              ) : (
                <div key={`invalid-${idx}`} className="hidden" />
              )
            )}
          </div>
        )}
      </div>

      {showAddForm && (
        <AddProductForm
          isOpen={showAddForm}
          onClose={() => setShowAddForm(false)}
          onSuccess={(newProduct) => handleFormSuccess(newProduct, false)}
        />
      )}

      {productToEdit && (
        <EditProductForm
          isOpen
          product={productToEdit}
          onClose={() => setProductToEdit(null)}
          onSuccess={(updatedProduct) =>
            handleFormSuccess(updatedProduct, true)
          }
        />
      )}

      {productToDelete && (
        <DeleteConfirmationDialog
          isOpen
          title="Delete Product"
          message={`Are you sure you want to delete "${productToDelete.name}"?`}
          onCancel={() => setProductToDelete(null)}
          onConfirm={handleDeleteProduct}
        />
      )}
    </div>
  );
}
