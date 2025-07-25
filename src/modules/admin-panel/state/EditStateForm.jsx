import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { editStateSchema } from "./validation";
import axiosInstance from "../../../utils/axiosInstance";

import { Modal } from "../../../ui/layout";
import { TextInput } from "../../../ui/input";
import { CancelButton, SaveButton } from "../../../ui/button";

export default function EditStateForm({ isOpen, onClose, stateData }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editStateSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (stateData) {
      setValue("name", stateData.name || "");
    }
  }, [stateData, setValue]);

  const handleClose = () => {
    reset({ name: stateData?.name || "" });
    onClose();
  };

  const onSubmit = async (formValues) => {
    try {
      await axiosInstance.put(`/states/${stateData._id}`, formValues);
      toast.success("State updated successfully");
      handleClose();
    } catch (err) {
      const msg = err?.response?.data?.error || "Failed to update state";
      toast.error(msg);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Edit State"
      color="bg-green-600"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <TextInput
          label="State Name"
          placeholder="Enter state name"
          error={errors.name?.message}
          {...register("name")}
        />

        <div className="flex justify-end gap-3">
          <CancelButton onClick={handleClose} />
          <SaveButton
            disabled={isSubmitting}
            isLoading={isSubmitting}
            label="Update"
          />
        </div>
      </form>
    </Modal>
  );
}
