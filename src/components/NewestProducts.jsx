import { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AllProductDataContext } from "./allProductDataConext/allProductConext";
import NewestProductLoader from "./Loader/NewestProductLoader";

// ✅ Individual Product Card
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const statusBg =
    product.stock !== 0
      ? "bg-green-50 text-green-700 ring-green-600/20"
      : "bg-red-50 text-red-700 ring-red-600/20";

  return (
    <div
      onClick={() => navigate(`/productdetails/${product.id}`)}
  className="bg-white rounded-xl shadow-sm 
             transition-transform duration-200 transform hover:scale-102
             cursor-pointer border border-gray-100 hover:border-indigo-300
             overflow-hidden will-change-transform"
>
  
      <div className="w-full h-48 sm:h-52 md:h-56 overflow-hidden">
        <img
          src={product?.images[0]}
          alt={product?.name}
          className="w-full h-full object-cover object-center transition-all duration-200"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/400x300/374151/ffffff?text=Image+Error`;
          }}
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-3 truncate">
          {product?.name}
        </h3>
        <h3 className="text-sm text-black mb-3 truncate">
          <span className="font-bold text-purple-600">Category:</span>{" "}
          {product?.category}
        </h3>

        <div className="flex items-end justify-between mt-auto pt-2">
          <span
            className={`px-2.5 py-0.5 text-xs font-medium rounded-full ring-1 ${statusBg}`}
          >
            {product?.stock === 0 ? "Out of stock" : "Stock In"}
          </span>

          <div className="mt-2">
            {product?.discount > 0 ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">
                  ${(product?.price * (1 - product?.discount / 100)).toFixed(2)}
                </span>
                <span className="text-sm text-red-500 line-through">
                  ${product?.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                ${product?.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ NewestProducts Grid Component
const NewestProducts = () => {
  const {
    newestProducts,
    setNewestProducts,
    newestProductLoader,
    setNewestProductLoader,
  } = useContext(AllProductDataContext);

  useEffect(() => {
    if (newestProducts.length > 0) return;

    setNewestProductLoader(true);
    axios
      .get(`${import.meta.env.VITE_PRODUCT_URL}/getnewestproducts`)
      .then((res) => setNewestProducts(res.data.newestProduct))
      .catch((err) => console.log(err.response?.data?.message))
      .finally(() => setNewestProductLoader(false));
  }, []);

  return (
    <div className="bg-white p-4 sm:p-8 font-[Inter] relative">
      <div className="max-w-7xl mx-auto py-4">
        <header className="mb-8 text-left">
          <p className="text-4xl text-green-600 font-bold">
            Explore our Newest Products
          </p>
          <p className="mt-2 text-base text-gray-500">
            Check out the latest items.
          </p>
        </header>

        {newestProductLoader ? (
          <NewestProductLoader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {newestProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewestProducts;


