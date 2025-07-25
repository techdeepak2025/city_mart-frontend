import React, { useEffect, useRef } from "react";
import { X, LocateFixed } from "lucide-react";
import { dummyAddresses } from "./Addresses";
import AddressCard from "./AddressCard";

export default function AddressModal({ isOpen, onClose, onSelectAddress }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center px-4">
      <div
        ref={modalRef}
        className="relative bg-white p-6 w-full max-w-lg shadow-xl rounded-lg"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 rounded hover:bg-gray-200 p-1 text-gray-600 hover:text-red-500"
        >
          <X size={15} />
        </button>

        {/* Heading */}
        <h2 className="mb-4 text-sm font-semibold text-gray-800">
          Change Location
        </h2>

        {/* Location Search */}
        <div className="flex items-center gap-3 mb-6">
          <button className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 whitespace-nowrap">
            <LocateFixed size={16} />
            Detect my location
          </button>
          <div className="flex items-center text-gray-300">
            <div className="w-3 border-t border-gray-300" />
            <span className="text-xs border p-1 rounded-full bg-white">OR</span>
            <div className="w-3 border-t border-gray-300" />
          </div>
          <input
            type="text"
            placeholder="Search delivery location"
            className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Saved Addresses */}
        <h3 className="text-sm mb-2 text-gray-800 font-medium">
          Your saved addresses
        </h3>
        <div className="flex flex-col gap-3 overflow-y-auto pr-2 scrollbar-thin max-h-[50vh]">
          {dummyAddresses.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectAddress(item);
                onClose(); 
              }}
            >
              <AddressCard
                item={item}
                onEdit={() => alert(`Edit ${item.id}`)}
                onDelete={() => alert(`Delete ${item.id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
