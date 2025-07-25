import React, { useRef, useState, useEffect, useCallback } from "react";
import { Plus, X } from "lucide-react";

export default function ImageUpload({
  label = "Upload Image(s)",
  accept = "image/*",
  required = false,
  error = "",
  multiple = false,
  defaultImages = [], 
  onChange,
  shape,
}) {
  const [images, setImages] = useState([]);
  const [localError, setLocalError] = useState("");
  const [touched, setTouched] = useState(false);
  const fileInputRef = useRef(null);

  // === INITIALIZE DEFAULT IMAGES ===
  useEffect(() => {
    if (Array.isArray(defaultImages) && defaultImages.length > 0) {
      setImages((prevImages) => {
        const hasChanged =
          prevImages.length !== defaultImages.length ||
          prevImages.some((img, i) => img.preview !== defaultImages[i]);

        if (hasChanged) {
          return defaultImages.map((url) => ({
            file: null,
            preview: url,
            isDefault: true,
          }));
        }
        return prevImages;
      });
    } else {
      setImages([]);
      // Do NOT trigger onChange here (prevents double upload on edit)
    }
  }, [defaultImages.join("|")]);

  // === CLEANUP BLOB URLs ===
  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (!img.isDefault && img.preview?.startsWith("blob:")) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, [images]);

  // === FILE SELECTION HANDLER ===
  const handleFiles = useCallback(
    (files) => {
      setTouched(true);

      const validImages = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (validImages.length === 0) {
        setLocalError("Please upload valid image files.");
        return;
      }

      const newImages = validImages.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        isDefault: false,
      }));

      const updatedImages = multiple
        ? [...images.filter((img) => !img.isDefault), ...newImages]
        : newImages;

      setImages(updatedImages);
      setLocalError("");

      const selected = multiple
        ? updatedImages.map((img) => img.file).filter(Boolean)
        : updatedImages[0]?.file || null;

      onChange?.(selected);
    },
    [images, multiple, onChange]
  );

  // === INPUT CHANGE ===
  const handleChange = (e) => {
    const files = e.target?.files;
    if (files?.length) handleFiles(files);
    e.target.value = ""; // Reset input
  };

  // === REMOVE IMAGE ===
  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);

    const selected = multiple
      ? updated.map((img) => img.file).filter(Boolean)
      : null;

    onChange?.(selected);
  };

  // === OPEN FILE DIALOG ===
  const triggerFileInput = () => {
    setTouched(true);
    fileInputRef.current?.click();
  };

  const showError = (touched && (error || localError)) || "";

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3">
        {images.map((img, index) => (
          <div key={index} className="relative w-28 h-28">
            <img
              src={img.preview}
              alt={`Preview ${index}`}
              className="w-full h-full object-cover rounded-md border"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full p-1 shadow-md"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {(multiple || images.length === 0) && (
          <button
            type="button"
            onClick={triggerFileInput}
            className="w-28 h-28 border border-dashed border-gray-300 rounded-md flex items-center justify-center hover:border-blue-400 transition"
            aria-label="Upload image"
          >
            <Plus size={28} className="text-gray-500" />
          </button>
        )}
      </div>

      <input
        type="file"
        id="image-upload-input"
        ref={fileInputRef}
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />

      {showError && (
        <p className="mt-2 text-xs text-red-600 whitespace-pre-wrap">
          {showError}
        </p>
      )}
    </div>
  );
}
