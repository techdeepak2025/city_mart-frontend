import React from "react";
import { Clock } from "lucide-react";

export default function DeliveryEstimate() {
  return (
    <div className="flex items-start gap-2 bg-yellow-100 p-3 rounded text-sm text-gray-700">
      <Clock size={20} className="text-yellow-600" />
      <div>
        <p className="font-semibold">Delivery in 8 minutes</p>
        <span>Shipment of 1 item</span>
      </div>
    </div>
  );
}
