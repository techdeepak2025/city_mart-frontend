import React from "react";

export default function AddStockForm({
  isOpen = true,
  onClose,
  product,
  batchForm,
  setBatchForm,
  onSave,
}) {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBatchForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{`Add Stock: ${product?.name}`}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600 text-xl">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Unit Type</label>
            <input name="unitType" value={batchForm.unitType} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Size Type</label>
            <input name="sizeType" value={batchForm.sizeType} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Size</label>
            <input name="size" value={batchForm.size} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Color</label>
            <input name="color" value={batchForm.color} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">SKU</label>
            <input name="sku" value={batchForm.sku} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Quantity</label>
            <input type="number" name="quantity" value={batchForm.quantity} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">MRP</label>
            <input type="number" name="mrp" value={batchForm.mrp} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Purchase Price</label>
            <input type="number" name="purchasePrice" value={batchForm.purchasePrice} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Supplier</label>
            <input name="supplier" value={batchForm.supplier} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Rack Number</label>
            <input name="rackNumber" value={batchForm.rackNumber} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Batch Number</label>
            <input name="batchNumber" value={batchForm.batchNumber} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Manufacture Date</label>
            <input type="date" name="manufactureDate" value={batchForm.manufactureDate} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Expiry Date</label>
            <input type="date" name="expiryDate" value={batchForm.expiryDate} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Reorder Level</label>
            <input name="reorderLevel" value={batchForm.reorderLevel} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select name="status" value={batchForm.status} onChange={handleChange} className="w-full border px-3 py-2 rounded">
              <option value="">Select</option>
              <option value="available">Available</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-medium">Note</label>
            <textarea name="note" value={batchForm.note} onChange={handleChange} className="w-full border px-3 py-2 rounded" rows={3} />
          </div>
          <div className="col-span-2 flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
