import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import axiosInstance from "../../../utils/axiosInstance";
import { editCategorySchema } from "./validation";

import { TextInput, ImageUpload } from "../../../ui/input";
import { SaveButton, CancelButton } from "../../../ui/button";
import { Modal } from "../../../ui/layout";

export default function EditCategoryForm({ isOpen, onClose, categoryData, onSuccess }) {
  const [defaultImages, setDefaultImages] = useState([]);

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      name: "",
      image: null,
    },
  });

  const name = watch("name");

  // 🛠 Safe reset without setting image (to avoid triggering upload)
  useEffect(() => {
    if (isOpen && categoryData) {
      reset({
        name: categoryData.name || "",
        image: null, // Don't pass actual URL, we'll show via defaultImages
      });

      if (categoryData.image?.url) {
        setDefaultImages([categoryData.image.url]);
      } else {
        setDefaultImages([]);
      }
    }
  }, [isOpen, categoryData, reset]);

  // 🧠 Only new file should trigger value change
  const handleImageChange = useCallback(
    (file) => {
      if (file instanceof File) {
        setValue("image", file, {
          shouldValidate: true,
          shouldDirty: true,
        });
        trigger("image");
      }
    },
    [setValue, trigger]
  );

  // 🔄 Form Submit
  const onSubmit = async (formValues) => {
  const formData = new FormData();
  formData.append("name", formValues.name);

  if (formValues.image instanceof File) {
    formData.append("image", formValues.image);
  }

  try {
    const res = await axiosInstance.put(`/categories/${categoryData._id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success("Category updated successfully");

    // 👇 call onSuccess with updated category
    onSuccess?.(res.data); 
    
    handleClose();
  } catch (err) {
    const msg = err?.response?.data?.error || "Failed to update category";
    toast.error(msg);
  }
};


  // 🔒 Close Handler
  const handleClose = () => {
    reset();
    onClose?.();
  };

  return (
    <Modal
      isOpen={isOpen}
      color="bg-green-600"
      onClose={handleClose}
      title="Edit Category"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 p-4"
      >
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
          label="Category Image"
          shape="square"
          required
          error={errors.image?.message}
          defaultImages={defaultImages}
          onChange={handleImageChange}
        />

        <div className="flex justify-end gap-3">
          <CancelButton onClick={handleClose} />
          <SaveButton
            type="submit"
            label="Update"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          />
        </div>
      </form>
    </Modal>
  );
}
