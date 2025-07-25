import React from "react";
import { Receipt } from "lucide-react";

export default function BillSummary({ itemTotal, deliveryCharge, handlingCharge, grandTotal }) {
  return (
    <div className="space-y-2 border-t pt-4 text-sm text-gray-700">
      <div className="flex items-center gap-2 text-gray-800 font-medium">
        <Receipt className="w-4 h-4" />
        <span>Bill Summary</span>
      </div>
      <div className="flex justify-between">
        <span>Item Total</span>
        <span>₹{itemTotal}</span>
      </div>
      <div className="flex justify-between">
        <span>Delivery Charges</span>
        <span>₹{deliveryCharge}</span>
      </div>
      <div className="flex justify-between">
        <span>Handling Charges</span>
        <span>₹{handlingCharge}</span>
      </div>
      <div className="flex justify-between font-semibold text-base pt-2 border-t">
        <span>Grand Total</span>
        <span className="text-green-700">₹{grandTotal}</span>
      </div>
    </div>
  );
}
