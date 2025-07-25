import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { editUserSchema } from "./validation";
import axiosInstance, { BASE_URL } from "../../../utils/axiosInstance";
import {
  TextInput,
  NumberInput,
  PasswordInput,
  SelectDropdown,
  ImageUpload,
} from "../../../ui/input";
import { Modal } from "../../../ui/layout";
import { SaveButton, CancelButton } from "../../../ui/button";

export default function EditUserForm({ isOpen, onClose, userData }) {
  const [imageKey, setImageKey] = useState(Date.now());
  const [roles, setRoles] = useState([]);
  const [stores, setStores] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: "",
      mobile: "",
      role: "",
      password: "",
      avatar: null,
      accessScope: {
        type: "global",
        refId: "",
      },
    },
  });

  const accessType = watch("accessScope.type");
  const accessRefId = watch("accessScope.refId");

  const fullImageUrl = userData?.avatar?.url || null;

  useEffect(() => {
    const fetchAll = async () => {
      setLoadingRoles(true);
      try {
        const [rolesRes, storesRes, citiesRes] = await Promise.all([
          axiosInstance.get("/roles"),
          axiosInstance.get("/stores"),
          axiosInstance.get("/cities"),
        ]);

        setRoles(
          rolesRes.data.map((role) => ({
            label: role.name,
            value: role._id,
          }))
        );

        setStores(
          storesRes.data.map((store) => ({
            label: store.storeNumber,
            value: store._id,
          }))
        );

        setCities(
          citiesRes.data.map((city) => ({
            label: city.name,
            value: city._id,
          }))
        );
      } catch {
        toast.error("Failed to load roles, stores, or cities");
      } finally {
        setLoadingRoles(false);
      }
    };

    if (isOpen) fetchAll();
  }, [isOpen]);

  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name || "",
        mobile: userData.mobile || "",
        role: userData.role?._id || userData.role || "",
        password: "",
        avatar: null,
        accessScope: {
          type: userData.accessScope?.type?.toLowerCase() || "global",
          refId:
            typeof userData.accessScope?.refId === "object"
              ? userData.accessScope?.refId?._id
              : userData.accessScope?.refId || "",
        },
      });
      setImageKey(Date.now());
    }
  }, [userData, reset]);

  const handleClose = () => {
    reset();
    onClose?.();
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("mobile", data.mobile);
      formData.append("role", data.role);
      if (data.password) formData.append("password", data.password);
      if (data.avatar instanceof File) {
        formData.append("avatar", data.avatar);
      }

      formData.append("accessScope.type", data.accessScope.type);
      if (data.accessScope.refId) {
        formData.append("accessScope.refId", data.accessScope.refId);
      }

      await axiosInstance.put(`/users/${userData._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("User updated successfully");
      handleClose();
    } catch {
      toast.error("Failed to update user");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      color="bg-green-600"
      onClose={handleClose}
      title="Edit User"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-6"
      >
        <TextInput
          label="Name"
          {...register("name")}
          error={errors.name?.message}
        />

        <NumberInput
          label="Mobile"
          maxLength={10}
          placeholder="Enter 10-digit mobile"
          value={watch("mobile")}
          onChange={(e) => setValue("mobile", e.target.value)}
          error={errors.mobile?.message}
        />

        <SelectDropdown
          label="Role"
          value={watch("role")}
          onChange={(e) =>
            setValue("role", e.target.value, { shouldValidate: true })
          }
          options={roles}
          error={errors.role?.message}
          loading={loadingRoles}
        />

        <PasswordInput
          label="Reset Password"
          {...register("password")}
          error={errors.password?.message}
        />

        <SelectDropdown
          label="Access Type"
          value={accessType}
          onChange={(e) => {
            const newType = e.target.value;
            setValue("accessScope.type", newType, { shouldValidate: true });
            setValue("accessScope.refId", "", { shouldValidate: true });
            trigger(["accessScope.type", "accessScope.refId"]);
          }}
          options={[
            { label: "Global", value: "global" },
            { label: "Store", value: "store" },
            { label: "City", value: "city" },
          ]}
          error={errors.accessScope?.type?.message}
          required
        />

        {accessType === "store" && (
          <SelectDropdown
            label="Select Store"
            value={accessRefId}
            onChange={(e) => {
              setValue("accessScope.refId", e.target.value, {
                shouldValidate: true,
              });
              trigger("accessScope.refId");
            }}
            options={stores}
            error={errors.accessScope?.refId?.message}
            required
          />
        )}

        {accessType === "city" && (
          <SelectDropdown
            label="Select City"
            value={accessRefId}
            onChange={(e) => {
              setValue("accessScope.refId", e.target.value, {
                shouldValidate: true,
              });
              trigger("accessScope.refId");
            }}
            options={cities}
            error={errors.accessScope?.refId?.message}
            required
          />
        )}

        <div className="sm:col-span-2">
          <ImageUpload
            key={imageKey}
            label="Profile Photo"
            shape="circle"
            multiple={false}
            onChange={(file) => setValue("avatar", file)}
            defaultImages={fullImageUrl ? [fullImageUrl] : []}
          />
        </div>

        <div className="sm:col-span-2 flex justify-end gap-3">
          <CancelButton onClick={handleClose} />
          <SaveButton disabled={isSubmitting} isLoading={isSubmitting} />
        </div>
      </form>
    </Modal>
  );
}
