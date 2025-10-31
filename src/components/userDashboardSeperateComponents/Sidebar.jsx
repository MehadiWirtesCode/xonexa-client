import { useState } from "react";
import LogoutModal from "../LogoutModal";
import {Icons} from "./Icons"; 
import {jwtDecode} from 'jwt-decode'
import { CiLogout } from "react-icons/ci";
import { BuyedProductListModal } from "./BuyedProductList";
import { AnalyticsModal } from "./AanlyticsModal";
import { SettingsModal } from "./SettingsModal";
import { useNavigate } from "react-router-dom";
// Navigation links array for clean rendering
const navLinks = ["Dashboard", "Orders", "Analytics", "Settings"];


const Sidebar = ({ isMenuOpen, toggleMenu ,setIsLoggedIn}) => {

  const navigate = useNavigate();
  const [logoutModal,setLogoutModal] = useState(false);
  const token = localStorage.getItem("token")
  const decoded = jwtDecode(token);
  const user_id = decoded.id;
  const [productModal,setProductModal]= useState(false);
  const [analyticsModal,setAnalyticsModal] = useState(false)
  const [settingsModal,setSettingsModal] = useState(false);

  const handleSidebarLinks = (item) =>{
     if(item == "Orders"){
       setProductModal(true);
     }

     else if(item == "Analytics"){
      setAnalyticsModal(true);
     }

     else if( item =="Settings"){
      setSettingsModal(true)
     }
  }
  return (
  <>
    {/* Overlay for mobile view (fixed and dark background) */}
    {isMenuOpen && (
      <div
        className="fixed inset-0  z-40 md:hidden"
        onClick={toggleMenu}
        aria-label="Close sidebar"
      ></div>
    )}

    {/* Sidebar Content - Fixed width, background */}
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-white text-white p-6 shadow-2xl z-50 
        transform transition-transform duration-300 ease-in-out 
        ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:h-auto md:shadow-none`}
    >
      <div className="flex justify-between items-center mb-10">
        {/* Logo is highlighted with the vibrant orange accent */}
        <h1 className="text-3xl font-extrabold text-orange-500">XoxUsers</h1>
        <button
          onClick={toggleMenu}
          className="p-1 md:hidden text-gray-300 hover:text-white"
          aria-label="Close menu"
        >
          <Icons.X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-2">
        {navLinks.map((item) => {

          const iconKey = item === "Orders" ? "Package" : item.split(" ")[0];
          const IconComponent = Icons[iconKey] || Icons.Home; 
          const isActive = item === "Dashboard"; // Assuming Dashboard is the active page

          return (
            <a
              onClick={()=>handleSidebarLinks(item)}
              key={item}
              href="#"
              className={`flex items-center space-x-3 p-3 rounded-xl font-medium transition duration-200 
                ${
                  isActive
                    ? " text-orange-500 shadow-lg"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <IconComponent className="w-5 h-5" strokeWidth="2.5" />
              <span>{item}</span>
            </a>
          );
        })}
      </nav>

    <div className="text-white bg-red-500 text-center flex items-center justify-center mt-6 rounded-lg hover:bg-red-600 transition duration-200">
      <CiLogout className="text-2xl"/>
      <button onClick={() => setLogoutModal(true) } className="p-2">Logout</button>
        
    </div>
      {/* Profile/User Section at the bottom of the sidebar */}
      <div className="absolute bottom-6 left-6 right-6 pt-4 border-t border-gray-800">
        <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-xl">
          <img
            className="w-10 h-10 rounded-full object-cover border-2 border-orange-500 p-0.5"
            src={`https://placehold.co/100x100/1f2937/f97316?text=${user_id}`}
            alt="User Avatar"
          />
          <div>
            <p className="text-sm text-slate-700 font-semibold">Users</p>
            <p className="text-sm font-semibold text-slate-700">user_id : <span className="text-purple-800">{user_id}</span></p>
          </div>
        </div>
      </div>
    </aside>

         {logoutModal && (
        <LogoutModal
          logoutModal={logoutModal}
          setLogoutModal={setLogoutModal}
          setIsLoggedIn={setIsLoggedIn}
          navigate={navigate}
        />
      )}

      {
        productModal && (
          <BuyedProductListModal productModal={productModal} setProductModal={setProductModal}/>
        )
      }

      {
        analyticsModal && (
          <AnalyticsModal analyticsModal={analyticsModal} setAnalyticsModal={setAnalyticsModal} userId={user_id}/>
        )

      }

      {
        settingsModal && (
          <SettingsModal settingsModal={settingsModal} setSettingsModal={setSettingsModal}/>
        )
      }
  </>)
}

export default Sidebar;