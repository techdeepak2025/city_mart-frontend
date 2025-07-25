import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function AddressCard({ item, onEdit, onDelete }) {
  return (
    <div className="bg-white cursor-pointer p-3 border border-gray-200 rounded-xl hover:bg-gray-50">
      <div className="flex items-start gap-3">
        <div className="bg-gray-100 p-2 rounded-lg">{item.icon}</div>
        <div>
          <p className="text-sm font-medium">{item.type}</p>
          <p className="text-xs text-gray-600">{item.address}</p>
          <p className="text-xs text-gray-500">{item.phone}</p>
        </div>
      </div>
      <div className="flex gap-3 mt-3 ml-11">
        <button
          className="p-1 rounded-full hover:bg-green-100 border border-gray-300 text-green-600"
          onClick={() => onEdit?.(item)}
        >
          <Pencil size={12} />
        </button>
        <button
          className="p-1 rounded-full hover:bg-red-100 border border-gray-300 text-red-500"
          onClick={() => onDelete?.(item)}
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
}
