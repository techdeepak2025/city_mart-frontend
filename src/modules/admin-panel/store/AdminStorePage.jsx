import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import AddStoreForm from "./AddStoreForm";
import EditStoreForm from "./EditStoreForm";
import StoreCard from "./StoreCard";
import { DeleteConfirmationDialog } from "../../../ui/dialog";
import { AddButton } from "../../../ui/button";
import { SearchInput, SelectDropdown } from "../../../ui/input";
import axiosInstance from "../../../utils/axiosInstance";

export default function AdminStorePage() {
  const [stores, setStores] = useState([]);
  const [statesMap, setStatesMap] = useState({});
  const [citiesMap, setCitiesMap] = useState({});
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [storeToEdit, setStoreToEdit] = useState(null);
  const [storeToDelete, setStoreToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");

  const fetchStores = async () => {
    try {
      const res = await axiosInstance.get("/stores");
      setStores(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Failed to fetch stores");
    }
  };

  const fetchStateAndCityNames = async () => {
    try {
      const [stateRes, cityRes] = await Promise.all([
        axiosInstance.get("/states"),
        axiosInstance.get("/cities"),
      ]);

      const stateMap = {};
      for (const s of stateRes.data) stateMap[s._id] = s.name;
      setStatesMap(stateMap);

      const cityMap = {};
      for (const c of cityRes.data) cityMap[c._id] = c.name;
      setCitiesMap(cityMap);
    } catch {
      toast.error("Failed to fetch state/city info");
    }
  };

  useEffect(() => {
    fetchStores();
    fetchStateAndCityNames();
  }, []);

  const handleDeleteStore = async () => {
    if (!storeToDelete?._id) return;
    try {
      await axiosInstance.delete(`/stores/${storeToDelete._id}`);
      toast.success("Store deleted successfully");
      setStoreToDelete(null);
      fetchStores();
    } catch {
      toast.error("Failed to delete store");
    }
  };

  const handleModalClose = () => {
    setIsAddOpen(false);
    setStoreToEdit(null);
    fetchStores();
  };

  // Generate state and city counts
  const stateCounts = stores.reduce((acc, store) => {
    const stateName =
      (store.state && statesMap[store.state]) ||
      (typeof store.state === "object" && store.state?.name) ||
      "Unknown";
    acc[stateName] = (acc[stateName] || 0) + 1;
    return acc;
  }, {});

  const cityCounts = stores.reduce((acc, store) => {
    const cityName =
      (store.city && citiesMap[store.city]) ||
      (typeof store.city === "object" && store.city?.name) ||
      "Unknown";
    acc[cityName] = (acc[cityName] || 0) + 1;
    return acc;
  }, {});

  const stateOptions = [
    { label: `All (${stores.length})`, value: "All" },
    ...Object.entries(stateCounts).map(([name, count]) => ({
      label: `${name} (${count})`,
      value: name,
    })),
  ];

  const cityOptions = [
    { label: `All (${stores.length})`, value: "All" },
    ...Object.entries(cityCounts).map(([name, count]) => ({
      label: `${name} (${count})`,
      value: name,
    })),
  ];

  const filteredStores = stores.filter((store) => {
    const stateName =
      (store.state && statesMap[store.state]) ||
      (typeof store.state === "object" && store.state?.name) ||
      "Unknown";

    const cityName =
      (store.city && citiesMap[store.city]) ||
      (typeof store.city === "object" && store.city?.name) ||
      "Unknown";

    const matchesState = selectedState === "All" || stateName === selectedState;
    const matchesCity = selectedCity === "All" || cityName === selectedCity;

    const matchesSearch =
      store.storeNumber?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cityName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesState && matchesCity && matchesSearch;
  });

  return (
    <div className="bg-gray-50 px-4 py-6 min-h-screen overflow-hidden">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 ml-12 sm:ml-12 lg:ml-0">
        Store Management
      </h1>

      {/* Search + Filters + Add */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search stores..."
        />
        <SelectDropdown
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          options={stateOptions}
          placeholder="Filter by State"
        />
        <SelectDropdown
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          options={cityOptions}
          placeholder="Filter by City"
        />
        <AddButton onClick={() => setIsAddOpen(true)} label="Add Store" />
      </div>

      {/* Scrollable Store Card Area */}
      <div className="h-[calc(100vh-210px)] overflow-y-auto pr-1">
        {filteredStores.length === 0 ? (
          <p className="text-gray-600 text-sm text-center">No matching stores found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((store) => {
              const stateName =
                (store.state && statesMap[store.state]) ||
                (typeof store.state === "object" && store.state?.name) ||
                "Unknown";
              const cityName =
                (store.city && citiesMap[store.city]) ||
                (typeof store.city === "object" && store.city?.name) ||
                "Unknown";

              return (
                <StoreCard
                  key={store._id}
                  store={store}
                  stateName={stateName}
                  cityName={cityName}
                  onEdit={() => setStoreToEdit(store)}
                  onDelete={() => setStoreToDelete(store)}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Modals */}
      {isAddOpen && (
        <AddStoreForm isOpen={isAddOpen} onClose={handleModalClose} />
      )}
      {storeToEdit && (
        <EditStoreForm
          isOpen={!!storeToEdit}
          defaultValues={storeToEdit}
          onClose={handleModalClose}
        />
      )}
      {storeToDelete && (
        <DeleteConfirmationDialog
          isOpen={!!storeToDelete}
          title="Delete Store"
          message={`Are you sure you want to delete store "${storeToDelete.storeNumber}"?`}
          onCancel={() => setStoreToDelete(null)}
          onConfirm={handleDeleteStore}
        />
      )}
    </div>
  );
}