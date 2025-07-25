import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import axiosInstance from "../../../utils/axiosInstance";
import { addBrandSchema } from "./validation";

import { TextInput, ImageUpload } from "../../../ui/input";
import { SaveButton, ResetButton } from "../../../ui/button";
import { Modal } from "../../../ui/layout";

export default function AddBrandForm({ isOpen, onClose }) {
  const defaultValues = {
    name: "",
    logo: null,
  };

  const [logoKey, setLogoKey] = useState(Date.now());

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addBrandSchema),
    defaultValues,
  });

  const name = watch("name");

  useEffect(() => {
    if (isOpen) {
      reset(defaultValues);
      setLogoKey(Date.now());
    }
  }, [isOpen]);

  const resetForm = () => {
    reset(defaultValues);
    setLogoKey(Date.now());
  };

  const handleClose = () => {
    resetForm();
    onClose?.();
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.logo instanceof File) {
        formData.append("logo", data.logo);
      }

      await axiosInstance.post("/brands", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Brand created successfully");
      handleClose();
    } catch (err) {
      const msg = err?.response?.data?.error || "Failed to create brand";
      toast.error(msg);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Brand">
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
          required
          error={errors.logo?.message}
          onChange={(file) => {
            setValue("logo", file, {
              shouldValidate: true,
              shouldDirty: true,
            });
            trigger("logo");
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