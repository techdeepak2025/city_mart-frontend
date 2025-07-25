import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { editCitySchema } from "./validation";
import axiosInstance from "../../../utils/axiosInstance";

import { Modal } from "../../../ui/layout";
import { TextInput, SelectDropdown } from "../../../ui/input";
import { CancelButton, SaveButton } from "../../../ui/button";

export default function EditCityForm({ isOpen, onClose, cityData }) {
  const [states, setStates] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editCitySchema),
    defaultValues: {
      name: "",
      state: "",
    },
  });

  const selectedState = watch("state");

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axiosInstance.get("/states");
        setStates(Array.isArray(response.data) ? response.data : []);
      } catch {
        toast.error("Failed to load states");
      }
    };

    if (isOpen) fetchStates();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && cityData) {
      reset({
        name: cityData.name || "",
        state: cityData.state?._id || "",
      });
    }
  }, [isOpen, cityData, reset]);

  const handleClose = () => {
    reset({ name: "", state: "" });
    onClose();
  };

  const onSubmit = async (formValues) => {
    try {
      await axiosInstance.put(`/cities/${cityData._id}`, formValues);
      toast.success("City updated successfully");
      handleClose();
    } catch (err) {
      const msg = err?.response?.data?.error || "Failed to update city";
      toast.error(msg);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Edit City"
      color="bg-green-600"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        {/* City Name Input */}
        <TextInput
          label="City Name"
          placeholder="Enter city name"
          required
          {...register("name")}
          error={errors.name?.message}
        />

        {/* State Dropdown */}
        <SelectDropdown
          label="Select State"
          required
          value={selectedState}
          onChange={(e) => setValue("state", e.target.value)}
          options={[
            { label: "Select state", value: "" },
            ...states.map((state) => ({
              label: state.name,
              value: state._id,
            })),
          ]}
          error={errors.state?.message}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <CancelButton onClick={handleClose} />
          <SaveButton
            label="Update"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          />
        </div>
      </form>
    </Modal>
  );
}
