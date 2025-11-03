import React, { useContext, useEffect, useState } from "react";
import { Trash2, X, Loader2, PlusCircle, Pencil, Search, Save } from "lucide-react";
import { UsersContext } from "../../contextApi/UserContextApi";
import axios from "axios";
import toast from "react-hot-toast";

//  Confirmation Modal component
const ProductConfirmationModal = ({ product, isOpen, setIsOpen, onConfirmDelete }) => {
  if (!isOpen) return null;

  const handleDelete = () => {
    onConfirmDelete(product._id);
    setIsOpen(null); 
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-opacity-40 backdrop-blur-sm p-4"
      onClick={() => setIsOpen(null)}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 p-6 transform scale-100 transition duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-red-700 mb-4 border-b pb-2">
          Confirm Deletion
        </h3>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete the product:{" "}
          <span className="font-semibold text-gray-900">{product.name}</span>?
          <br />
          (This action cannot be undone)
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setIsOpen(null)}
            className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition duration-150"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-150 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
};

//  Edit modal component 
const ProductEditModal = ({ product, onUpdate, onClose }) => {
  const initialSizes = product.sizes || { S: 0, M: 0, L: 0, XL: 0 };
  const availableSizes = Object.keys(initialSizes);

  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price.toString(),
    discount: product.discount.toString(),
    selectedSize: availableSizes[0] || "S",
    newSizeStock: "",
    currentSizes: initialSizes,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStockUpdate = (e) => {
    e.preventDefault();
    const size = formData.selectedSize;
    const newStock = parseInt(formData.newSizeStock || 0, 10);

    if (!size) return;

    setFormData((prev) => ({
      ...prev,
      currentSizes: {
        ...prev.currentSizes,
        [size]: newStock,
      },
      newSizeStock: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const updatedSizes = formData.currentSizes;
    const totalStock = Object.values(updatedSizes).reduce((sum, count) => sum + (count || 0), 0);

    const finalUpdateData = {
      id: product._id,
      name: formData.name,
      price: parseFloat(formData.price || 0),
      discount: parseFloat(formData.discount || 0),
      sizes: updatedSizes,
      stock: totalStock,
    };

    await onUpdate(finalUpdateData);
    setIsSaving(false);
  };

  return (
    <div
      className="fixed inset-0 z-[65] flex items-center justify-center bg-opacity-70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-blue-700">
            Edit Product: {product.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition duration-150"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price (USD)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div>
              <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                step="1"
                min="0"
                max="100"
              />
            </div>
          </div>

          {/* Size with stock management section */}
          <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
            <h4 className="text-md font-bold text-gray-700 mb-3">Size Stock Management</h4>

            <div className="flex justify-between flex-wrap gap-2 mb-4">
              {availableSizes.map((size) => (
                <div key={size} className="bg-white p-2 border rounded-md shadow-sm text-center flex-1 min-w-[70px]">
                  <p className="text-xs font-medium text-gray-500">{size} Size</p>
                  <p className="text-lg font-bold text-gray-800">{formData.currentSizes[size]}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="selectedSize" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Select Size:
              </label>
              <select
                id="selectedSize"
                name="selectedSize"
                value={formData.selectedSize}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {availableSizes.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>

              <input
                type="number"
                name="newSizeStock"
                value={formData.newSizeStock}
                onChange={handleChange}
                placeholder={`New stock for ${formData.selectedSize}`}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 flex-1 text-sm"
                step="1"
                min="0"
              />

              <button
                type="button"
                onClick={handleStockUpdate}
                disabled={formData.newSizeStock === "" || isSaving}
                className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 transition disabled:bg-gray-400"
                title="Set stock for selected size"
              >
                <PlusCircle size={18} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              To update stock, input the new total count above and click the "+" button.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-green-600 text-white flex items-center gap-2 px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-green-700 transition duration-300 disabled:bg-gray-400"
            >
              {isSaving ? <><Loader2 size={18} className="animate-spin" /> Saving...</> : <><Save size={18} /> Save Changes</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

//  Table Row Component 
const ProductTableRow = ({ product, onDelete, onEdit, onOpenConfirm }) => {
  const stockColor =
    product.stock < 10
      ? "bg-red-100 text-red-800"
      : product.stock < 50
      ? "bg-yellow-100 text-yellow-800"
      : "bg-green-100 text-green-800";

  const isLowStock = product.stock < 50;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition duration-150">
      <td className="px-4 py-3 text-xs font-mono text-gray-500 truncate hidden md:table-cell">{product.id}</td>
      <td className="px-4 py-3"><span className="font-medium text-gray-900 text-sm">{product.name}</span></td>
      <td className="px-4 py-3 text-right">
        {product.discount > 0 ? (
          <div className="flex flex-col items-end">
            <span className="font-bold text-red-600 text-sm">${(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
            <span className="text-xs text-gray-500 line-through">${product.price.toFixed(2)}</span>
          </div>
        ) : <span className="font-bold text-green-600 text-sm">${product.price.toFixed(2)}</span>}
      </td>
      <td className="px-4 py-3 text-center hidden sm:table-cell">
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${stockColor}`}>{product.stock} pcs</span>
        {isLowStock && <p className="text-xs text-red-500 mt-1">Low Stock!</p>}
      </td>
      <td className="px-4 py-3">
        <div className="flex justify-end space-x-2">
          <button onClick={() => onEdit(product)} className="p-2 text-blue-500 rounded-lg hover:bg-blue-100 transition duration-200"><Pencil size={16} /></button>
          <button onClick={() => onOpenConfirm(product)} className="p-2 text-red-500 rounded-lg hover:bg-red-100 transition duration-200"><Trash2 size={16} /></button>
        </div>
      </td>
    </tr>
  );
};

//  Main Product List Modal 
export default function ProductListModal() {
  const [searchTerm, setSearchTerm] = useState("");
  const { productListModal, setProductListModal } = useContext(UsersContext);
  const [productList, setProductList] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [confirmProduct, setConfirmProduct] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_PRODUCT_URL}/get-product-list`)
      .then((res) => setProductList(res.data.product))
      .catch((err) => toast.error(err.response?.data?.message || "Failed to fetch products"));
  }, []);

  const handleUpdateProduct = async (updateData) => {
    try {
      await axios.put(`${import.meta.env.VITE_PRODUCT_URL}/update-product`, updateData);
      setProductList((prevList) => prevList.map((p) => (p._id === updateData.id ? updateData : p)));
      toast.success("✅ Product updated successfully!");
      setEditModal(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "❌ Failed to update product");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_PRODUCT_URL}/delete-product/${id}`);
      setProductList((prevList) => prevList.filter((p) => p._id !== id));
      toast.success("✅ Product deleted successfully!");
      setConfirmProduct(null);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "❌ Failed to delete product");
    }
  };

  const display = productListModal ? "flex" : "hidden";

  return (
    <div className={`backdrop-blur-sm fixed inset-0 bg-opacity-70 z-50 ${display} items-center justify-center p-4`}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col transform transition-transform duration-300" onClick={(e) => e.stopPropagation()}>
        {/* Header section*/}
        <div className="p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-xl z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-800">Product Inventory</h2>
              <p className="text-sm text-gray-500 mt-1">Manage the list of available products in real-time.</p>
            </div>
            <button onClick={() => setProductListModal(false)} className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition duration-150 hover:bg-gray-100" aria-label="Close">
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
            <div className="w-full md:w-72 relative">
              <input type="text" placeholder="Search by product name or ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"/>
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
            </div>
            <div className="flex gap-3 shrink-0">
              <button className="bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300" title="Add New Product">
                <PlusCircle size={18} /> Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-grow bg-gray-50">
          {productList.length === 0 ? (
            <div className="text-center py-16 text-gray-500 font-medium">
              No products match your current filter or have been added yet.
              <button className="mt-4 text-blue-600 flex items-center justify-center mx-auto hover:text-blue-700 transition">
                <PlusCircle size={16} className="mr-1" /> Add a new product
              </button>
            </div>
          ) : (
            <table className="w-full min-w-max table-auto text-left">
              <thead className="sticky top-0 bg-gray-100 shadow-sm">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell ">Product ID</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Price & Discount</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center hidden sm:table-cell ">Stock</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {productList
                  .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p._id.includes(searchTerm))
                  .map((product) => (
                    <ProductTableRow
                      key={product._id}
                      product={product}
                      onDelete={handleDeleteProduct}
                      onEdit={(product) => { setSelectedProduct(product); setEditModal(true); }}
                      onOpenConfirm={(product) => setConfirmProduct(product)}
                    />
                  ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between sticky bottom-0 bg-white rounded-b-xl z-10">
          <p className="text-sm text-gray-500">
            Total Products: {productList.length}
          </p>
          <button onClick={() => setProductListModal(false)} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-150">Close</button>
        </div>
      </div>

      {/* Modals outside table */}
      {editModal && selectedProduct && (
        <ProductEditModal
          product={selectedProduct}
          onUpdate={handleUpdateProduct}
          onClose={() => { setEditModal(false); setSelectedProduct(null); }}
        />
      )}

      {confirmProduct && (
        <ProductConfirmationModal
          product={confirmProduct}
          isOpen={!!confirmProduct}
          setIsOpen={() => setConfirmProduct(null)}
          onConfirmDelete={handleDeleteProduct}
        />
      )}
    </div>
  );
}
