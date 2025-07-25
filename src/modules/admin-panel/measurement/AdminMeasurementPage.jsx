import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import axiosInstance from "../../../utils/axiosInstance";
import AddMeasurementForm from "./AddMeasurementForm";
import EditMeasurementForm from "./EditMeasurementForm";
import MeasurementCard from "./MeasurementCard";

import { AddButton } from "../../../ui/button";
import { DeleteConfirmationDialog } from "../../../ui/dialog";

export default function AdminMeasurementPage() {
  const [measurements, setMeasurements] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMeasurement, setEditingMeasurement] = useState(null);
  const [measurementToDelete, setMeasurementToDelete] = useState(null);

  const fetchMeasurements = async () => {
    try {
      const res = await axiosInstance.get("/measurements");
      setMeasurements(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch measurements");
    }
  };

  useEffect(() => {
    fetchMeasurements();
  }, []);

  const handleAdd = async (data) => {
    try {
      await axiosInstance.post("/measurements", data);
      toast.success("Measurement added");
      fetchMeasurements();
      setShowAddForm(false);
    } catch (err) {
      toast.error("Failed to add measurement");
    }
  };

  const handleEdit = async (data) => {
    try {
      await axiosInstance.put(`/measurements/${data._id}`, data);
      toast.success("Measurement updated");
      fetchMeasurements();
      setEditingMeasurement(null);
    } catch (err) {
      toast.error("Failed to update measurement");
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/measurements/${measurementToDelete._id}`);
      toast.success("Measurement deleted");
      fetchMeasurements();
      setMeasurementToDelete(null);
    } catch (err) {
      toast.error("Failed to delete measurement");
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Manage Measurements</h1>
        <AddButton onClick={() => setShowAddForm(true)} label="Add Measurement" />
      </div>

      {measurements.length === 0 ? (
        <p className="text-gray-600 text-sm">No measurements found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {measurements.map((measurement) => (
            <MeasurementCard
              key={measurement._id}
              measurement={measurement}
              onEdit={setEditingMeasurement}
              onDelete={setMeasurementToDelete}
            />
          ))}
        </div>
      )}

      {showAddForm && (
        <AddMeasurementForm
          isOpen={showAddForm}
          onClose={() => setShowAddForm(false)}
          onSave={handleAdd}
        />
      )}

      {editingMeasurement && (
        <EditMeasurementForm
          isOpen={!!editingMeasurement}
          onClose={() => setEditingMeasurement(null)}
          onSave={handleEdit}
          initialData={editingMeasurement}
        />
      )}

      {measurementToDelete && (
        <DeleteConfirmationDialog
          isOpen={!!measurementToDelete}
          title="Delete Measurement"
          message={`Are you sure you want to delete "${measurementToDelete.name}"?`}
          onCancel={() => setMeasurementToDelete(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
