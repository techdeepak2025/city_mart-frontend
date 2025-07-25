import React from "react";
import { Gift, BadgeCheck, Eye } from "lucide-react";

const dummyGiftCards = [
  {
    id: "GC-001",
    code: "XXXX-XXXX-1234",
    balance: "₹500",
    status: "Active",
    issued: "2025-07-01",
  },
  {
    id: "GC-002",
    code: "XXXX-XXXX-5678",
    balance: "₹0",
    status: "Used",
    issued: "2025-06-15",
  },
];

export default function GiftCardPage() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Gift className="w-5 h-5 text-yellow-500" />
        My Gift Cards
      </h2>

      {dummyGiftCards.map((card) => (
        <div
          key={card.id}
          className="border rounded-lg p-4 shadow-sm flex justify-between items-start"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BadgeCheck className="w-5 h-5 text-yellow-500" />
              <span className="font-medium text-sm">Card Code: {card.code}</span>
            </div>
            <p className="text-sm text-gray-700">Issued: {card.issued}</p>
            <p className="text-sm text-gray-700">Balance: {card.balance}</p>
            <p
              className={`text-sm font-medium ${
                card.status === "Active" ? "text-green-600" : "text-gray-500"
              }`}
            >
              Status: {card.status}
            </p>
          </div>

          {card.status === "Active" && (
            <div
              className="flex items-center gap-1 px-3 py-1 border rounded text-sm text-gray-700 cursor-pointer hover:bg-gray-100 mt-1"
              onClick={() => alert(`Redeem ${card.code}`)}
            >
              <Eye className="w-4 h-4" />
              Redeem
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
