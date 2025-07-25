import React from "react";
import { motion } from "framer-motion";
import { EditButton, DeleteButton } from "../../../ui/button";

export default function StoreCard({ store, stateName, cityName, onEdit, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col"
    >
      {/* Image Header */}
      <div className="h-36 w-full bg-gray-200 flex items-center justify-center relative">
        <img
          src="/store1.webp"
          alt="Store Icon"
          className="h-20 w-20 object-contain rounded-full border border-gray-300 shadow"
        />
        <div className="absolute top-0 right-2 flex justify-end gap-2">
          <EditButton onClick={onEdit} />
          <DeleteButton onClick={onDelete} />
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Store #{store.storeNumber}
        </h2>
        <p className="text-sm text-gray-500 mb-2">
          {stateName}, {cityName}
        </p>
        <div className="text-sm text-gray-600 flex-grow space-y-1">
          <p>
            <span className="font-medium">Address:</span>{" "}
            {store.address || "N/A"}
          </p>
          <p>
            <span className="font-medium">Pincode:</span>{" "}
            {store.pincode || "N/A"}
          </p>
          <p>
            <span className="font-medium">Created on:</span>{" "}
            {new Date(store.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
