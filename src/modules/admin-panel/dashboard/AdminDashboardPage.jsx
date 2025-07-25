import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

import {
  totalStats,
  salesData,
  salesTarget,
  categorySales,
  pieData,
  bestSellingProducts,
  recentOrders,
} from "./dashboardData";

const COLORS = ["#4F46E5", "#6366F1", "#818CF8", "#A5B4FC"];

export default function AdminDashboardPage() {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-100 to-indigo-50 overflow-y-auto h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-gray-800"
      >
        Overview
      </motion.h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {totalStats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="bg-white p-4 rounded-xl shadow-md border-l-4 border-indigo-500"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <h2 className="text-xl font-bold text-gray-800">{stat.value}</h2>
              </div>
              <div className="bg-indigo-100 p-2 rounded-full">{stat.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sales Over Time & Revenue Share */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-4 rounded-xl shadow-md col-span-1 lg:col-span-2"
        >
          <h3 className="text-lg font-semibold mb-3 text-indigo-600">
            Sales Over Time
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-4 rounded-xl shadow-md"
        >
          <h3 className="text-lg font-semibold mb-3 text-indigo-600">
            Revenue Share by Category
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Category Sales & Target */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h3 className="text-lg font-semibold mb-4 text-purple-600">
            Sales by Category
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categorySales}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h3 className="text-lg font-semibold mb-4 text-green-600">
            Monthly Sales Target
          </h3>
          <p className="text-sm text-gray-500 mb-2">Goal: $10,000</p>
          <div className="w-full bg-gray-200 rounded-full h-5">
            <div
              className="bg-green-500 h-5 rounded-full text-white text-xs font-semibold flex justify-end pr-2 items-center"
              style={{ width: `${salesTarget.percentage}%` }}
            >
              {salesTarget.percentage}%
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            You’ve reached{" "}
            <span className="font-semibold">${salesTarget.reached}</span> so far.
          </p>
        </motion.div>
      </div>

      {/* Best Selling Products */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-indigo-600">
          Best Selling Products
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bestSellingProducts.map((product, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-content rounded-md mb-3"
              />
              <p className="font-medium text-gray-800">{product.name}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-sm text-green-600 font-semibold">{product.sales}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-indigo-600">
          Recent Orders
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="py-2 px-4">Customer</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-2 px-4 font-medium">{order.customer}</td>
                  <td className="py-2 px-4">{order.date}</td>
                  <td className="py-2 px-4">{order.amount}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
