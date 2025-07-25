import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { addRoleSchema } from "./validation";
import axiosInstance from "../../../utils/axiosInstance";

import { Modal } from "../../../ui/layout";
import { TextInput } from "../../../ui/input";
import { ResetButton, SaveButton } from "../../../ui/button";

export default function AddRoleForm({ isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addRoleSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose?.();
  };

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post("/roles", data);
      toast.success("Role created successfully");
      handleClose();
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Failed to create role";
      toast.error(msg);
    }
  };

  const { name, onChange, onBlur, ref } = register("name");

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Role"
      color="bg-blue-600"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <TextInput
          label="Role Name"
          placeholder="Enter role name"
          required
          name="name"
          error={errors.name?.message}
          onChange={onChange}
          onBlur={onBlur}
          inputRef={ref}
        />

        <div className="flex justify-end gap-3">
          <ResetButton onClick={() => reset()} />
          <SaveButton disabled={isSubmitting} isLoading={isSubmitting} />
        </div>
      </form>
    </Modal>
  );
}
