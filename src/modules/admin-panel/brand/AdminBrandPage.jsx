import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import axiosInstance from "../../../utils/axiosInstance";
import AddBrandForm from "./AddBrandForm";
import EditBrandForm from "./EditBrandForm";
import BrandCard from "./BrandCard";
import { DeleteConfirmationDialog } from "../../../ui/dialog";
import { AddButton } from "../../../ui/button";

export default function AdminBrandPage() {
  const [brands, setBrands] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [brandToEdit, setBrandToEdit] = useState(null);
  const [brandToDelete, setBrandToDelete] = useState(null);

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
      setBrandToDelete(null);
      fetchBrands();
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

  return (
    <div className="p-6 bg-white min-h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Brand Management</h1>
        <AddButton onClick={() => setShowAddForm(true)} label="Add Brand" />
      </div>

      {brands.length === 0 ? (
        <p className="text-gray-600 text-sm">No brands found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {brands.map((brand) => (
            <BrandCard
              key={brand._id}
              brand={brand}
              onEdit={setBrandToEdit}
              onDelete={setBrandToDelete}
            />
          ))}
        </div>
      )}

      {showAddForm && (
        <AddBrandForm isOpen={showAddForm} onClose={handleModalClose} />
      )}

      {brandToEdit && (
        <EditBrandForm
          isOpen={true}
          brandData={brandToEdit}
          onClose={handleModalClose}
        />
      )}

      {brandToDelete && (
        <DeleteConfirmationDialog
          isOpen={true}
          title="Delete Brand"
          message={`Are you sure you want to delete brand "${brandToDelete.name}"?`}
          onCancel={() => setBrandToDelete(null)}
          onConfirm={handleDeleteBrand}
        />
      )}
    </div>
  );
}
