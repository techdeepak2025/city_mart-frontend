import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { addStateSchema } from "./validation";
import axiosInstance from "../../../utils/axiosInstance";

import { Modal } from "../../../ui/layout";
import { TextInput } from "../../../ui/input";
import { ResetButton, SaveButton } from "../../../ui/button";

export default function AddStateForm({ isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addStateSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (formValues) => {
    try {
      await axiosInstance.post("/states", formValues);
      toast.success("State added successfully");
      handleClose();
    } catch (err) {
      const msg = err?.response?.data?.error || "Failed to add state";
      toast.error(msg);
    }
  };

  const { name, onChange, onBlur, ref } = register("name");

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New State"
      color="bg-blue-600"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <TextInput
          label="State Name"
          placeholder="Enter state name"
          required
          name="name"
          error={errors.name?.message}
          onChange={onChange}
          onBlur={onBlur}
          inputRef={ref}
        />

        <div className="flex justify-end gap-3">
          <ResetButton onClick={() => reset({ name: "" })} />
          <SaveButton disabled={isSubmitting} isLoading={isSubmitting} />
        </div>
      </form>
    </Modal>
  );
}
