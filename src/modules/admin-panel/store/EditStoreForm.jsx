import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { editStoreSchema } from "./validation";
import axiosInstance from "../../../utils/axiosInstance";
import {
  TextInput,
  SelectDropdown,
  TextArea,
  NumberInput,
} from "../../../ui/input";
import { Modal } from "../../../ui/layout";
import { SaveButton, CancelButton } from "../../../ui/button";

export default function EditStoreForm({ isOpen, onClose, defaultValues }) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editStoreSchema),
    defaultValues,
  });

  const selectedState = watch("state");
  const selectedCity = watch("city");
  const pincode = watch("pincode");

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await axiosInstance.get("/states");
        setStates(res.data || []);
      } catch {
        toast.error("Failed to load states");
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    if (!selectedState) {
      setCities([]);
      return;
    }

    const fetchCities = async () => {
      try {
        const res = await axiosInstance.get(`/cities?state=${selectedState}`);
        setCities(res.data || []);
      } catch {
        toast.error("Failed to load cities");
      }
    };

    fetchCities();
  }, [selectedState]);

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleClose = () => {
    reset(defaultValues);
    onClose?.();
  };

  const onSubmit = async (data) => {
    try {
      await axiosInstance.put(`/stores/${defaultValues._id}`, data);
      toast.success("Store updated successfully");
      handleClose();
    } catch {
      toast.error("Failed to update store");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      color="bg-green-600"
      onClose={handleClose}
      title="Edit Store"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-6"
      >
        <TextInput
          label="Store Number"
          {...register("storeNumber")}
          onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
          error={errors.storeNumber?.message}
        />

        <NumberInput
          label="Pincode"
          placeholder="Enter 6-digit pincode"
          value={pincode}
          onChange={(e) => setValue("pincode", e.target.value)}
          error={errors.pincode?.message}
          required
          maxLength={6}
        />

        <SelectDropdown
          label="State"
          value={selectedState}
          onChange={(e) => {
            setValue("state", e.target.value);
            setValue("city", "");
          }}
          options={states.map((s) => ({ label: s.name, value: s._id }))}
          error={errors.state?.message}
        />

        <SelectDropdown
          label="City"
          value={selectedCity}
          disabled={!selectedState}
          onChange={(e) => setValue("city", e.target.value)}
          options={cities.map((c) => ({ label: c.name, value: c._id }))}
          placeholder={!selectedState ? "Select state first" : "Select city"}
          error={errors.city?.message}
        />

        <div className="sm:col-span-2">
          <TextArea
            label="Address"
            {...register("address")}
            error={errors.address?.message}
            rows={3}
          />
        </div>

        <div className="sm:col-span-2 flex justify-end gap-3">
          <CancelButton onClick={handleClose} />
          <SaveButton disabled={isSubmitting} isLoading={isSubmitting} />
        </div>
      </form>
    </Modal>
  );
}
