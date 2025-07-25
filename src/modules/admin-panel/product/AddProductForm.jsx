import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import axiosInstance from "../../../utils/axiosInstance";
import { addProductSchema } from "./validation";

import {
  TextInput,
  TextArea,
  ImageUpload,
  SelectDropdown,
  NumberInput,
} from "../../../ui/input";
import { SaveButton, ResetButton } from "../../../ui/button";
import { Modal } from "../../../ui/layout";

export default function AddProductForm({ isOpen, onClose, onSuccess }) {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [imageKey, setImageKey] = useState(Date.now());

  const defaultValues = {
    name: "",
    description: "",
    brand: "",
    category: "",
    subcategory: "",
    measurement: "",
    unit: "",
    mrp: "",
    sku: "",
    images: [],
  };

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addProductSchema),
    defaultValues,
  });

  const watchFields = watch();

  useEffect(() => {
    if (isOpen) {
      fetchInitialDropdownData();
      resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!watchFields.category) {
      setSubcategories([]);
      setValue("subcategory", "");
      return;
    }

    const fetchSubcategories = async () => {
      try {
        const res = await axiosInstance.get(
          `/sub-categories?category=${watchFields.category}`
        );
        setSubcategories(res.data || []);
        setValue("subcategory", "");
      } catch {
        toast.error("Failed to load subcategories");
        setSubcategories([]);
      }
    };

    fetchSubcategories();
  }, [watchFields.category]);

  useEffect(() => {
    if (watchFields.measurement && measurements.length) {
      const selected = measurements.find(
        (m) => m._id === watchFields.measurement
      );
      if (selected?.units?.length) {
        setUnitOptions(selected.units);
      } else {
        setUnitOptions([]);
      }
      setValue("unit", "");
    } else {
      setUnitOptions([]);
      setValue("unit", "");
    }
  }, [watchFields.measurement]);

  const fetchInitialDropdownData = async () => {
    try {
      const [brandsRes, categoriesRes, measurementsRes] = await Promise.all([
        axiosInstance.get("/brands"),
        axiosInstance.get("/categories"),
        axiosInstance.get("/measurements"),
      ]);

      setBrands(brandsRes.data || []);
      setCategories(categoriesRes.data || []);
      setMeasurements(measurementsRes.data || []);
    } catch {
      toast.error("Failed to fetch dropdown data");
    }
  };

  const resetForm = () => {
    reset(defaultValues);
    setSubcategories([]);
    setUnitOptions([]);
    setImageKey(Date.now());
  };

  const handleClose = () => {
    resetForm();
    onClose?.();
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      for (const key in data) {
        if (key === "images" && Array.isArray(data.images)) {
          data.images.forEach((file) => formData.append("images", file));
        } else {
          const value =
            typeof data[key] === "object" && data[key]?._id
              ? data[key]._id
              : data[key];
          formData.append(key, value ?? "");
        }
      }

      const res = await axiosInstance.post("/products", formData);
      toast.success("Product created successfully");
      handleClose();
      onSuccess?.(res.data);
    } catch (err) {
      const msg = err?.response?.data?.error || "Failed to create product";
      toast.error(msg);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Product">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-6 px-1 overflow-y-auto max-h-[78vh]"
      >
        <TextInput
          label="Product Name"
          value={watchFields.name}
          onChange={(e) =>
            setValue("name", e.target.value, { shouldValidate: true })
          }
          onBlur={() => trigger("name")}
          error={errors.name?.message}
          required
        />

        <SelectDropdown
          label="Brand"
          options={brands.map((b) => ({ label: b.name, value: b._id }))}
          value={watchFields.brand}
          onChange={(e) =>
            setValue("brand", e.target.value, { shouldValidate: true })
          }
          error={errors.brand?.message}
          required
        />

        <SelectDropdown
          label="Category"
          options={categories.map((c) => ({ label: c.name, value: c._id }))}
          value={watchFields.category}
          onChange={(e) =>
            setValue("category", e.target.value, { shouldValidate: true })
          }
          error={errors.category?.message}
          required
        />

        <SelectDropdown
          label="Subcategory"
          options={subcategories.map((s) => ({ label: s.name, value: s._id }))}
          value={watchFields.subcategory}
          disabled={!watchFields.category}
          onChange={(e) =>
            setValue("subcategory", e.target.value, { shouldValidate: true })
          }
          error={errors.subcategory?.message}
          required
        />

        <SelectDropdown
          label="Measurement Type"
          options={measurements.map((m) => ({ label: m.name, value: m._id }))}
          value={watchFields.measurement}
          onChange={(e) =>
            setValue("measurement", e.target.value, { shouldValidate: true })
          }
          error={errors.measurement?.message}
          required
        />

        <SelectDropdown
          label="Unit"
          options={unitOptions.map((u) => ({ label: u, value: u }))}
          value={watchFields.unit}
          disabled={!unitOptions.length}
          onChange={(e) =>
            setValue("unit", e.target.value, { shouldValidate: true })
          }
          error={errors.unit?.message}
          required
        />

        <NumberInput
          label="MRP (₹)"
          name="mrp"
          value={watch("mrp")}
          onChange={(val) => {
            const parsed = val === "" ? "" : Number(val);
            setValue("mrp", parsed, { shouldValidate: true });
            trigger("mrp");
          }}
          error={errors.mrp?.message}
        />

        <TextInput
          label="SKU"
          value={watchFields.sku}
          onChange={(e) =>
            setValue("sku", e.target.value, { shouldValidate: true })
          }
          onBlur={() => trigger("sku")}
          error={errors.sku?.message}
        />

        <div className="sm:col-span-2">
          <TextArea
            label="Description"
            placeholder="Enter product description"
            value={watchFields.description}
            onChange={(e) =>
              setValue("description", e.target.value, { shouldValidate: true })
            }
            onBlur={() => trigger("description")}
            error={errors.description?.message}
          />
        </div>

        <div className="sm:col-span-2">
          <ImageUpload
            key={imageKey}
            label="Upload Images"
            multiple
            error={errors.images?.message}
            onChange={(files) => {
              setValue("images", files, { shouldValidate: true });
              trigger("images");
            }}
          />
        </div>

        <div className="sm:col-span-2 flex justify-end gap-3">
          <ResetButton onClick={resetForm} />
          <SaveButton disabled={isSubmitting} isLoading={isSubmitting} />
        </div>
      </form>
    </Modal>
  );
}
