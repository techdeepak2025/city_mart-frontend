import { EditButton, DeleteButton } from "../../../ui/button";
import { motion } from "framer-motion";

export default function StateCard({ state, onEdit, onDelete }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 overflow-hidden relative flex flex-col gap-2"
    >
      {/* Top-right action buttons */}
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <EditButton onClick={() => onEdit(state)} />
        <DeleteButton onClick={() => onDelete(state)} />
      </div>

      {/* State Details */}
      <div className="pt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          {state.name}
        </h2>
        <p className="text-sm text-gray-500">
          Created on: {new Date(state.createdAt).toLocaleDateString()}
        </p>
      </div>
    </motion.div>
  );
}
