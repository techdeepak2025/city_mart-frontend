import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import axiosInstance, { BASE_URL } from "../../../utils/axiosInstance";
import { addProductSchema } from "./validation";

import {
  TextInput,
  TextArea,
  ImageUpload,
  SelectDropdown,
  NumberInput,
} from "../../../ui/input";
import { SaveButton, CancelButton } from "../../../ui/button";
import { Modal } from "../../../ui/layout";

export default function EditProductForm({
  isOpen,
  onClose,
  product,
  onSuccess,
}) {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [imageKey, setImageKey] = useState(Date.now());
  const [defaultImageUrls, setDefaultImageUrls] = useState([]);

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
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
    },
  });

  const watchFields = watch();

  useEffect(() => {
    if (isOpen) {
      fetchDropdownData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (product && brands.length && categories.length && measurements.length) {
      reset({
        name: product.name || "",
        description: product.description || "",
        brand: product.brand?._id || product.brand || "",
        category: product.category?._id || product.category || "",
        subcategory: product.subcategory?._id || product.subcategory || "",
        measurement: product.measurement?._id || product.measurement || "",
        unit: product.unit || "",
        mrp: product.mrp || "",
        sku: product.sku || "",
        images: [],
      });

      const fullUrls = (product.images || []).map((img) => {
        const url = typeof img === "string" ? img : img?.url;
        return url?.startsWith("http")
          ? url
          : `${BASE_URL}/uploads/products/${url}`;
      });

      setDefaultImageUrls(fullUrls);
      setImageKey(Date.now());
    }
  }, [product, brands, categories, measurements, reset]);

  useEffect(() => {
    if (watchFields.category) {
      const id =
        typeof watchFields.category === "object"
          ? watchFields.category._id
          : watchFields.category;
      fetchSubcategories(id);
    } else {
      setSubcategories([]);
    }
  }, [watchFields.category]);

  useEffect(() => {
    if (watchFields.measurement && measurements.length) {
      const selected = measurements.find(
        (m) =>
          m._id ===
          (typeof watchFields.measurement === "object"
            ? watchFields.measurement._id
            : watchFields.measurement)
      );
      setUnitOptions(selected?.units || []);
    } else {
      setUnitOptions([]);
    }
  }, [watchFields.measurement, measurements]);

  const fetchDropdownData = async () => {
    try {
      const [brandsRes, categoriesRes, measurementsRes] = await Promise.all([
        axiosInstance.get("/brands"),
        axiosInstance.get("/categories"),
        axiosInstance.get("/measurements"),
      ]);
      setBrands(brandsRes.data || []);
      setCategories(categoriesRes.data || []);
      setMeasurements(measurementsRes.data || []);
    } catch (err) {
      toast.error("Failed to load dropdown data");
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const res = await axiosInstance.get(
        `/sub-categories?category=${categoryId}`
      );
      setSubcategories(res.data || []);
    } catch (err) {
      toast.error("Failed to load subcategories");
      setSubcategories([]);
    }
  };

  const handleClose = () => {
    reset();
    setSubcategories([]);
    setUnitOptions([]);
    setImageKey(Date.now());
    onClose?.();
  };

  const onSubmit = async (data) => {
  try {
    const formData = new FormData();
    for (const key in data) {
      if (key === "images") {
        data.images?.forEach((file) => formData.append("images", file));
      } else {
        formData.append(key, data[key]);
      }
    }

    const res = await axiosInstance.put(`/products/${product._id}`, formData);

    toast.success("Product updated successfully");
    handleClose();
    onSuccess?.(res.data); // ✅ pass updated product from server
  } catch (err) {
    toast.error(err?.response?.data?.error || "Failed to update product");
  }
};


  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      color="bg-green-600"
      onClose={handleClose}
      title="Edit Product"
    >
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
          name="mrp"
          label="MRP"
          value={watchFields.mrp}
          onChange={(val) => {
            const parsed = val === "" ? "" : Number(val);
            setValue("mrp", parsed, { shouldValidate: true });
            trigger("mrp");
          }}
          error={errors.mrp?.message}
          required
        />

        <TextInput
          label="SKU"
          value={watchFields.sku}
          onChange={(e) =>
            setValue("sku", e.target.value, { shouldValidate: true })
          }
          onBlur={() => trigger("sku")}
          error={errors.sku?.message}
          required
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
            defaultImages={defaultImageUrls}
            error={errors.images?.message}
            onChange={(files) => {
              setValue("images", files, { shouldValidate: true });
              trigger("images");
            }}
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
