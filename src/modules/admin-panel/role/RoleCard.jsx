import { EditButton, DeleteButton } from "../../../ui/button";
import { motion } from "framer-motion";

export default function RoleCard({ role, onEdit, onDelete }) {
  const isProtected = role.name.toLowerCase() === "admin";

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
      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <EditButton onClick={() => onEdit(role)} />
        <DeleteButton
          onClick={() => onDelete(role)}
          disabled={isProtected}
          title={isProtected ? "Protected role – cannot delete" : "Delete Role"}
        />
      </div>

      {/* Role Details */}
      <div className="pt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-1 capitalize">
          {role.name.replace(/-/g, " ")}
        </h2>
        <p className="text-sm text-gray-500">
          Created on: {new Date(role.createdAt).toLocaleDateString()}
        </p>
      </div>
    </motion.div>
  );
}
