import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";

import AddBrandForm from "./AddBrandForm";
import EditBrandForm from "./EditBrandForm";
import BrandCard from "./BrandCard";
import { DeleteConfirmationDialog } from "../../../ui/dialog";
import { AddButton } from "../../../ui/button";
import SearchInput from "../../../ui/input/SearchInput";

export default function AdminBrandPage() {
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [brandToEdit, setBrandToEdit] = useState(null);
  const [brandToDelete, setBrandToDelete] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const fetchBrands = async () => {
    try {
      const response = await axiosInstance.get("/brands");
      setBrands(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      toast.error("Failed to fetch brands");
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleDeleteBrand = async () => {
    if (!brandToDelete?._id) return;
    try {
      await axiosInstance.delete(`/brands/${brandToDelete._id}`);
      toast.success("Brand deleted successfully");
      setBrands(prev => prev.filter(b => b._id !== brandToDelete._id));
      setBrandToDelete(null);
    } catch (error) {
      toast.error("Failed to delete brand");
    }
  };

  const handleModalClose = () => {
    setShowAddForm(false);
    setBrandToEdit(null);
    setBrandToDelete(null);
    fetchBrands();
  };

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 pl-4 pt-4 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 ml-12 sm:ml-12 lg:ml-0">
        Brand Management
      </h1>

      {/* Search & Add Button */}
      <div className="flex gap-3 sm:gap-4 mb-2 pr-4">
        <SearchInput
          placeholder="Search brands..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <AddButton onClick={() => setShowAddForm(true)} label="Add Brand" />
      </div>

      {/* Brands Grid */}
      <div className="max-h-[calc(100vh-120px)] overflow-y-auto pr-4">
        {filteredBrands.length === 0 ? (
          <p className="text-gray-600 text-sm text-center">
            No matching brands found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBrands.map((brand) => (
              <BrandCard
                key={brand._id}
                brand={brand}
                onEdit={setBrandToEdit}
                onDelete={setBrandToDelete}
                hasImageError={imageErrors[brand._id]}
                onImageError={handleImageError}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Brand Modal */}
      {showAddForm && (
        <AddBrandForm isOpen onClose={handleModalClose} />
      )}

      {/* Edit Brand Modal */}
      {brandToEdit && (
        <EditBrandForm
          isOpen
          brandData={brandToEdit}
          onClose={handleModalClose}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {brandToDelete && (
        <DeleteConfirmationDialog
          isOpen
          title="Delete Brand"
          message={`Are you sure you want to delete "${brandToDelete.name}"?`}
          onCancel={() => setBrandToDelete(null)}
          onConfirm={handleDeleteBrand}
        />
      )}
    </div>
  );
}
