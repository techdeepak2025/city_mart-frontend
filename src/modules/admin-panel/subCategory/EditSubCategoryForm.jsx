import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import axiosInstance, { BASE_URL } from "../../../utils/axiosInstance";
import { editSubCategorySchema } from "./validation";

import { TextInput, SelectDropdown, ImageUpload } from "../../../ui/input";
import { SaveButton, CancelButton } from "../../../ui/button";
import { Modal } from "../../../ui/layout";

export default function EditSubCategoryForm({ isOpen, onClose, subCategoryData, onSuccess }) {
  const [categories, setCategories] = useState([]);
  const [imageKey, setImageKey] = useState(Date.now());

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editSubCategorySchema),
    defaultValues: {
      name: "",
      category: "",
      image: null,
    },
  });

  const name = watch("name");
  const category = watch("category");

  const fullImageUrl = typeof subCategoryData?.image === "string"
    ? subCategoryData.image.startsWith("http")
      ? subCategoryData.image
      : `${BASE_URL}/uploads/sub-categories/${subCategoryData.image}`
    : typeof subCategoryData?.image?.url === "string"
    ? subCategoryData.image.url
    : null;

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      if (Array.isArray(res.data)) {
        const mapped = res.data.map((cat) => ({
          label: cat.name,
          value: cat._id,
        }));
        setCategories(mapped);
      }
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      if (subCategoryData) {
        reset({
          name: subCategoryData.name || "",
          category: subCategoryData.category?._id || "",
          image: null,
        });
        setImageKey(Date.now());
      }
    }
  }, [isOpen, subCategoryData]);

  const onSubmit = async (formValues) => {
    try {
      const formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("category", formValues.category);

      if (formValues.image instanceof File || formValues.image instanceof Blob) {
        formData.append("image", formValues.image);
      }

      const { data: updatedSubCategory } = await axiosInstance.put(
        `/sub-categories/${subCategoryData._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Subcategory updated successfully");
      onSuccess?.(updatedSubCategory); // ✅ send updated data back to parent
      onClose?.(); // ✅ close modal
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err.message ||
        "Failed to update subcategory";
      toast.error(msg);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      color="bg-green-600"
      title="Edit Subcategory"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-6 px-1">
        <TextInput
          label="Subcategory Name"
          value={name}
          onChange={(e) => {
            setValue("name", e.target.value, { shouldValidate: true });
            trigger("name");
          }}
          onBlur={() => trigger("name")}
          error={errors.name?.message}
          required
        />

        <SelectDropdown
          label="Parent Category"
          options={categories}
          value={category}
          onChange={(e) => {
            const value = e?.target?.value || e;
            setValue("category", value, { shouldValidate: true });
            trigger("category");
          }}
          error={errors.category?.message}
          required
        />

        <ImageUpload
          key={imageKey}
          label="Subcategory Image"
          shape="square"
          multiple={false}
          defaultImages={fullImageUrl ? [fullImageUrl] : []}
          onChange={(file) => {
            setValue("image", file, {
              shouldValidate: true,
              shouldDirty: true,
            });
            trigger("image");
          }}
          error={errors.image?.message}
        />

        <div className="flex justify-end gap-3 sm:col-span-2 mt-2">
          <CancelButton onClick={onClose} />
          <SaveButton label="Update" disabled={isSubmitting} isLoading={isSubmitting} />
        </div>
      </form>
    </Modal>
  );
}
