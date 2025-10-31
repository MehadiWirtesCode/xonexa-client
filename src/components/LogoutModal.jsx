import { LogOut, X } from 'lucide-react';
import {useNavigate} from 'react-router-dom'
const LogoutModal = ({logoutModal,setLogoutModal,setIsLoggedIn}) => {
  const navigate=useNavigate();
  const display = logoutModal ? "flex": "hidden";

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogoutModal(false);
    setIsLoggedIn(false)
    navigate("/");
  };

  return (
    // Modal Overlay (Semi-transparent background, covers entire screen)
    <div
      className={`${display} fixed inset-0 z-50 items-center justify-center  bg-opacity-70 transition-opacity duration-300 backdrop-blur-sm`}
      aria-modal="true"
      role="dialog"
      aria-labelledby="logout-title"
    >
      {/* Modal Card */}
      <div className="bg-white  relative rounded-xl shadow-2xl max-w-lg w-[90%] md:w-full transform transition-all duration-300 ease-out p-6 md:p-8 animate-fade-in border border-red-200 ">
        
        {/* Close Button */}
        <button
          onClick={() =>setLogoutModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500  transition-colors rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Header/Icon Section */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 p-4 bg-red-100  rounded-full text-red-600  shadow-md">
            <LogOut size={36} />
          </div>
          <h2 id="logout-title" className="text-2xl font-extrabold text-gray-900  mb-2">
            Confirm Logout
          </h2>
          <p className="text-gray-600  mb-8 leading-relaxed">
            Are you sure you want to log out of your account? For your security, you will need to sign in again.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => setLogoutModal(false)}
            className="w-full py-3 px-4 text-sm font-semibold rounded-lg border border-gray-300  bg-white  text-gray-700  hover:bg-gray-100  transition-all shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-3 px-4 text-sm font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Confirm Logout
          </button>
        </div>
      </div>
      
      {/* Animation Styles */}
      <style jsx="true">{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default LogoutModal; 
