import { useNavigate } from "react-router-dom";

const ShoppingCartIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 12.08a2 2 0 0 0 2 1.92h9.24a2 2 0 0 0 2-1.92L23 6H6"></path>
  </svg>
);

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Content start from here */}
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center md:items-start border border-gray-200">
        <div className="flex-shrink-0 mr-6 mb-4 md:mb-0">
          <ShoppingCartIcon className="w-16 h-16 text-gray-500" />
        </div>
        <div className="flex-grow text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 border-b border-gray-200 pb-2">
            Your Shopping Cart is Empty
          </h1>
          <p className="text-gray-500 mb-6 text-lg">
            You have no items in your cart. To buy items, click "Continue
            Shopping" or explore categories.
          </p>

          <button
            onClick={() => navigate("/shop")}
            className="px-6 py-2 bg-yellow-400 text-gray-900 font-bold rounded-lg shadow-md hover:bg-yellow-500 transition duration-150 focus:outline-none focus:ring-4 focus:ring-yellow-300 mr-4"
            aria-label="Continue Shopping"
          >
            Continue Shopping
          </button>

          <button
            className="px-6 py-2 bg-gray-100 text-gray-700 font-bold rounded-lg shadow-md hover:bg-gray-200 transition duration-150 focus:outline-none focus:ring-4 focus:ring-gray-300 mt-2 md:mt-0"
            aria-label="View Saved Items"
          >
            View Saved Items
          </button>

          <p className="mt-6 text-sm text-gray-400">
            Sign in to see items you may have saved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
