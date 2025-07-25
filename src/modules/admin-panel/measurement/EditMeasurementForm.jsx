import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { editMeasurementSchema } from "./validation";

import { Modal } from "../../../ui/layout";
import { TextInput } from "../../../ui/input";
import { SaveButton, CancelButton } from "../../../ui/button";
import { X } from "lucide-react";

export default function EditMeasurementForm({ isOpen, onClose, onSave, initialData }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editMeasurementSchema),
    defaultValues: { _id: "", name: "", units: [""] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "units",
  });

  useEffect(() => {
    if (isOpen && initialData) {
      reset(initialData);
    }
  }, [isOpen, initialData, reset]);

  const handleFormSubmit = (data) => {
    onSave(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Measurement Type">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="grid sm:grid-cols-2 gap-6 px-1 overflow-y-auto max-h-[78vh]"
      >
        <TextInput
          label="Measurement Name"
          {...register("name")}
          error={errors.name?.message}
          required
        />

        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Units
          </label>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <TextInput
                  placeholder={`Unit ${index + 1}`}
                  {...register(`units.${index}`)}
                  error={errors.units?.[index]?.message}
                  required
                />
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-gray-500 hover:text-red-600 transition p-1"
                    title="Remove unit"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => append("")}
              className="text-sm text-blue-600 hover:underline mt-1"
            >
              + Add another unit
            </button>

            {typeof errors.units?.message === "string" && (
              <p className="text-red-500 text-sm">{errors.units.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 sm:col-span-2 mt-2">
          <CancelButton onClick={onClose} />
          <SaveButton
            label="Update"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          />
        </div>
      </form>
    </Modal>
  );
}
