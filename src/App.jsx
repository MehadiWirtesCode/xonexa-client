import {useState } from "react";
import { AlertModal } from "./components/AlertModal";
import { Login } from "./components/Login";
import Navbar from "./components/Navbar";
import { Signup } from "./components/Signup";
import Home from "./pages/Home";
import UserDashboard from "./pages/UserDashboard";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import { Footer } from "./pages/Footer";
import { Shop } from "./pages/Shop";
import { ProductDetails } from "./components/ProductDetails";
import { Cart } from "./components/Cart/Cart";
import Checkout from "./pages/Checkout";
import { Toaster } from "react-hot-toast";
import ContactUs from "./pages/ContactUs";
import AboutUsPage from "./components/FooterComponenet/Aboutus";
import FeaturesPage from "./components/FooterComponenet/FeaturesPage";



const App =() =>{ 
    const [alert,setAlert] = useState(false);
    const [message,setMessage] = useState("");
    const [loginOpen,setLoginOpen] = useState(false);
    const [signupOpen,setSignupOpen] = useState(false);

    const isLoggedIn = !!localStorage.getItem("token");

    return (
      <>
         <Navbar loginOpen={loginOpen} setLoginOpen={setLoginOpen} signupOpen={signupOpen} setSignupOpen={setSignupOpen} />
         <Login loginOpen={loginOpen} setLoginOpen={setLoginOpen} setSignupOpen={setSignupOpen} setAlert={setAlert} setMessage={setMessage}/>
         <Signup signupOpen={signupOpen} setSignupOpen={setSignupOpen} setLoginOpen={setLoginOpen} setAlert={setAlert} setMessage={setMessage}/>
          {alert && <AlertModal setAlert={setAlert} message={message}/>}
          
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/userdashboard" element={    
            isLoggedIn ? <UserDashboard /> : <Navigate to="/" />       
        }/>
        <Route path="/admindashboard" element={    
            isLoggedIn ? <AdminDashboard setAlert={setAlert} setMessage={setMessage}/> : <Navigate to="/" />       
        }/>

        <Route path="/checkout" element={
          isLoggedIn ? <Checkout/> : <Navigate to=""/>
        }/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/productdetails/:id" element={<ProductDetails/>}/>
        <Route path="/cart" element={<Cart setLoginOpen={setLoginOpen}/>} />
        <Route path="/contactus" element={<ContactUs/>}/>


        <Route path="/about-us" element={<AboutUsPage/>}/>
        <Route path="/features-page" element={<FeaturesPage/>}/>
      </Routes>
      <Toaster/>
      <Footer/>
      </>
    );
}
export default App;