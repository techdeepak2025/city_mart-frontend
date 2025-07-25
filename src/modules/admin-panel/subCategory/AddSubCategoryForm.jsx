import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import axiosInstance from "../../../utils/axiosInstance";
import { addSubCategorySchema } from "./validation";

import { TextInput, SelectDropdown, ImageUpload } from "../../../ui/input";
import { SaveButton, ResetButton } from "../../../ui/button";
import { Modal } from "../../../ui/layout";

export default function AddSubCategoryForm({ isOpen, onClose, onSuccess }) {
  const [categories, setCategories] = useState([]);
  const [formKey, setFormKey] = useState(0);

  const defaultValues = {
    name: "",
    category: "",
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
    resolver: zodResolver(addSubCategorySchema),
    defaultValues,
  });

  const name = watch("name");
  const category = watch("category");

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      if (Array.isArray(res.data)) {
        setCategories(
          res.data.map((cat) => ({
            label: cat.name,
            value: cat._id,
          }))
        );
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error("Failed to fetch categories", err);
      toast.error("Failed to fetch categories");
    }
  };

  // Reset form state on open
  useEffect(() => {
    if (isOpen) {
      reset(defaultValues);
      setFormKey((prev) => prev + 1); // Reset ImageUpload component
      fetchCategories();
    }
  }, [isOpen]);

  const resetForm = () => {
    reset(defaultValues);
    setFormKey((prev) => prev + 1);
  };

  const handleClose = () => {
    resetForm();
    onClose?.();
  };

 const onSubmit = async (data) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    const res = await axiosInstance.post("/sub-categories", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success("Subcategory created successfully");

    // ✅ Use returned populated data directly
    onSuccess?.(res.data);
    handleClose();
  } catch (err) {
    const msg =
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err.message ||
      "Failed to create subcategory";
    toast.error(msg);
  }
};


  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Subcategory">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-6 p-4"
      >
        <TextInput
          name="name"
          label="Subcategory Name"
          value={name}
          onChange={(e) =>
            setValue("name", e.target.value, { shouldValidate: true })
          }
          onBlur={() => trigger("name")}
          error={errors.name?.message}
          required
        />

        <SelectDropdown
          name="category"
          label="Parent Category"
          options={categories}
          value={category}
          onChange={(e) => {
            const value = e?.target?.value || e; // Handle event or direct value
            setValue("category", value, { shouldValidate: true });
            trigger("category");
          }}
          error={errors.category?.message}
          required
        />

        <ImageUpload
          key={formKey}
          name="image"
          label="Subcategory Image"
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

        <div className="flex justify-end gap-3 sm:col-span-2">
          <ResetButton onClick={resetForm} />
          <SaveButton disabled={isSubmitting} isLoading={isSubmitting} />
        </div>
      </form>
    </Modal>
  );
}
