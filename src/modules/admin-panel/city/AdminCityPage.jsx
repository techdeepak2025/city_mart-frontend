import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import axiosInstance from "../../../utils/axiosInstance";
import AddCityForm from "./AddCityForm";
import EditCityForm from "./EditCityForm";
import CityCard from "./CityCard";
import { DeleteConfirmationDialog } from "../../../ui/dialog";
import { AddButton } from "../../../ui/button";
import { SearchInput, SelectDropdown } from "../../../ui/input";

export default function AdminCityPage() {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [cityToEdit, setCityToEdit] = useState(null);
  const [cityToDelete, setCityToDelete] = useState(null);
  const [selectedState, setSelectedState] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchCities = async () => {
    try {
      const response = await axiosInstance.get("/cities");
      setCities(Array.isArray(response.data) ? response.data : []);
    } catch {
      toast.error("Failed to fetch cities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleDeleteCity = async () => {
    if (!cityToDelete?._id) return;
    try {
      await axiosInstance.delete(`/cities/${cityToDelete._id}`);
      toast.success("City deleted successfully");
      setCityToDelete(null);
      fetchCities();
    } catch {
      toast.error("Failed to delete city");
    }
  };

  const handleModalClose = () => {
    setShowAddForm(false);
    setCityToEdit(null);
    fetchCities();
  };

  const stateCounts = cities.reduce((acc, city) => {
    const stateName = city.state?.name || "Unknown";
    acc[stateName] = (acc[stateName] || 0) + 1;
    return acc;
  }, {});

  const stateOptions = [
    { label: `All (${cities.length})`, value: "All" },
    ...Object.entries(stateCounts).map(([name, count]) => ({
      label: `${name} (${count})`,
      value: name,
    })),
  ];

  const filteredCities = cities.filter((city) => {
    const matchesState =
      selectedState === "All" || city.state?.name === selectedState;
    const matchesSearch = city.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesState && matchesSearch;
  });

  return (
    <div className="bg-gray-50 pl-4 pt-4 min-h-screen overflow-hidden">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 ml-12 sm:ml-12 lg:ml-0">
        City Management
      </h1>

      {/* Filters and Add */}
      <div className="flex gap-3 sm:gap-4 mb-4 pr-4">
        <SearchInput
          placeholder="Search cities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SelectDropdown
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          options={stateOptions}
          placeholder="Filter by State"
          className="w-fit"
        />
        <AddButton onClick={() => setShowAddForm(true)} label="Add City" />
      </div>

      {/* Card Grid Scroll Area */}
      <div className="h-[calc(100vh-128px)] overflow-y-auto pr-4">
        {loading ? (
          <p className="text-gray-500 text-center">Loading cities...</p>
        ) : filteredCities.length === 0 ? (
          <p className="text-gray-600 text-sm text-center">
            No matching cities found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCities.map((city) => (
              <CityCard
                key={city._id || city.name}
                city={city}
                onEdit={setCityToEdit}
                onDelete={setCityToDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddForm && (
        <AddCityForm isOpen={showAddForm} onClose={handleModalClose} />
      )}
      {cityToEdit && (
        <EditCityForm
          isOpen={!!cityToEdit}
          cityData={cityToEdit}
          onClose={handleModalClose}
        />
      )}
      {cityToDelete && (
        <DeleteConfirmationDialog
          isOpen={!!cityToDelete}
          title="Delete City"
          message={`Are you sure you want to delete "${cityToDelete.name}"?`}
          onCancel={() => setCityToDelete(null)}
          onConfirm={handleDeleteCity}
        />
      )}
    </div>
  );
}
