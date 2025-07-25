import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import axiosInstance from "../../../utils/axiosInstance";
import AddRoleForm from "./AddRoleForm";
import EditRoleForm from "./EditRoleForm";
import RoleCard from "./RoleCard";
import { DeleteConfirmationDialog } from "../../../ui/dialog";
import { AddButton } from "../../../ui/button";
import SearchInput from "../../../ui/input/SearchInput";

export default function AdminRolePage() {
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState(null);
  const [roleToDelete, setRoleToDelete] = useState(null);

  const fetchRoles = async () => {
    try {
      const res = await axiosInstance.get("/roles");
      setRoles(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Failed to fetch roles");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleDeleteRole = async () => {
    if (!roleToDelete?._id) return;
    try {
      await axiosInstance.delete(`/roles/${roleToDelete._id}`);
      toast.success("Role deleted successfully");
      setRoleToDelete(null);
      fetchRoles();
    } catch {
      toast.error("Failed to delete role");
    }
  };

  const handleModalClose = () => {
    setIsAddOpen(false);
    setRoleToEdit(null);
    fetchRoles();
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 px-4 py-6 min-h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 ml-12 sm:ml-12 lg:ml-0">
        Role Management
      </h1>

      {/* Search and Add Layout */}
      <div className="flex gap-3 sm:gap-4 mb-6">
        <SearchInput
          placeholder="Search roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <AddButton onClick={() => setIsAddOpen(true)} label="Add Role" />
      </div>

      {/* Role Cards */}
      {filteredRoles.length === 0 ? (
        <p className="text-gray-600 text-sm text-center">No matching roles found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRoles.map((role) => (
            <RoleCard
              key={role._id}
              role={role}
              onEdit={setRoleToEdit}
              onDelete={setRoleToDelete}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {isAddOpen && <AddRoleForm isOpen={isAddOpen} onClose={handleModalClose} />}
      {roleToEdit && (
        <EditRoleForm
          isOpen={!!roleToEdit}
          defaultValues={roleToEdit}
          onClose={handleModalClose}
        />
      )}
      {roleToDelete && (
        <DeleteConfirmationDialog
          isOpen={!!roleToDelete}
          title="Delete Role"
          message={`Are you sure you want to delete role "${roleToDelete.name}"?`}
          onCancel={() => setRoleToDelete(null)}
          onConfirm={handleDeleteRole}
        />
      )}
    </div>
  );
}
