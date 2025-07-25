import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function DeleteConfirmationDialog({
  isOpen,
  title = "Delete Confirmation",
  message = "Are you sure you want to delete this item?",
  onCancel,
  onConfirm,
  loadingText = "Deleting...",
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm mx-4 rounded-lg shadow-xl p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-full">
            <Trash2 size={20} />
          </div>
          <h2 className="text-lg font-semibold text-red-700">{title}</h2>
        </div>

        {/* Message */}
        <p className="text-gray-700 text-sm mb-6">{message}</p>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition
              ${
                isLoading
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-2 focus:ring-gray-400"
              }`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition
              ${
                isLoading
                  ? "bg-red-400 text-white opacity-70 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-400"
              }`}
          >
            {isLoading ? loadingText : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
