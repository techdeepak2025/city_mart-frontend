import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { addUserSchema } from "./validation";
import axiosInstance from "../../../utils/axiosInstance";
import {
  TextInput,
  NumberInput,
  PasswordInput,
  SelectDropdown,
  ImageUpload,
} from "../../../ui/input";
import { SaveButton, ResetButton } from "../../../ui/button";
import { Modal } from "../../../ui/layout";

export default function AddUserForm({ isOpen, onClose }) {
  const [roles, setRoles] = useState([]);
  const [stores, setStores] = useState([]);
  const [cities, setCities] = useState([]);
  const [imageKey, setImageKey] = useState(Date.now());

  const defaultValues = {
    name: "",
    mobile: "",
    role: "",
    password: "",
    avatar: null,
    accessScope: {
      type: "global",
      refId: "",
    },
  };

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addUserSchema),
    defaultValues,
  });

  const name = watch("name");
  const mobile = watch("mobile");
  const role = watch("role");
  const password = watch("password");
  const accessType = watch("accessScope.type");
  const refId = watch("accessScope.refId");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [rolesRes, storesRes, citiesRes] = await Promise.all([
          axiosInstance.get("/roles"),
          axiosInstance.get("/stores"),
          axiosInstance.get("/cities"),
        ]);

        setRoles(rolesRes.data.map((r) => ({ label: r.name, value: r._id })));
        setStores(
          storesRes.data.map((s) => ({ label: s.storeNumber, value: s._id }))
        );
        setCities(citiesRes.data.map((c) => ({ label: c.name, value: c._id })));
      } catch {
        toast.error("Failed to load roles, stores or cities");
      }
    };

    if (isOpen) fetchAll();
  }, [isOpen]);

  useEffect(() => {
    if (accessType === "store" && stores.length === 1) {
      setValue("accessScope.refId", stores[0].value, { shouldValidate: true });
    }
    if (accessType === "city" && cities.length === 1) {
      setValue("accessScope.refId", cities[0].value, { shouldValidate: true });
    }
  }, [accessType, stores, cities]);

  const handleReset = () => {
    reset(defaultValues);
    setImageKey(Date.now());
  };

  const handleClose = () => {
    handleReset();
    onClose?.();
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(data)) {
        if (key === "avatar" && value instanceof File) {
          formData.append("avatar", value);
        } else if (key === "accessScope") {
          formData.append("accessScope.type", value.type);
          if (value.refId) {
            formData.append("accessScope.refId", value.refId);
          }
        } else {
          formData.append(key, value);
        }
      }

      await axiosInstance.post("/users", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("User created successfully");
      handleClose();
    } catch (err) {
      const msg = err?.response?.data?.error || "Failed to create user";
      toast.error(msg);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New User">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-6 px-1"
      >
        <TextInput
          label="Name"
          value={name}
          onChange={(e) => {
            setValue("name", e.target.value, { shouldValidate: true });
            trigger("name");
          }}
          onBlur={() => trigger("name")}
          error={errors.name?.message}
          required
        />

        <NumberInput
          label="Mobile"
          value={mobile}
          onChange={(val) => {
            setValue("mobile", val, { shouldValidate: true });
            trigger("mobile");
          }}
          onBlur={() => trigger("mobile")}
          maxLength={10}
          error={errors.mobile?.message}
          required
        />

        <SelectDropdown
          label="Role"
          options={roles}
          value={role}
          onChange={(e) => {
            setValue("role", e.target.value, { shouldValidate: true });
            trigger("role");
          }}
          error={errors.role?.message}
          required
        />

        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => {
            setValue("password", e.target.value, {
              shouldValidate: true,
              shouldDirty: true,
            });
            trigger("password");
          }}
          onBlur={() => trigger("password")}
          error={errors.password?.message}
          required
        />

        <SelectDropdown
          label="Access Type"
          options={[
            { label: "Global", value: "global" },
            { label: "Store", value: "store" },
            { label: "City", value: "city" },
          ]}
          value={accessType}
          onChange={(e) => {
            const newType = e.target.value;
            setValue("accessScope.type", newType, { shouldValidate: true });
            setValue("accessScope.refId", "", { shouldValidate: true });
            trigger(["accessScope.type", "accessScope.refId"]);
          }}
          error={errors.accessScope?.type?.message}
          required
        />

        {accessType === "store" && (
          <SelectDropdown
            label="Select Store"
            options={stores}
            value={refId}
            onChange={(e) => {
              setValue("accessScope.refId", e.target.value, {
                shouldValidate: true,
              });
              trigger("accessScope.refId");
            }}
            error={errors.accessScope?.refId?.message}
            required
          />
        )}

        {accessType === "city" && (
          <SelectDropdown
            label="Select City"
            options={cities}
            value={refId}
            onChange={(e) => {
              setValue("accessScope.refId", e.target.value, {
                shouldValidate: true,
              });
              trigger("accessScope.refId");
            }}
            error={errors.accessScope?.refId?.message}
            required
          />
        )}

        <div className="sm:col-span-2">
          <ImageUpload
            key={imageKey}
            label="Profile Photo"
            required
            error={errors.avatar?.message}
            onChange={(file) => {
              setValue("avatar", file, {
                shouldValidate: true,
                shouldDirty: true,
              });
              trigger("avatar");
            }}
          />
        </div>

        <div className="sm:col-span-2 flex justify-end gap-3">
          <ResetButton onClick={handleReset} />
          <SaveButton disabled={isSubmitting} isLoading={isSubmitting} />
        </div>
      </form>
    </Modal>
  );
}
