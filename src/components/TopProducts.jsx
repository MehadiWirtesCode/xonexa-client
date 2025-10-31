// import { useEffect,useRef, useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { AllProductDataContext } from "./allProductDataConext/allProductConext";
// import NewestProductLoader from "./Loader/NewestProductLoader";

// const ProductCard = ({ product }) => {
//   const navigate = useNavigate();
//   const statusBg =
//     product.stock !== 0
//       ? "bg-green-50 text-green-700 ring-green-600/20"
//       : "bg-red-50 text-red-700 ring-red-600/20";

//   return (
//     <div
//       onClick={() => navigate(`/productdetails/${product.id}`)}
//       className="w-full sm:w-[48%] md:w-[31%] lg:w-[23%] xl:w-[18%] 
//   bg-white rounded-2xl shadow-md hover:shadow-lg 
//   transition-transform duration-300 transform hover:-translate-y-1 
//   cursor-pointer border border-gray-100 hover:border-indigo-300
//   overflow-hidden"
//     >
//       <div className="w-full h-48 overflow-hidden">
//         <img
//           src={`http://localhost:3008${product?.images[0]}`}
//           alt={product?.name}
//           className="w-full h-full object-cover object-center transition duration-300 hover:opacity-90"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = `https://placehold.co/400x300/374151/ffffff?text=Image+Error`;
//           }}
//         />
//       </div>

//       <div className="p-5 flex flex-col flex-grow">
//         <h3 className="text-xl font-bold text-gray-900 mb-3 truncate">
//           {product?.name}
//         </h3>
//         <h3 className="text-sm  text-black mb-3 truncate">
//           <span className="font-bold text-purple-600">category:</span>{" "}
//           {product?.category}
//         </h3>

//         <div className="flex items-end justify-between mt-auto pt-2">
//           <span
//             className={`px-2.5 py-0.5 text-xs font-medium rounded-full ring-1 ${statusBg}`}
//           >
//             {product?.stock === 0 ? "Out of stock" : "Stock In"}
//           </span>

//           <div className="mt-2">
//             {product?.discount > 0 ? (
//               <div className="flex items-center gap-2">
//                 <span className="text-lg font-bold text-gray-900">
//                   ${(product?.price * (1 - product?.discount / 100)).toFixed(2)}
//                 </span>
//                 <span className="text-sm text-red-500 line-through">
//                   ${product?.price.toFixed(2)}
//                 </span>
//               </div>
//             ) : (
//               <span className="text-lg font-bold text-gray-900">
//                 ${product?.price.toFixed(2)}
//               </span>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const TopProducts = () => {
//   const {
//     topProducts,
//     setTopProducts,
//     newestProductLoader,
//     setNewestProductLoader,
//   } = useContext(AllProductDataContext);

//   const scrollRef = useRef(null);

//   useEffect(() => {
//     if (topProducts.length > 0) return;

//     setNewestProductLoader(true);
//     axios
//       .get(`${import.meta.env.VITE_PRODUCT_URL}/get-top-products`)
//       .then((res) => setTopProducts(res.data.topProducts))
//       .catch((err) => console.log(err.response?.data?.message))
//       .finally(() => setNewestProductLoader(false));
//   }, []);

//   // 🖱️ Mouse & touch drag-to-scroll logic
//   useEffect(() => {
//     const scrollContainer = scrollRef.current;
//     let isDown = false;
//     let startX;
//     let scrollLeft;

//     const handleMouseDown = (e) => {
//       isDown = true;
//       scrollContainer.classList.add("cursor-grabbing");
//       startX = e.pageX - scrollContainer.offsetLeft;
//       scrollLeft = scrollContainer.scrollLeft;
//     };
//     const handleMouseLeave = () => {
//       isDown = false;
//       scrollContainer.classList.remove("cursor-grabbing");
//     };
//     const handleMouseUp = () => {
//       isDown = false;
//       scrollContainer.classList.remove("cursor-grabbing");
//     };
//     const handleMouseMove = (e) => {
//       if (!isDown) return;
//       e.preventDefault();
//       const x = e.pageX - scrollContainer.offsetLeft;
//       const walk = (x - startX) * 1.5;
//       scrollContainer.scrollLeft = scrollLeft - walk;
//     };

//     scrollContainer.addEventListener("mousedown", handleMouseDown);
//     scrollContainer.addEventListener("mouseleave", handleMouseLeave);
//     scrollContainer.addEventListener("mouseup", handleMouseUp);
//     scrollContainer.addEventListener("mousemove", handleMouseMove);

//     // Cleanup
//     return () => {
//       scrollContainer.removeEventListener("mousedown", handleMouseDown);
//       scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
//       scrollContainer.removeEventListener("mouseup", handleMouseUp);
//       scrollContainer.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   // Smooth scroll buttons
//   const scrollLeft = () => {
//     scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
//   };
//   const scrollRight = () => {
//     scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
//   };

//   return (
//     <div className="bg-white p-4 sm:p-8 font-[Inter] relative">
//       <div className="max-w-7xl mx-auto py-4">
//         <header className="mb-8 text-left">
               
//           <p className="text-red-600 text-4xl font-bold">Loved By Thousand of Customers !</p>
//           <p className="mt-2 text-base text-gray-500">
//             Explore our latest items.{" "}
//             <span className="text-green-600">(Drag or scroll right)</span>
//           </p>
//         </header>

//         {newestProductLoader ? (
//           <NewestProductLoader />
//         ) : (
//           <div className="relative">
//             {/* Scroll buttons */}
//             <button
//               onClick={scrollLeft}
//               className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center z-10 hover:bg-gray-100 transition"
//             >
//               &#8249;
//             </button>
//             <button
//               onClick={scrollRight}
//               className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center z-10 hover:bg-gray-100 transition"
//             >
//               &#8250;
//             </button>

//             <div
//               ref={scrollRef}
//               className="flex overflow-x-scroll space-x-6 pb-6 pt-2 scrollbar-hide cursor-grab select-none"
//             >
//               {topProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TopProducts;
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
const optimizedImage =
  product?.images?.[0]?.replace("/upload/", "/upload/w_500,q_auto,f_auto/");

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
          src={optimizedImage}
          alt={product?.name}
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-102"
          loading="lazy"
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
          <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ring-1 ${statusBg}`}>
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

// ✅ TopProducts Grid Component (no horizontal scroll)
const TopProducts = () => {
  const { topProducts, setTopProducts, newestProductLoader, setNewestProductLoader } =
    useContext(AllProductDataContext);

  useEffect(() => {
    if (topProducts.length > 0) return;

    setNewestProductLoader(true);
    axios
      .get(`${import.meta.env.VITE_PRODUCT_URL}/get-top-products`)
      .then((res) => setTopProducts(res.data.topProducts))
      .catch((err) => console.log(err.response?.data?.message))
      .finally(() => setNewestProductLoader(false));
  }, []);

  return (
    <div className="bg-white p-4 sm:p-8 font-[Inter] relative">
      <div className="max-w-7xl mx-auto py-4">
        <header className="mb-8 text-left">
          <p className="text-red-600 text-4xl font-bold">
            Loved By Thousands of Customers!
          </p>
          <p className="mt-2 text-base text-gray-500">
            Explore our top products.
          </p>
        </header>

        {newestProductLoader ? (
          <NewestProductLoader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {topProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopProducts;
