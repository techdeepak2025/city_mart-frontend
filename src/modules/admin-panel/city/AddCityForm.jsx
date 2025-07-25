import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { addCitySchema } from "./validation";
import axiosInstance from "../../../utils/axiosInstance";

import { Modal } from "../../../ui/layout";
import { TextInput, SelectDropdown } from "../../../ui/input";
import { ResetButton, SaveButton } from "../../../ui/button";

export default function AddCityForm({ isOpen, onClose }) {
  const [states, setStates] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addCitySchema),
    defaultValues: {
      name: "",
      state: "",
    },
  });

  const selectedState = useWatch({ control, name: "state" });

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await axiosInstance.get("/states");
        setStates(Array.isArray(res.data) ? res.data : []);
      } catch {
        toast.error("Failed to load states");
      }
    };

    if (isOpen) fetchStates();
  }, [isOpen]);

  const handleClose = () => {
    reset({ name: "", state: "" });
    onClose();
  };

  const onSubmit = async (formValues) => {
    try {
      await axiosInstance.post("/cities", formValues);
      toast.success("City added successfully");
      handleClose();
    } catch (err) {
      const msg = err?.response?.data?.error || "Failed to add city";
      toast.error(msg);
    }
  };

  const { name, onChange, onBlur, ref } = register("name");

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New City"
      color="bg-blue-600"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <TextInput
          label="City Name"
          placeholder="Enter city name"
          required
          name="name"
          error={errors.name?.message}
          onChange={onChange}
          onBlur={onBlur}
          inputRef={ref}
        />

        <SelectDropdown
          label="Select State"
          required
          value={selectedState} // ✅ bind to form state
          onChange={(e) => setValue("state", e.target.value)}
          options={states.map((state) => ({
            label: state.name,
            value: state._id,
          }))}
          error={errors.state?.message}
        />

        <div className="flex justify-end gap-3">
          <ResetButton onClick={() => reset({ name: "", state: "" })} />
          <SaveButton disabled={isSubmitting} isLoading={isSubmitting} />
        </div>
      </form>
    </Modal>
  );
}
