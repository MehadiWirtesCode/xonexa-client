import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { Shirt, Package, Square, Layers, Split, Feather, Dumbbell, Watch, Wallet, ShoppingBag, Eye, Sun, Link, X } from 'lucide-react';


const CATEGORIES = [
  { name: 'tops', slug: 'tops', Icon: Shirt, color: 'bg-red-500' },
  { name: 'jackets', slug: 'jackets', Icon: Package, color: 'bg-blue-500' }, 
  { name: 't-shirts', slug: 't shirts', Icon: Square, color: 'bg-green-500' }, 
  { name: 'sweat wear', slug: 'sweat wear', Icon: Layers, color: 'bg-yellow-500' }, 
  { name: 'pants', slug: 'pants', Icon: Split, color: 'bg-purple-500' }, 
  { name: 'denim', slug: 'denim', Icon: Feather, color: 'bg-indigo-500' },
  { name: 'active wear', slug: 'active wear', Icon: Dumbbell, color: 'bg-pink-500' },
  { name: 'watches', slug: 'watches', Icon: Watch, color: 'bg-cyan-500' },
  { name: 'wallets', slug: 'wallets', Icon: Wallet, color: 'bg-orange-500' },
  { name: 'bags', slug: 'bags', Icon: ShoppingBag, color: 'bg-emerald-500' },
  { name: 'sunglasses', slug: 'sunglass', Icon: Eye, color: 'bg-teal-500' }, 
  { name: 'hats', slug: 'hats', Icon: Sun, color: 'bg-rose-500' }, 
  { name: 'belts', slug: 'belts', Icon: Link, color: 'bg-fuchsia-500' },
];

// Helper component for the navigation simulation (Toast/Notification)
const ToastNotification = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000); // Auto-close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 p-4 pr-10 rounded-lg shadow-xl bg-white border border-gray-100 transform transition-all duration-300 ease-out"
      style={{ animation: 'slideIn 0.3s ease-out forwards' }}
    >
      <style jsx="true">{`
        @keyframes slideIn {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
      <p className="text-gray-800 font-medium">{message}</p>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
};

// Refactored component name from App to FeaturedCategories for better modularity.
export default function FeaturedCategories() {
  const [toast, setToast] = useState({ message: '', show: false });
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {

    navigate(`/shop?category=${category.slug}`);
    setToast({
      message: `Navigating to: ${category.name} page.`,
      show: true,
    });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  return (
    <div className="bg-gray-50 p-4 sm:p-8 font-['Inter']">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 md:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Shop By <span className="text-indigo-600">Featured Categories</span>
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            Explore our curated collection of must-have items.
          </p>
        </header>

        {/* Categories Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 sm:gap-6">
          {CATEGORIES.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryClick(category)}
              className="group flex flex-col items-center justify-center p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out cursor-pointer border border-gray-100 transform active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
              aria-label={`Shop ${category.name}`}
            >
              {/* Icon Container */}
              <div className={`p-3 sm:p-4 rounded-full ${category.color} text-white shadow-md group-hover:shadow-lg transition-all duration-300`}>
                <category.Icon size={28} className="transition-transform group-hover:rotate-6" />
              </div>

              {/* Category Name */}
              <h2 className="mt-4 text-center text-sm sm:text-base font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 truncate w-full">
                {category.name}
              </h2>

            </button>
          ))}
        </div>
      </div>

      <ToastNotification
        message={toast.message}
        show={toast.show}
        onClose={handleCloseToast}
      />
    </div>
  );
}
