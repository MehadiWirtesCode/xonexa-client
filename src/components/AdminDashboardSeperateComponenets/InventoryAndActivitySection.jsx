import { useEffect, useState } from "react";
import { Zap, ShoppingCart, DollarSign, Users, BarChart3 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const InventoryAndActivitySection = () => {
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loadingStock, setLoadingStock] = useState(true);

  useEffect(() => {
    setLoadingStock(true);
    axios
      .get(`${import.meta.env.VITE_PRODUCT_URL}/get-outofstock-products`)
      .then((res) => {
        setOutOfStockProducts(res.data.products);
        setLoadingStock(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Error fetching data");
        setLoadingStock(false);
      });
  }, []);

  // recent orders activity
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_PRODUCT_URL}/get-recent-orders`)
      .then((res) => {
        setActivity(res.data.activity);
      })
      .catch((err) => {
        console.log(err.response?.data?.message);
      });
  }, []);

  // handleStatusChange
  const handleStatusChange = (order_id) => {
    axios
      .patch(`${import.meta.env.VITE_PRODUCT_URL}/change-status`, {
        order_id,
      })
      .then((res) => {
        toast.success(res.data.message);
        setActivity((prev) =>
          prev.filter((order) => order.order_id !== order_id)
        );
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Error updating status");
      });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Out of Stock Products List */}
      <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold mb-5 text-red-600 flex items-center">
          <Zap size={20} className="mr-2 fill-red-400 text-red-600" />
          Stock Alert (Out of Stock)
        </h3>

        {loadingStock ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <ul className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {outOfStockProducts.map((product) => (
              <li
                key={product._id}
                className="flex flex-col p-3 bg-red-50 rounded-lg border border-red-200 hover:shadow-sm transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-red-500 mr-3 shrink-0"></span>
                    <p className="text-gray-800 font-medium text-sm truncate max-w-[120px]">
                      {product.name}
                    </p>
                    <p className="text-green-600 ml-3 font-bold">
                      ({product?.category})
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-red-600">Stock: 0</p>
                  </div>
                </div>

                {product.zeroSizes &&
                  Object.keys(product.zeroSizes).length > 0 && (
                    <div className="flex flex-wrap gap-2 text-xs text-red-700">
                      {Object.keys(product.zeroSizes).map((size) => (
                        <span
                          key={size}
                          className="px-2 py-1 bg-red-100 rounded-full font-semibold"
                        >
                          {size} out of stock
                        </span>
                      ))}
                    </div>
                  )}
              </li>
            ))}

            {outOfStockProducts.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No critical stock alerts!
              </p>
            )}
          </ul>
        )}
      </div>

      {/* Recent orders section start here */}
      <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-5">Recent Orders</h3>

        {activity.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border border-gray-100 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-4 py-3">User ID</th>
                  <th className="px-4 py-3">Created At</th>
                  <th className="px-4 py-3 text-center">Total ($)</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {activity.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {item.user_id}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {item.created_at}
                    </td>
                    <td className="px-4 py-3 text-center font-semibold text-gray-800">
                      {item.total !== "N/A" ? `$${item.total}` : "--"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          item.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : item.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {item.status === "pending" ? (
                        <button
                          onClick={() => handleStatusChange(item.order_id)}
                          className="px-3 py-1 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                        >
                          Accept
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No recent orders!</p>
        )}
      </div>
    </div>
  );
};

export default InventoryAndActivitySection;
