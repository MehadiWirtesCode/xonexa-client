import { ShoppingCart, X, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
export const BuyedProductListModal = ({ productModal, setProductModal }) => {
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const user_id = decoded.id;

  const display = productModal ? "flex" : "hidden";

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${import.meta.env.VITE_PRODUCT_URL}/get-buyed-list/${user_id}`)

      .then((res) => {
        setProducts(res.data.rows);
        setLoading(false);
      })

      .catch((err) => {
        setMessage(err.response?.data?.message || err.message);
        console.log(err.response?.data?.message || err.message);
      })

      .finally(() => {
        setLoading(false);
      });
  }, [user_id]);

  const renderProductList = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-10 text-indigo-500">
          <Loader className="w-6 h-6 animate-spin mr-2" />
          <span>Loading Data... </span>
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <ShoppingCart className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <p className="text-lg text-gray-500">{message}</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className="flex items-start justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200"
            >
              <div className="flex min-w-0 justify-between w-full">
                <p className="text-sm font-semibold text-gray-700 truncate">
                 product id: {product.product_id || "Untitled Product "}
                </p>
                <p className="text-sm text-gray-600 mt-0.5">
                  Price : **$
                  {Number(product.price)
                    ? Number(product.price).toFixed(2)
                    : "0.00"}
                  **
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Purchase Quantity: {product.quantity}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      id="productListModal"
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        display ? "backdrop-blur-md bg-black/40" : "hidden"
      } p-4 transition-opacity duration-300`}
      onClick={() => setProductModal(false)}
    >
      {/* Modal Container */}
      <div
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl transform transition-transform duration-300 max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-indigo-100 to-indigo-50 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-indigo-700">
            Your Purchased Product List
          </h2>
          <button
            onClick={() => setProductModal(false)}
            className="text-gray-400 hover:text-gray-700 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50">
          {renderProductList()}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white flex justify-end">
          <button
            onClick={() => setProductModal(false)}
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>

  );
};
