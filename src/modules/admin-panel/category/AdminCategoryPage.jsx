import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";

import AddCategoryForm from "./AddCategoryForm";
import EditCategoryForm from "./EditCategoryForm";
import { DeleteConfirmationDialog } from "../../../ui/dialog";
import { AddButton } from "../../../ui/button";
import SearchInput from "../../../ui/input/SearchInput";
import CategoryCard from "./CategoryCard";

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Failed to fetch categories");
    }
  };

  const handleDeleteCategory = async () => {
    if (!categoryToDelete?._id) return;

    try {
      await axiosInstance.delete(`/categories/${categoryToDelete._id}`);
      toast.success("Category deleted successfully");

      setCategories(prev => prev.filter(cat => cat._id !== categoryToDelete._id));
      setCategoryToDelete(null);
    } catch {
      toast.error("Failed to delete category");
    }
  };

  const handleFormSuccess = (updatedCategory) => {
    console.log("Updated Category:", updatedCategory);
    setShowAddForm(false);
    setCategoryToEdit(null);

    if (updatedCategory?._id) {
      setCategories(prev => {
        const exists = prev.find(cat => cat._id === updatedCategory._id);
        if (exists) {
          return prev.map(cat => cat._id === updatedCategory._id ? updatedCategory : cat);
        }
        return [updatedCategory, ...prev];
      });
    } else {
      fetchCategories(); // fallback in case of mismatch
    }
  };

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 pl-4 pt-4 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 ml-12 sm:ml-12 lg:ml-0">
        Category Management
      </h1>

      {/* Search & Add Button */}
      <div className="flex gap-3 sm:gap-4 mb-2 pr-4">
        <SearchInput
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <AddButton onClick={() => setShowAddForm(true)} label="Add Category" />
      </div>

      {/* Categories Grid */}
      <div className="max-h-[calc(100vh-120px)] overflow-y-auto pr-4">
        {filteredCategories.length === 0 ? (
          <p className="text-gray-600 text-sm text-center">
            No matching categories found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
              <CategoryCard
                key={category._id}
                category={category}
                onEdit={setCategoryToEdit}
                onDelete={setCategoryToDelete}
                hasImageError={imageErrors[category._id]}
                onImageError={handleImageError}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Category Modal */}
      {showAddForm && (
        <AddCategoryForm
          isOpen
          onClose={() => setShowAddForm(false)}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Edit Category Modal */}
      {categoryToEdit && (
        <EditCategoryForm
          isOpen
          categoryData={categoryToEdit}
          onClose={() => setCategoryToEdit(null)}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {categoryToDelete && (
        <DeleteConfirmationDialog
          isOpen
          title="Delete Category"
          message={`Are you sure you want to delete "${categoryToDelete.name}"?`}
          onCancel={() => setCategoryToDelete(null)}
          onConfirm={handleDeleteCategory}
        />
      )}
    </div>
  );
}
