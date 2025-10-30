import { useContext } from "react";
import { AllProductDataContext } from "../allProductDataConext/allProductConext";

const ShimmerStyles = () => (
  <style jsx="true">{`
    .shimmer-bg {
      /* Light theme gradient */
      background: linear-gradient(90deg, #e5e7eb 25%, #d1d5db 50%, #e5e7eb 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `}</style>
);


const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 p-4">
      {/* Image Area Placeholder (h-48) */}
      <div className="w-full h-48 rounded-lg shimmer-bg mb-4"></div>

      {/* Text Lines Area */}
      <div className="space-y-3">
        {/* Product Name Line */}
        <div className="h-5 rounded shimmer-bg w-5/6"></div>
        {/* Description Line */}
        <div className="h-5 rounded shimmer-bg w-4/6"></div>

        {/* Price and Button Placeholders */}
        <div className="flex justify-between items-center pt-2">
          {/* Price Line */}
          <div className="h-6 rounded shimmer-bg w-1/4"></div>
          {/* Button Placeholder */}
          <div className="h-10 rounded-full shimmer-bg w-1/3"></div>
        </div>
      </div>
    </div>
  );
};


const ProductGridLoader = ({ itemCount = 8 }) => {
    const {gridLoader} = useContext(AllProductDataContext);
    const display = gridLoader ?"grid":"hidden"

  const loadingItems = Array.from({ length: itemCount });

  return (
    <div className="font-sans">
      {/* Inject custom shimmer styles */}
      <ShimmerStyles />

      {/* Grid Container - 4 column grid (2 columns on mobile) */}
      <div className={`${display} grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6`}>
        {loadingItems.map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductGridLoader;
