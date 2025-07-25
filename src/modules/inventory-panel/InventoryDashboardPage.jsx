import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ChevronDown, ChevronUp } from "lucide-react";

import axiosInstance, { BASE_URL } from "../../utils/axiosInstance";
import InventoryHeader from "../../components/inventory-panel/InventoryHeader";
import AddStockForm from "./AddStockForm";

export default function InventoryDashboardPage() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [stockModalProduct, setStockModalProduct] = useState(null);

  const [batchForm, setBatchForm] = useState({
    unitType: [],
    sizeType: "",
    size: [],
    color: "",
    sku: "",
    quantity: "",
    mrp: "",
    purchasePrice: "",
    supplier: "",
    rackNumber: "",
    batchNumber: "",
    manufactureDate: "",
    expiryDate: "",
    status: "",
    reorderLevel: "",
    note: "",
  });

  useEffect(() => {
    fetchUser();
    fetchProducts();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      setUser(res.data);
    } catch {
      toast.error("Failed to load user");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/products");
      const sanitized = res.data.map((p) => ({
        ...p,
        stockBatches: p.stockBatches ?? [],
      }));
      setProducts(sanitized);
    } catch {
      toast.error("Failed to load products");
    }
  };

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleAddStockClick = (product) => {
    setStockModalProduct(product);
    setBatchForm({
      unitType: [],
      sizeType: "",
      size: [],
      color: "",
      sku: "",
      quantity: "",
      mrp: "",
      purchasePrice: "",
      supplier: "",
      rackNumber: "",
      batchNumber: "",
      manufactureDate: "",
      expiryDate: "",
      status: "",
      reorderLevel: "",
      note: "",
    });
  };

  const handleSaveStock = async () => {
    try {
      const dataToSend = {
        ...batchForm,
        unitType: Array.isArray(batchForm.unitType) ? batchForm.unitType : [batchForm.unitType],
        size: Array.isArray(batchForm.size) ? batchForm.size : [batchForm.size],
      };
      await axiosInstance.post(`/products/${stockModalProduct._id}/stock`, dataToSend);
      toast.success("Stock added successfully");
      setStockModalProduct(null);
      fetchProducts();
    } catch {
      toast.error("Failed to add stock");
    }
  };

  const getTotalStock = (product) =>
    product.stockBatches?.reduce((sum, b) => sum + b.quantity, 0) || 0;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!user) {
    return <div className="p-6 text-center text-gray-600">Loading user...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <InventoryHeader user={user} onLogout={handleLogout} />

      <main className="p-6">
        <section className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Inventory</h2>

          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg p-4 flex items-start justify-between bg-gray-100"
              >
                <div className="flex gap-4 items-center">
                  {product.images?.[0] ? (
                    <img
                      src={`${BASE_URL}/uploads/products/${product.images[0]}`}
                      alt={product.name}
                      className="w-14 h-14 rounded object-cover border"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-image.png";
                      }}
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gray-200 flex items-center justify-center text-xs text-gray-500 rounded">
                      N/A
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">
                      {product.brand?.name || "No brand"} |{" "}
                      {product.category?.name || "No category"} |{" "}
                      {product.subCategory?.name || "No subcategory"}
                    </p>
                    <p className="text-sm mt-1 text-gray-700">
                      Stock: {getTotalStock(product)} units
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleAddStockClick(product)}
                    className="bg-indigo-500 text-white px-3 py-1 text-sm rounded hover:bg-indigo-600"
                  >
                    Add Stock
                  </button>
                  <button
                    onClick={() => toggleExpand(product._id)}
                    className="text-gray-600 hover:text-indigo-600 self-end"
                  >
                    {expandedId === product._id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {expandedId && (
            <div className="mt-6 border rounded-lg bg-gray-50 p-4">
              {products
                .filter((p) => p._id === expandedId)
                .map((product) => (
                  <div key={product._id}>
                    <h3 className="text-sm font-medium mb-2">
                      Stock Batches for {product.name}
                    </h3>

                    {product.stockBatches.length === 0 ? (
                      <p className="text-sm text-gray-500">No stock batches found.</p>
                    ) : (
                      <table className="w-full text-sm border rounded">
                        <thead className="bg-gray-100 text-gray-700">
                          <tr>
                            <th className="p-2">Batch ID</th>
                            <th className="p-2">Qty</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Unit</th>
                            <th className="p-2">Expiry</th>
                            <th className="p-2">Supplier</th>
                            <th className="p-2">Added</th>
                          </tr>
                        </thead>
                        <tbody>
                          {product.stockBatches.map((b) => (
                            <tr key={b.batchId}>
                              <td className="p-2 font-mono">{b.batchId}</td>
                              <td className="p-2">{b.quantity}</td>
                              <td className="p-2">₹{b.purchasePrice}</td>
                              <td className="p-2">
                                {Array.isArray(b.unitType) ? b.unitType.join(", ") : b.unitType}
                              </td>
                              <td className="p-2">
                                {b.expiryDate
                                  ? new Date(b.expiryDate).toLocaleDateString()
                                  : "N/A"}
                              </td>
                              <td className="p-2">{b.supplier}</td>
                              <td className="p-2">
                                {b.addedAt ? new Date(b.addedAt).toLocaleString() : "N/A"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                ))}
            </div>
          )}
        </section>
      </main>

      {/* Stock Modal */}
      {stockModalProduct && (
        <AddStockForm
          isOpen={true}
          product={stockModalProduct}
          batchForm={batchForm}
          setBatchForm={setBatchForm}
          onClose={() => setStockModalProduct(null)}
          onSave={handleSaveStock}
        />
      )}
    </div>
  );
}
