import { useState } from 'react';
import { Heart, ShoppingCart, Trash2, Zap, AlertTriangle } from 'lucide-react';

// --- CORE COMPONENT: WishlistItem (For single product display) ---
const WishlistItem = (item) => {


  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">

      {/* Product Image and Info */}
      <div className="flex flex-grow items-center mb-4 sm:mb-0">
        <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/d1d5db/4b5563?text=N%2FA"; }}
          />
        </div>

        {/* Text Details */}
        <div className="ml-4 flex-1 min-w-0">
          <p className="text-lg font-semibold text-gray-800 truncate">{item.name}</p>
          <p className="text-2xl font-bold text-indigo-600 mt-1">${item.price.toFixed(2)}</p>
          <div className={`mt-2 inline-flex items-center text-xs font-medium px-3 py-1 rounded-full ${statusClasses}`}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {item.status}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <button

          className={`
            flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition duration-150 w-full sm:w-auto

          `}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {/* {isSoldOut ? 'Out of Stock' : 'Move to Cart'} */}
        </button>
        <button
         
          className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium border border-red-400 text-red-600 hover:bg-red-50 transition duration-150 w-full sm:w-auto"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};


export const WishlistList = () => {
    const [wishlist,setWishlist] = useState([]);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {wishlist.length > 0 ? (
        wishlist.map(item => (
          <WishlistItem
            key={item.id}
            item={item}
          />
        ))
      ) : (
        <div className="p-10 bg-white rounded-xl shadow-lg text-center text-gray-500">
          <Heart className="w-12 h-12 mx-auto text-pink-300 mb-3" />
          <p className="text-xl font-semibold">Your Wishlist is Empty!</p>
          <p className="mt-1">Start adding products you love.</p>
        </div>
      )}
    </div>
  );
};

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState(initialWishlistItems);
  const [message, setMessage] = useState('');

  const handleRemoveItem = (id) => {
    const item = wishlist.find(i => i.id === id);
    setWishlist(wishlist.filter(item => item.id !== id));
    setMessage(`${item?.name || 'Item'} successfully removed from the wishlist.`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleMoveToCart = (id) => {
    const item = wishlist.find(i => i.id === id);
    if (item && item.status !== 'Sold Out') {
     
      setWishlist(wishlist.filter(i => i.id !== id));
      setMessage(`${item.name} moved to your shopping cart!`);
    } else {
      setMessage(`Sorry, ${item.name} cannot be moved. It is out of stock.`);
    }
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-['Inter']">
      {/* Tailwind and Viewport setup */}
      <script src="https://cdn.tailwindcss.com"></script>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
          <Heart className="w-8 h-8 text-pink-500 mr-3 fill-pink-500" />
          Your Product Wishlist
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved for later.
        </p>
      </div>

      {/* Confirmation Message Box */}
      {message && (
        <div className="max-w-4xl mx-auto mb-6 p-3 bg-indigo-500 text-white rounded-lg shadow-lg text-center font-medium transition-opacity duration-300 opacity-100">
          {message}
        </div>
      )}

      {/* Wishlist List */}
      <WishlistList
        wishlist={wishlist}
        onRemove={handleRemoveItem}
        onMoveToCart={handleMoveToCart}
      />

      {/* Optional Footer/Summary */}
      {wishlist.length > 0 && (
        <div className="max-w-4xl mx-auto mt-8 pt-4 border-t border-gray-200 text-right">
          <p className="text-gray-500 text-sm">Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
};

export default WishlistPage; 
