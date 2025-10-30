import { useContext } from "react";
import { AllProductDataContext } from "../allProductDataConext/allProductConext";

const ShimmerStyles = () => (
    
    <style dangerouslySetInnerHTML={{__html: `
        /* Shimmer animation definition: gradient-ke element-er upor diye soraye */
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        .shimmer-bg {
            /* Light theme gradient: upor theke shiny effect-er jonno adjust kora hoyeche */
            background: linear-gradient(90deg, #e5e7eb 25%, #d1d5db 50%, #e5e7eb 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
        }
        /* Jodi onno kono pulse animation thake, sheta off kore dewa holo */
        .animate-pulse {
            animation: none;
        }
        /* Simple utility for hiding scrollbar in modern browsers */
        .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none; /* Chrome, Safari and Opera */
        }
    `}} />
);

const ProductSkeletonCard = () => (
    // Card Container. Horizontal scroll-er jonno 'flex-none w-72' jog kora holo.
    <div className="flex-none w-72 bg-white rounded-xl shadow-lg ring-1 ring-gray-50 overflow-hidden border border-gray-100 flex flex-col cursor-wait p-4 transition-all duration-300">
        
        {/* Image Area Placeholder (h-48) - shimmer-bg class byabohar kora hoyeche */}
        <div className="w-full h-48 shimmer-bg rounded-lg mb-4"></div>

        <div className="p-1 flex flex-col flex-grow">
            {/* Title Skeleton */}
            <div className="h-6 rounded shimmer-bg w-5/6 mb-3"></div>
            {/* Category Skeleton */}
            <div className="h-4 rounded shimmer-bg w-1/2 mb-5"></div>

            <div className="flex items-end justify-between mt-auto pt-2">
                {/* Status/Badge Skeleton */}
                <div className="h-5 rounded-full shimmer-bg w-1/4"></div>
                
                {/* Price Skeleton */}
                <div className="h-6 rounded shimmer-bg w-1/4"></div>
            </div>
        </div>
    </div>
);



const NewestProductLoader = ({ itemCount = 8 }) => { 
   
    const {newestProductLoader} = useContext(AllProductDataContext);
    const display = newestProductLoader ? "flex" : "hidden"

  const loadingItems = Array.from({ length: itemCount });

  return (
    <div className="font-sans">
      
      <ShimmerStyles /> 

      <div className={`${display} overflow-x-scroll space-x-6 pb-6 pt-2 max-w-7xl mx-auto scrollbar-hide`}>
        
        {loadingItems.map((_, index) => (
          <ProductSkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default NewestProductLoader;
