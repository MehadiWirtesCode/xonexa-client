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

const Navbar = ({ loginOpen, setLoginOpen, signupOpen, setSignupOpen }) => {

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


 // Total cart item shows 
useEffect(()=>{
     const token = localStorage.getItem('token')
    const decoded = jwtDecode(token);
    const user_id = decoded.id;
    console.log(`userId `,user_id);
  
  if(localStorage.getItem("token")){
   axios.get(`${import.meta.env.VITE_PRODUCT_URL}/gettotalcartcount`,{
        params:{
      user_id:user_id}
    }

    )
   .then(res =>{
      setTotalCartItem(res.data?.count)
      console.log(res.data?.message)
   })
   .catch(err =>{
    console.log(err.response?.data?.message);
   })}

   else{
    const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalQty = localCart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalCartItem(totalQty);
    console.log("Total cart quantity loaded from localStorage");
   }
},[setTotalCartItem])
  

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between md:h-16 py-2 md:py-0 items-center">
        
          {/* Logo */}
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

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-8 items-center">

           {/* Profile */}
            <button    
              onClick={(e) => {
                e.preventDefault(); 
                const token = localStorage.getItem("token");
                if (token) {     
                 
                  if(localStorage.getItem("role")=== "1"){
                      navigate(`/admindashboard`);
                  }
                  else{
                    navigate(`/userdashboard`);
                  }

                }
                 else {
                  setLoginOpen(true);
                }
                setMobileMenuOpen(false); 
              }}
              
             className={`${
                 isProfileActive ? "text-blue-600 underline" : "text-gray-700"
               } hover:text-indigo-600`}
            >
              Profile
            </button> {/* Profile */}

            <NavLink
              to="/shop"
              className="text-gray-700 hover:text-indigo-600 active:bg-indigo-7"
            >
              Shop
            </NavLink>

            <NavLink
              to="/contactus"
              className="text-gray-700 hover:text-indigo-600 active:bg-indigo-7"
            >
              Contact
            </NavLink>

            <NavLink
              to="/"

             className={({ isActive }) =>
                isActive
                  ? "text-blue-600 underline hover:text-indigo-600 active:bg-indigo-7"
                  : "text-gray-700 hover:text-indigo-600 active:bg-indigo-7"
              }
            >
              Home
            </NavLink>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
           {
            searchBar && (
            <div className="relative">
              <input onChange={(e) => setSearchTerm(e.target.value)}
               value={searchTerm}
                type="text"
                placeholder="Search..."
                className="w-full pl-3 pr-10 py-2 border rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <CiSearch
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                size={20}
              />
            </div>
            )
           }

            {/* Sign in / Account */}
            <button
              onClick={() => setLoginOpen(!loginOpen)}
              className="hidden lg:inline-block px-2 py-2 text-md font-medium text-gray-700 rounded hover:bg-gray-300"
            >
              Sign in
            </button>

            <span className="hidden lg:block">|</span>
            <button
              onClick={() => setSignupOpen(!signupOpen)}
              className="hidden lg:inline-block px-2 py-2 text-md font-medium  text-gray-700 rounded hover:bg-gray-300"
            >
              Sign up
            </button>

            {/* Cart */}
            <NavLink
              to="/cart"
              className="relative text-gray-500 hover:text-gray-700"
            >
              <IoCartOutline className="text-3xl" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs px-1">
                {totalCartItem === null ? "-" : totalCartItem}

              </span>
            </NavLink>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700"
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
        </div>
      </div>

      {/* Mobile Menu Drawer */}
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
                to="/contact"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-indigo-600 active:bg-indigo-7"
              >
                Contact
              </NavLink>

              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-indigo-600 active:bg-indigo-7"
              >
                Home
              </NavLink>

           {/* Profile */}
            <button    
              onClick={(e) => {
                e.preventDefault(); 
                const token = localStorage.getItem("token");
                if (token) {     
                 
                  if(localStorage.getItem("role")==="1"){
                      navigate("/admindashboard");
                  }
                  else{
                    navigate("/userdashboard");
                  }

                }
                 else {
                  setLoginOpen(true);
                }
                setMobileMenuOpen(false); 
              }}
              
             className="text-gray-700 hover:text-indigo-600 active:bg-indigo-7 bg-gray-300 rounded-md px-2 py-1 flex justify-center items-center"
            >
              Profile
            </button> {/* Profile */}

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

              <button onClick={() =>{
                  setLogoutModal(true);
              }}  
               className="mt-5 py-2  text-gray-800 rounded border-[1px] border-gray-200 hover:bg-gray-400 active:bg-indigo-7 flex justify-center items-center">
                <CiLogout className="mr-1 text-3xl" /> Log out
              </button>
            </nav>
          </div>
        </div>
      )}
      <hr />
       {logoutModal && <LogoutModal logoutModal={logoutModal} setLogoutModal={setLogoutModal}/>}
      
    </header>
  );
};

export default Navbar;

