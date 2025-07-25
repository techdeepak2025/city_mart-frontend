import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import axiosInstance from "../../../utils/axiosInstance";
import { addCategorySchema } from "./validation";

import { TextInput, ImageUpload } from "../../../ui/input";
import { SaveButton, ResetButton } from "../../../ui/button";
import { Modal } from "../../../ui/layout";

export default function AddCategoryForm({ isOpen, onClose, onSuccess }) {
  const [formKey, setFormKey] = useState(0);

  const defaultValues = {
    name: "",
    image: null,
  };

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addCategorySchema),
    defaultValues,
  });

  const name = watch("name");

  useEffect(() => {
    if (isOpen) {
      reset(defaultValues);
      setFormKey(prev => prev + 1); 
    }
  }, [isOpen]);

  const resetForm = () => {
    reset(defaultValues);
    setFormKey(prev => prev + 1);
  };

  const handleClose = () => {
    resetForm();
    onClose?.();
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      const { data: newCategory } = await axiosInstance.post("/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Category created successfully");
      handleClose();
      onSuccess?.(newCategory);
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to create category");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Category">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 p-4">
        <TextInput
          label="Category Name"
          value={name}
          onChange={(e) =>
            setValue("name", e.target.value, { shouldValidate: true })
          }
          onBlur={() => trigger("name")}
          error={errors.name?.message}
          required
        />

        <ImageUpload
          key={formKey}
          label="Category Image"
          shape="square"
          required
          error={errors.image?.message}
          onChange={(file) => {
            setValue("image", file, {
              shouldValidate: true,
              shouldDirty: true,
            });
            trigger("image");
          }}
        />

        <div className="flex justify-end gap-3">
          <ResetButton onClick={resetForm} />
          <SaveButton disabled={isSubmitting} isLoading={isSubmitting} />
        </div>
      </form>
    </Modal>
  );
}
