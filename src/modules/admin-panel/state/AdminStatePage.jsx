import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import axiosInstance from "../../../utils/axiosInstance";
import AddStateForm from "./AddStateForm";
import EditStateForm from "./EditStateForm";
import { DeleteConfirmationDialog } from "../../../ui/dialog";
import { AddButton } from "../../../ui/button";
import StateCard from "./StateCard";
import SearchInput from "../../../ui/input/SearchInput";

export default function AdminStatePage() {
  const [states, setStates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [stateToEdit, setStateToEdit] = useState(null);
  const [stateToDelete, setStateToDelete] = useState(null);

  const fetchStates = async () => {
    try {
      const res = await axiosInstance.get("/states");
      setStates(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Failed to fetch states");
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const handleDeleteState = async () => {
    if (!stateToDelete?._id) return;
    try {
      await axiosInstance.delete(`/states/${stateToDelete._id}`);
      toast.success("State deleted successfully");
      setStateToDelete(null);
      fetchStates();
    } catch {
      toast.error("Failed to delete state");
    }
  };

  const handleModalClose = () => {
    setShowAddForm(false);
    setStateToEdit(null);
    fetchStates();
  };

  const filteredStates = states.filter((state) =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 pl-4 pt-4 min-h-screen overflow-hidden">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 ml-12 sm:ml-12 lg:ml-0">
        State Management
      </h1>

      {/* Search & Add */}
      <div className="flex gap-3 sm:gap-4 mb-4 pr-4">
        <SearchInput
          placeholder="Search states..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <AddButton onClick={() => setShowAddForm(true)} label="Add State" />
      </div>

      {/* Scrollable Card Grid Area */}
      <div className="h-[calc(100vh-128px)] overflow-y-auto pr-4">
        {filteredStates.length === 0 ? (
          <p className="text-gray-600 text-sm text-center">
            No matching states found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStates.map((state) => (
              <StateCard
                key={state._id}
                state={state}
                onEdit={setStateToEdit}
                onDelete={setStateToDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddForm && (
        <AddStateForm isOpen={showAddForm} onClose={handleModalClose} />
      )}
      {stateToEdit && (
        <EditStateForm
          isOpen={!!stateToEdit}
          stateData={stateToEdit}
          onClose={handleModalClose}
        />
      )}
      {stateToDelete && (
        <DeleteConfirmationDialog
          isOpen={!!stateToDelete}
          title="Delete State"
          message={`Are you sure you want to delete "${stateToDelete.name}"?`}
          onCancel={() => setStateToDelete(null)}
          onConfirm={handleDeleteState}
        />
      )}
    </div>
  );
}
