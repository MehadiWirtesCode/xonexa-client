import { IoCartOutline } from "react-icons/io5";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { CiSearch, CiLogout } from "react-icons/ci";
import { useContext, useEffect, useState } from "react";
import LogoutModal from "./LogoutModal";
import axios from 'axios'
import { useRef } from "react";
import { AllProductDataContext } from "./allProductDataConext/allProductConext";
import { CartDataContext } from "./allProductDataConext/cartDataContext";
import {jwtDecode} from 'jwt-decode'
import { CiHeart } from "react-icons/ci";

const Navbar = ({ loginOpen,setLoginOpen,signupOpen,setSignupOpen,setIsLoggedIn,isLoggedIn}) => {

    const navigate = useNavigate();

  const {setProducts} = useContext(AllProductDataContext);
  const {totalCartItem,setTotalCartItem}= useContext(CartDataContext);
   //Seacrh Logic 
  const [searchTerm,setSearchTerm] = useState("");
  const [results,setResults] = useState([]);
  
  const debouncerTimer = useRef (null);
  const location = useLocation();

  const searchBar = location.pathname === "/shop"

  const [logoutModal,setLogoutModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isProfileActive = 
    location.pathname === "/userdashboard" || location.pathname === "/admindashboard";

  const mobileLoginToogle = () => {
    setLoginOpen(true);
    setMobileMenuOpen(false);
  };

  const mobileSignupToogle = () => {
    setSignupOpen(true);
    setMobileMenuOpen(false);
  };


 useEffect(() => {
    if (!searchTerm) {
        setResults([]);
      return
    } 

    debouncerTimer.current = setTimeout(async () => {
      try {

        const res = await axios.get(`${import.meta.env.VITE_PRODUCT_URL}/search?text=${searchTerm}`);
        setResults(res.data?.searchItems || []);
        setProducts(res.data?.searchItems);

      } catch (err) {
        console.error(err);
      }
    }, 500);
  return () => clearTimeout(debouncerTimer.current);

  }, [searchTerm]);


 //Total cart item shows 
useEffect(() => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const user_id = decoded.id;
      
      console.log(`✅ Logged in userId:`, user_id); 

      if (!user_id) {
          throw new Error("User ID could not be extracted from token.");
      }

      axios.get(`${import.meta.env.VITE_PRODUCT_URL}/gettotalcartcount`, {
        params: { user_id }
      })
      .then(res => {
        setTotalCartItem(Number(res.data?.count) || 0);
        console.log(res.data?.message);
      })
      .catch(err => {

        console.error("❌ Cart API Error:", err.response?.data?.message || err.message);
      });

    } catch (err) {

      console.error("❌ Invalid token detected or ID missing. Logging out...", err);

      localStorage.removeItem("token");
      localStorage.removeItem("role"); 
      

      if (typeof setIsLoggedIn === 'function') {
         setIsLoggedIn(false); 
      }
      
      setTotalCartItem(0); 
    }
  } else {

    const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalQty = localCart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalCartItem(totalQty);
    console.log("Total cart quantity loaded from localStorage");
  }
}, [setTotalCartItem,isLoggedIn]);

  return (
<header className="bg-white shadow sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Main Container: flex-wrap mobile */}
    <div className="flex flex-wrap justify-between items-center md:h-16 py-2 md:py-0">

      {/* 1. Logo (Start) */}
      <div className="flex justify-center items-center gap-2">
        <img
          src="/images/logo.png"
          alt=""
          className="flex justify-center items-center h-10 w-auto rounded-full"
        />
        <a href="/" className="text-2xl font-bold text-sky-600">
          <span className="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 drop-shadow-lg transition-transform duration-300">
            Xonexa
          </span>
        </a>
      </div>
      
      {/* 2. Desktop Menu */}
      <div className="hidden lg:flex space-x-10 items-center mx-auto"> 
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 underline underline-offset-4 hover:text-indigo-600 font-semibold transition duration-200"
              : "text-gray-700 hover:text-indigo-600 font-medium transition duration-200"
          }
        >
          Home
        </NavLink>

        {/* Shop */}
        <NavLink
          to="/shop"
          className="text-gray-700 hover:text-indigo-600 font-medium transition duration-200"
        >
          Shop
        </NavLink>

        {/* Contact */}
        <NavLink
          to="/contactus"
          className="text-gray-700 hover:text-indigo-600 font-medium transition duration-200"
        >
          Contact
        </NavLink>

        {/* Profile */}
        <button
          onClick={(e) => {
            e.preventDefault();
            const token = localStorage.getItem("token");
            if (token) {
              if (localStorage.getItem("role") === "1") {
                navigate(`/admindashboard`);
              } else {
                navigate(`/userdashboard`);
              }
            } else {
              setLoginOpen(true);
            }
            setMobileMenuOpen(false);
          }}
          className={`${
            isProfileActive ? "text-blue-600 underline underline-offset-4 font-semibold" : "text-gray-700 font-medium"
          } hover:text-indigo-600 transition duration-200`}
        >
          Profile
        </button>
      </div>

      {/* 3. Right Section */}
      <div className="flex items-center space-x-4 order-1 md:order-2"> 
        
        {/* Search Bar  */}
        {searchBar && (
            <div className="hidden lg:block relative">
            <input onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              type="text"
              placeholder="Search..."
              className="w-48 pl-3 pr-10 py-2 border border-gray-300 rounded-full text-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
            <CiSearch
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              size={20}
            />
          </div>
        )}


        {/* Wishlist Icon */}
        <NavLink
          to="/wishlist"
        >
            <CiHeart className="hidden md:flex text-3xl text-red-500 stroke-[1px] hover:text-red-600 transition duration-150" />
        </NavLink>
        
        {/* Cart Icon */}
        <NavLink
          to="/cart"
          className="relative text-gray-500 hover:text-gray-700 transition duration-150"
        >
          <IoCartOutline className="text-3xl" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs px-1 min-w-[18px] text-center">
            {totalCartItem === null ? "-" : totalCartItem}
          </span>
        </NavLink>
        
        {/* Desktop Sign In/Up Buttons */}
        <div className="hidden lg:flex items-center space-x-2 border-l border-gray-200 pl-4">
            <button
                onClick={() => setLoginOpen(!loginOpen)}
                className="px-4 py-1.5 text-sm font-semibold text-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-50 transition duration-200"
            >
                Sign in
            </button>

            <button
                onClick={() => setSignupOpen(!signupOpen)}
                className="px-4 py-1.5 text-sm font-semibold bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-200"
            >
                Sign up
            </button>
        </div>

        {/* Mobile Menu Button*/}
        <button
          className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Search Bar - Mobile e full width, Right Section er niche asbe */}
      {searchBar && (
        <div className="w-full mt-2 lg:hidden order-3">
          <div className="relative">
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              type="text"
              placeholder="Search..."
              className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <CiSearch
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              size={20}
            />
          </div>
        </div>
      )}
      
    </div>
  </div>

  {/* Mobile Menu Drawer (Kono change kora hoyni) */}
  {mobileMenuOpen && (
    <div className="lg:hidden fixed inset-0 z-50 bg-black/25">
      <div className="absolute top-0 right-0 w-64 bg-white h-full shadow-lg p-4 flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="self-end p-2 text-gray-500 hover:text-gray-700"
        >
          X
        </button>
        <nav className="mt-4 flex flex-col space-y-3">
          <a
            href="/about-us"
            className="text-gray-700 hover:text-indigo-600 active:bg-indigo-7"
          >
            About us
          </a>
          <a
            href="/shop"
            className="text-gray-700 hover:text-indigo-600 active:bg-indigo-7"
          >
            Shop
          </a>
          <NavLink
            to="/contactus"
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-700 hover:text-indigo-600 active:bg-indigo-7"
          >
            Contact
          </NavLink>

          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-700 hover:text-indigo-600 active:bg-indigo-7"
          >
            Home
          </NavLink>

          <NavLink
            to="/wishlist"
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-700 hover:text-indigo-600 active:bg-indigo-7"
          >
            Wishlist
          </NavLink>

          {/* Profile */}
          <button
            onClick={(e) => {
              e.preventDefault();
              const token = localStorage.getItem("token");
              if (token) {
                if (localStorage.getItem("role") === "1") {
                  navigate("/admindashboard");
                } else {
                  navigate("/userdashboard");
                }
              } else {
                setLoginOpen(true);
              }
              setMobileMenuOpen(false);
            }}
            className="text-gray-700 hover:text-indigo-600 active:bg-indigo-7 bg-gray-300 rounded-md px-2 py-1 flex justify-center items-center"
          >
            Profile
          </button>

          <button
            onClick={mobileLoginToogle}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 active:bg-indigo-700"
          >
            Sign in
          </button>

          <button
            onClick={mobileSignupToogle}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 active:bg-indigo-7"
          >
            Sign up
          </button>

          <button
            onClick={() => {
              setLogoutModal(true);
            }}
            className="mt-5 py-2 text-gray-800 rounded border-[1px] border-gray-200 hover:bg-gray-400 active:bg-indigo-7 flex justify-center items-center"
          >
            <CiLogout className="mr-1 text-3xl" /> Log out
          </button>
        </nav>
      </div>
    </div>
  )}
  <hr />
  {logoutModal && <LogoutModal logoutModal={logoutModal} setLogoutModal={setLogoutModal} />}
</header>
  );
};

export default Navbar;

