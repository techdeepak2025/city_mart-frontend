import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { addStoreSchema } from "./validation";
import axiosInstance from "../../../utils/axiosInstance";
import { SaveButton, ResetButton } from "../../../ui/button";
import {
  TextInput,
  SelectDropdown,
  TextArea,
  NumberInput,
} from "../../../ui/input";
import { Modal } from "../../../ui/layout";

export default function AddStoreForm({ isOpen, onClose }) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const defaultValues = {
    storeNumber: "",
    state: "",
    city: "",
    address: "",
    pincode: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addStoreSchema),
    defaultValues,
  });

  const storeNumber = watch("storeNumber");
  const pincode = watch("pincode");
  const selectedState = watch("state");
  const selectedCity = watch("city");
  const address = watch("address");

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await axiosInstance.get("/states");
        setStates(Array.isArray(res.data) ? res.data : []);
      } catch {
        toast.error("Failed to load states");
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    if (!selectedState) {
      setCities([]);
      setValue("city", "");
      return;
    }

    const fetchCities = async () => {
      try {
        const res = await axiosInstance.get(`/cities?state=${selectedState}`);
        setCities(Array.isArray(res.data) ? res.data : []);
        setValue("city", "");
      } catch {
        toast.error("Failed to load cities");
      }
    };

    fetchCities();
  }, [selectedState, setValue]);

  const handleClose = () => {
    reset(defaultValues);
    setCities([]);
    onClose?.();
  };

  const handleReset = () => {
    reset(defaultValues);
    setCities([]);
  };

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post("/stores", data);
      toast.success("Store created successfully");
      handleClose();
    } catch (err) {
      const msg = err?.response?.data?.error || "Failed to create store";
      toast.error(msg);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Store">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-6 px-1"
      >
        <TextInput
          label="Store Number"
          value={storeNumber}
          onChange={(e) =>
            setValue("storeNumber", e.target.value.toUpperCase())
          }
          error={errors.storeNumber?.message}
          required
        />

        <NumberInput
          label="Pincode"
          name="pincode"
          placeholder="Enter 6-digit pincode"
          value={pincode}
          onChange={(val) => setValue("pincode", val)}
          onBlur={() => trigger("pincode")}
          error={errors.pincode?.message}
          required
          maxLength={6}
        />

        <SelectDropdown
          required
          label="State"
          placeholder="Select state"
          options={states.map((s) => ({ label: s.name, value: s._id }))}
          value={selectedState}
          onChange={(e) => {
            setValue("state", e.target.value);
            trigger("state");
          }}
          error={errors.state?.message}
        />

        <SelectDropdown
          required
          label="City"
          placeholder={!selectedState ? "Select state first" : "Select city"}
          options={cities.map((c) => ({ label: c.name, value: c._id }))}
          disabled={!selectedState}
          value={selectedCity}
          onChange={(e) => {
            setValue("city", e.target.value);
            trigger("city");
          }}
          error={errors.city?.message}
        />

        <div className="sm:col-span-2">
          <TextArea
            label="Address"
            name="address"
            value={address}
            onChange={(e) => setValue("address", e.target.value)}
            onBlur={() => trigger("address")}
            rows={3}
            error={errors.address?.message}
            required
          />
        </div>

        <div className="sm:col-span-2 flex justify-end gap-3">
          <ResetButton onClick={handleReset} />
          <SaveButton disabled={isSubmitting} isLoading={isSubmitting} />
        </div>
      </form>
    </Modal>
  );
}
