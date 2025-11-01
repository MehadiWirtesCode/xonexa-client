import { useEffect, useState } from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from 'react-hot-toast'
// ✅ Single Wishlist Item Component
const WishlistItem = ({ item, onRemove }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
      {/* Product Image and Info */}
      <div className="flex flex-grow items-center mb-4 sm:mb-0">
        <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
          <img
            src={item.imageurl || item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/100x100/d1d5db/4b5563?text=N%2FA";
            }}
          />
        </div>

        {/* Text Details */}
        <div className="ml-4 flex-1 min-w-0">
          <p className="text-lg font-semibold text-gray-800 truncate">
            {item.name}
          </p>
          <p className="text-2xl font-bold text-indigo-600 mt-1">
            ${item.price?.toFixed(2) || "0.00"}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <button
          onClick={() => toast.error(`Sorry this service not available now .I am still working on it`)}
          className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition duration-150 w-full sm:w-auto"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Move to Cart
        </button>
        <button
          onClick={() => onRemove(item.id)}
          className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium border border-red-400 text-red-600 hover:bg-red-50 transition duration-150 w-full sm:w-auto"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Remove
        </button>
      </div>
    </div>
  );
};

// ✅ Wishlist List Component
const WishlistList = ({ wishlist, onRemove }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {wishlist.length > 0 ? (
        wishlist.map((item) => (
          <WishlistItem
            key={item.id}
            item={item}
            onRemove={onRemove}
          //  onMoveToCart={onMoveToCart}
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

// ✅ Main Wishlist Page Component
const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      const user_id = decoded.id;

      if (!user_id) {
        console.log("No user Id found");
        return;
      }

      axios
        .get(`${import.meta.env.VITE_PRODUCT_URL}/get-wishlist-items`, {
          params: { user_id },
        })
        .then((res) => {
          setWishlist(res.data.items || []);
        })
        .catch((err) => {
          console.error("Error fetching wishlist:", err);
        });
    } else {
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(storedWishlist);
    }
  }, []);

  //  Remove Wishlist Item
  const handleRemoveItem = (id) => {
    const item = wishlist.find((i) => i.id === id);
    setWishlist(wishlist.filter((i) => i.id !== id));
    setMessage(`${item?.name || "Item"} removed from wishlist.`);
    setTimeout(() => setMessage(""), 3000);
  };

//   //  Move Item to Cart
//   const handleMoveToCart = (id) => {
//     const item = wishlist.find((i) => i.id === id);
//     if (!item) return;

//     setWishlist(wishlist.filter((i) => i.id !== id));
//     setMessage(`${item.name} moved to your cart!`);
//     setTimeout(() => setMessage(""), 3000);
//   };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-['Inter']">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
          <Heart className="w-8 h-8 text-pink-500 mr-3 fill-pink-500" />
          Your Product Wishlist
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          {wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved for
          later.
        </p>
      </div>

      {/* Message Box */}
      {message && (
        <div className="max-w-4xl mx-auto mb-6 p-3 bg-indigo-500 text-white rounded-lg shadow-lg text-center font-medium transition-opacity duration-300 opacity-100">
          {message}
        </div>
      )}

      {/* Wishlist List */}
      <WishlistList
        wishlist={wishlist}
        onRemove={handleRemoveItem}
      //  onMoveToCart={handleMoveToCart}
      />

      {/* Footer */}
      {wishlist.length > 0 && (
        <div className="max-w-4xl mx-auto mt-8 pt-4 border-t border-gray-200 text-right">
          <p className="text-gray-500 text-sm">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
