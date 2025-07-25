import React from "react";
import { motion } from "framer-motion";
import { EditButton, DeleteButton } from "../../../ui/button";

export default function MeasurementCard({ measurement, onEdit, onDelete }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 min-h-[100px] relative flex flex-col gap-2"
    >
      <div className="flex items-start justify-between">
        <p className="text-lg font-semibold text-gray-800">
          {measurement.name}
        </p>
        <div className="flex gap-2">
          <EditButton onClick={() => onEdit(measurement)} />
          <DeleteButton onClick={() => onDelete(measurement)} />
        </div>
      </div>

      <div className="text-sm text-gray-700 flex flex-wrap gap-2 mt-1">
        {measurement.units?.map((unit, index) => (
          <span
            key={index}
            className="bg-gray-100 px-2 py-1 rounded-md text-xs border border-gray-300"
          >
            {unit}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
