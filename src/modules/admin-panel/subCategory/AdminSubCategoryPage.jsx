import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import axiosInstance from "../../../utils/axiosInstance";
import AddSubCategoryForm from "./AddSubCategoryForm";
import EditSubCategoryForm from "./EditSubCategoryForm";
import { DeleteConfirmationDialog } from "../../../ui/dialog";
import { AddButton } from "../../../ui/button";
import SearchInput from "../../../ui/input/SearchInput";
import SelectDropdown from "../../../ui/input/SelectDropdown";
import SubCategoryCard from "./SubCategoryCard";

export default function AdminSubCategoryPage() {
  const [subCategories, setSubCategories] = useState([]);
  const [categoriesMap, setCategoriesMap] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [subCategoryToEdit, setSubCategoryToEdit] = useState(null);
  const [subCategoryToDelete, setSubCategoryToDelete] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const fetchSubCategories = async () => {
    try {
      const response = await axiosInstance.get("/sub-categories");
      setSubCategories(Array.isArray(response.data) ? response.data : []);
    } catch {
      toast.error("Failed to fetch subcategories");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      if (Array.isArray(response.data)) {
        const map = {};
        response.data.forEach((c) => {
          map[c._id] = c.name;
        });
        setCategoriesMap(map);
      }
    } catch {
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchSubCategories();
    fetchCategories();
  }, []);

  const handleDelete = async () => {
    if (!subCategoryToDelete?._id) return;
    try {
      await axiosInstance.delete(`/sub-categories/${subCategoryToDelete._id}`);
      toast.success("Subcategory deleted successfully");
      setSubCategories((prev) =>
        prev.filter((item) => item._id !== subCategoryToDelete._id)
      );
    } catch {
      toast.error("Failed to delete subcategory");
    } finally {
      setSubCategoryToDelete(null);
    }
  };

  const handleFormSuccess = async (subCategory, isEdit = false) => {
    setShowAddForm(false);
    setSubCategoryToEdit(null);

    if (isEdit) {
      try {
        const res = await axiosInstance.get(`/sub-categories`);
        const updated = res.data.find((s) => s._id === subCategory._id);
        if (updated) {
          setSubCategories((prev) =>
            prev.map((item) => (item._id === updated._id ? updated : item))
          );
        }
      } catch {
        toast.error("Failed to refresh updated subcategory");
      }
    } else {
      setSubCategories((prev) => [subCategory, ...prev]);
    }
  };

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const categoryCounts = subCategories.reduce((acc, sub) => {
    const categoryId =
      typeof sub.category === "string"
        ? sub.category
        : sub.category?._id || "Unknown";
    const name =
      typeof sub.category === "object"
        ? sub.category.name
        : categoriesMap[sub.category] || "Unknown";

    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  const categoryOptions = [
    { label: `All (${subCategories.length})`, value: "All" },
    ...Object.entries(categoryCounts).map(([name, count]) => ({
      label: `${name} (${count})`,
      value: name,
    })),
  ];

  const filteredSubCategories = subCategories.filter((sub) => {
    const subCategoryName = sub.name.toLowerCase();
    const categoryName =
      typeof sub.category === "object"
        ? sub.category.name
        : categoriesMap[sub.category] || "Unknown";

    const matchesSearch = subCategoryName.includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      categoryName.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 pl-4 pt-4 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 ml-12 sm:ml-12 lg:ml-0">
        Subcategory Management
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 pr-4">
        <SearchInput
          placeholder="Search subcategories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SelectDropdown
          placeholder="Filter by Category"
          options={categoryOptions}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        />
        <AddButton onClick={() => setShowAddForm(true)} label="Add Subcategory" />
      </div>

      <div className="h-[calc(100vh-128px)] overflow-y-auto pr-4">
        {filteredSubCategories.length === 0 ? (
          <p className="text-gray-600 text-sm text-center">No subcategories found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSubCategories
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((sub) => (
                <SubCategoryCard
                  key={sub._id}
                  subCategory={sub}
                  onEdit={setSubCategoryToEdit}
                  onDelete={setSubCategoryToDelete}
                  hasImageError={imageErrors[sub._id]}
                  onImageError={handleImageError}
                />
              ))}
          </div>
        )}
      </div>

      {showAddForm && (
        <AddSubCategoryForm
          isOpen
          onClose={() => setShowAddForm(false)}
          onSuccess={(newSubCategory) => handleFormSuccess(newSubCategory, false)}
        />
      )}

      {subCategoryToEdit && (
        <EditSubCategoryForm
          isOpen
          subCategoryData={subCategoryToEdit}
          onClose={() => setSubCategoryToEdit(null)}
          onSuccess={(updatedSubCategory) =>
            handleFormSuccess(updatedSubCategory, true)
          }
        />
      )}

      {subCategoryToDelete && (
        <DeleteConfirmationDialog
          isOpen
          title="Delete Subcategory"
          message={`Are you sure you want to delete "${subCategoryToDelete.name}"?`}
          onCancel={() => setSubCategoryToDelete(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
