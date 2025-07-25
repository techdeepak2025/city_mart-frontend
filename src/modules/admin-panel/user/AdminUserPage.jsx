import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import axiosInstance from "../../../utils/axiosInstance";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";
import UserCard from "./UserCard";
import { DeleteConfirmationDialog } from "../../../ui/dialog";
import { SearchInput, SelectDropdown } from "../../../ui/input";
import { AddButton } from "../../../ui/button";

export default function AdminUserPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users");
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async () => {
    if (!userToDelete?._id) return;
    try {
      await axiosInstance.delete(`/users/${userToDelete._id}`);
      toast.success("User deleted successfully");
      setUserToDelete(null);
      fetchUsers();
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const handleModalClose = () => {
    setShowAddForm(false);
    setUserToEdit(null);
    setUserToDelete(null);
    fetchUsers();
  };

  const formatRole = (role) => {
    const roleName = typeof role === "object" ? role?.name : role;
    return roleName ? roleName.toLowerCase() : "unknown";
  };

  // Role count for dropdown filter
  const roleCounts = users.reduce((acc, user) => {
    const role = formatRole(user.role);
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});

  const roleOptions = [
    { label: `All (${users.length})`, value: "All" },
    ...Object.entries(roleCounts).map(([role, count]) => ({
      label: `${role.charAt(0).toUpperCase() + role.slice(1)} (${count})`,
      value: role,
    })),
  ];

  const filteredUsers = users.filter((user) => {
    const roleMatch =
      selectedRole === "All" || formatRole(user.role) === selectedRole;
    const searchMatch = [user.name, user.mobile]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return roleMatch && searchMatch;
  });

  return (
    <div className="bg-gray-50 px-4 py-6 min-h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 ml-12 sm:ml-12 lg:ml-0">
        User Management
      </h1>

      {/* Filters and Add */}
      <div className="flex gap-3 sm:gap-4 mb-6">
        <SearchInput
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <SelectDropdown
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          options={roleOptions}
          placeholder="Filter by Role"
          className="w-fit"
        />

        <AddButton onClick={() => setShowAddForm(true)} label="Add User" />
      </div>

      {/* User Grid */}
      {filteredUsers.length === 0 ? (
        <p className="text-gray-600 text-sm text-center">No matching users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              onEdit={setUserToEdit}
              onDelete={setUserToDelete}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {showAddForm && <AddUserForm isOpen={showAddForm} onClose={handleModalClose} />}
      {userToEdit && (
        <EditUserForm
          isOpen={true}
          userData={userToEdit}
          onClose={handleModalClose}
        />
      )}
      {userToDelete && (
        <DeleteConfirmationDialog
          isOpen={true}
          title="Delete User"
          message={`Are you sure you want to delete user "${userToDelete.name}"?`}
          onCancel={() => setUserToDelete(null)}
          onConfirm={handleDeleteUser}
        />
      )}
    </div>
  );
}
