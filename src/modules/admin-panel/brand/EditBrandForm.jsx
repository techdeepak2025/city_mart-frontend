import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import axiosInstance, { BASE_URL } from "../../../utils/axiosInstance";
import { editBrandSchema } from "./validation";

import { TextInput, ImageUpload } from "../../../ui/input";
import { SaveButton } from "../../../ui/button";
import { Modal } from "../../../ui/layout";

export default function EditBrandForm({ isOpen, onClose, brandData }) {
  const [logoKey, setLogoKey] = useState(Date.now());
  const fullLogoUrl = brandData?.logo?.url || null;

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editBrandSchema),
    defaultValues: {
      name: "",
      logo: null,
    },
  });

  const name = watch("name");

  useEffect(() => {
    if (brandData) {
      reset({
        name: brandData.name || "",
        logo: null,
      });
      setLogoKey(Date.now());
    }
  }, [brandData, reset]);

  const handleClose = () => {
    reset();
    onClose?.();
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.logo instanceof File) {
        formData.append("logo", data.logo);
      }

      await axiosInstance.put(`/brands/${brandData._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Brand updated successfully");
      handleClose();
    } catch {
      toast.error("Failed to update brand");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      color="bg-green-600"
      onClose={handleClose}
      title="Edit Brand"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 p-4"
      >
        <TextInput
          label="Brand Name"
          value={name}
          onChange={(e) =>
            setValue("name", e.target.value, { shouldValidate: true })
          }
          onBlur={() => trigger("name")}
          error={errors.name?.message}
          required
        />

        <ImageUpload
          key={logoKey}
          label="Brand Logo"
          shape="square"
          error={errors.logo?.message}
          onChange={(file) => {
            setValue("logo", file, {
              shouldValidate: true,
              shouldDirty: true,
            });
            trigger("logo");
          }}
          defaultImages={fullLogoUrl ? [fullLogoUrl] : []}
        />

        <div className="flex justify-end gap-3">
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
