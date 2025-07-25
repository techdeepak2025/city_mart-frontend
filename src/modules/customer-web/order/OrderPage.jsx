import React from "react";
import { PackageCheck, Truck, Eye } from "lucide-react";

const dummyOrders = [
  {
    id: "ORD123456",
    date: "2025-07-10",
    status: "Delivered",
    total: "₹1,299",
    items: 3,
  },
  {
    id: "ORD123457",
    date: "2025-07-15",
    status: "Shipped",
    total: "₹799",
    items: 2,
  },
  {
    id: "ORD123458",
    date: "2025-07-20",
    status: "Processing",
    total: "₹2,199",
    items: 5,
  },
];

export default function OrderPage() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">My Orders</h2>

      {dummyOrders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg p-4 shadow-sm flex justify-between items-start"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <PackageCheck className="w-5 h-5 text-yellow-500" />
              <span className="font-medium text-sm">Order ID: {order.id}</span>
            </div>
            <p className="text-sm text-gray-700">Date: {order.date}</p>
            <p className="text-sm text-gray-700">Status: {order.status}</p>
            <p className="text-sm text-gray-700">Total: {order.total}</p>
            <p className="text-sm text-gray-700">Items: {order.items}</p>
          </div>

          <div
            className="flex items-center gap-1 px-3 py-1 border rounded text-sm text-gray-700 cursor-pointer hover:bg-gray-100 mt-1"
            onClick={() => alert(`View details for ${order.id}`)}
          >
            <Eye className="w-4 h-4" />
            View Details
          </div>
        </div>
      ))}
    </div>
  );
}
