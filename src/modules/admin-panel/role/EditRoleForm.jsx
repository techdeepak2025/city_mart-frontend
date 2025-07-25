import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { editRoleSchema } from "./validation";
import axiosInstance from "../../../utils/axiosInstance";

import { Modal } from "../../../ui/layout";
import { TextInput } from "../../../ui/input";
import { CancelButton, SaveButton } from "../../../ui/button";

export default function EditRoleForm({ isOpen, onClose, defaultValues }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editRoleSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name || "",
      });
    }
  }, [defaultValues, reset]);

  const handleClose = () => {
    reset({ name: defaultValues?.name || "" });
    onClose?.();
  };

  const onSubmit = async (formData) => {
    try {
      await axiosInstance.put(`/roles/${defaultValues._id}`, formData);
      toast.success("Role updated successfully");
      handleClose();
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Failed to update role";
      toast.error(msg);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Edit Role"
      color="bg-green-600"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <TextInput
          label="Role Name"
          placeholder="Enter role name"
          {...register("name")}
          error={errors.name?.message}
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
