import React from "react";
import { dummyAddresses } from "./Addresses";
import AddressCard from "./AddressCard";

export default function AddressPage() {
  return (
    <div className="p-4 space-y-4 bg-gray-100">
      <h2 className="text-xl font-semibold">My Addresses</h2>
      {dummyAddresses.map((address) => (
        <AddressCard
          key={address.id}
          item={address}
          onEdit={() => alert(`Edit ${address.id}`)}
          onDelete={() => alert(`Delete ${address.id}`)}
        />
      ))}
    </div>
  );
}
