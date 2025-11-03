import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react"; // For the close icon

const ProductModal = ({ isOpen, onClose, setAlert, setMessage }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    discount: "",
    sizes: { S: 0, M: 0, L: 0, XL: 0 },
    images: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (size, value) => {
    setFormData((prev) => ({
      ...prev,
      sizes: { ...prev.sizes, [size]: Number(value) },
    }));
  };

  const handleFilesChange = (e) => {
    setFormData((prev) => ({ ...prev, images: Array.from(e.target.files) }));
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("description", formData.description);
    fd.append("category", formData.category);
    fd.append("stock", formData.stock);
    fd.append("price", formData.price);
    fd.append("discount", formData.discount);
    fd.append("sizes", JSON.stringify(formData.sizes));
    formData.images.forEach((file) => fd.append("images", file));

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_PRODUCT_URL}/addproduct`,
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setAlert(true);
      setMessage(res.data.message);

      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        discount: 0,
        sizes: { S: 0, M: 0, L: 0, XL: 0 },
        images: [],
      });
      onClose();
    } catch (error) {
      console.error(error.response?.data?.message);

      setAlert(true);
      setMessage(error.response?.data?.message || "Error adding product!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative transform transition-all duration-300 ease-out max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header start*/}
        <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-5">
          <h2 className="text-2xl font-semibold text-gray-800">
            Add New Product
          </h2>
          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Name
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Ultra HD Monitor"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-150"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed description of the product..."
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-150"
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-150 bg-white"
              required
            >
              <option value="">Select a Category</option>
              <option value="sweat wear">Sweat wear</option>
              <option value="active wear">Active wear</option>
              <option value="pants">Pants</option>
              <option value="tops">Tops</option>
              <option value="jackets">Jackets</option>
              <option value="t shirts">T-shirts</option>
              <option value="denim">Denim</option>
              <option value="wallets">Wallets</option>
              <option value="watches">Watches</option>
              <option value="bags">Bags</option>
              <option value="sunglass">Sunglass</option>
              <option value="hats">Hats</option>
              <option value="belts">Belts</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price (€)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-150"
                required
              />
            </div>
            <div>
              <label
                htmlFor="discount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Discount (%)
              </label>
              <input
                id="discount"
                name="discount"
                type="number"
                value={formData.discount}
                onChange={handleChange}
                placeholder="0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-150"
              />
            </div>
            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Total Stock
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                placeholder="e.g., 100"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-150"
                required
              />
            </div>
          </div>

          {/* Sizes Stock input field*/}
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">
              Stock by Size
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {["S", "M", "L", "XL"].map((size) => (
                <div key={size}>
                  <label
                    htmlFor={`size-${size}`}
                    className="block text-xs font-medium text-gray-600 mb-1"
                  >
                    {size}
                  </label>
                  <input
                    id={`size-${size}`}
                    type="number"
                    value={formData.sizes[size]}
                    onChange={(e) => handleSizeChange(size, e.target.value)}
                    min="0"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-150"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Image upload field*/}
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Images
            </label>
            <input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFilesChange}
              className="block w-full text-sm text-gray-500
file:mr-4 file:py-2 file:px-4
file:rounded-lg file:border-0
file:text-sm file:font-semibold
file:bg-indigo-50 file:text-indigo-700
hover:file:bg-indigo-100 cursor-pointer transition duration-150"
            />
          </div>

          {formData.images.length > 0 && (
            <div className="flex gap-2 flex-wrap pt-2">
              {formData.images.map((file, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${i + 1}`}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
                />
              ))}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition duration-150 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-5 py-2 rounded-lg text-white transition duration-150 font-medium shadow-md flex items-center justify-center ${
                isSubmitting
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
