import { useState } from "react";
import axios from "axios";
import {useGoogleLogin} from '@react-oauth/google'
export const Signup = ({signupOpen,setSignupOpen,setLoginOpen,setAlert,setMessage}) => {

    const[invalidText,setInvalidText] = useState(false);
    const[messageText,setMessageText] = useState("");
    
    const toogleSignupForm =() =>{
        setSignupOpen(false);
        setLoginOpen(true);
    }

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const submitFormHandler =(e) =>{
      e.preventDefault();

      //call Api
      axios.post(`${import.meta.env.VITE_API_URL}/signup`,{
        name:fullName,
        email:email,
        password:password,
        confirmPassword:confirmPassword
      })
      .then(res => {
        console.log(res.data.message);
        setSignupOpen(false);
        setAlert(true);
        setInvalidText(false);
        if (res.data.token) {
         localStorage.setItem("token", res.data.token);
         localStorage.setItem("role", res.data.role);
        }
        setMessage(res.data.message);
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

      })
      .catch(err => {
        setInvalidText(true);
        console.error(err.response?.data?.message || err.message || "Something went wrong");
        setMessageText(err.response.data.message);
      });
    }
    // Google Signup
    const signup = useGoogleLogin({
      onSuccess:async (tokenResponse) => {

      try {
        
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );

        console.log("✅ Google user info:", userInfo.data);

        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/googlesignup`,
          {
            name: userInfo.data.name,
            email: userInfo.data.email,
            authProvider: "google",
          }
        );

        console.log("✅ Backend response:", res.data.message);
        setAlert(true);
        setMessage(res.data.message);
        if( res.data.token) {
         localStorage.setItem("token", res.data.token);
         localStorage.setItem("role", res.data.role);
        }
        setSignupOpen(false);
      
      } catch (err) {
          setInvalidText(true);
          setMessageText(err.response?.data?.message || err.message);
        console.error("❌ Signup error:", err.response?.data?.message || err.message);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <div
      id="signup-popup"
      tabIndex={-1}
      className={`${signupOpen?"flex" :"hidden"} bg-black/50 backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[999] h-full flex items-center justify-center`}
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow-lg">
        {/* Close Button */}
          <button onClick={() => setSignupOpen(false)}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center"
            
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="#c6c7c7"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close popup</span>
          </button>

        {/* Content */}
          <div className="p-6">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                Create Your Account
              </h2>
              <p className="text-sm text-slate-600">
                Sign up to start your journey with us!
              </p>
            </div>

          {/* Social Buttons */}
            <div className="mt-7 flex flex-col gap-2">

              <button onClick={signup} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-[18px] w-[18px]"
                />
              Signup with Google
              </button> 

            </div>

          {/* Divider */}
            <div className="flex items-center gap-2 mb-6 text-sm text-slate-600">
              <div className="h-px w-full bg-slate-200"></div>OR
              <div className="h-px w-full bg-slate-200"></div>
            </div>

          {/* Sign Up Form */}
            <form className="flex flex-col gap-3" onSubmit={submitFormHandler}>
              <input onChange={(e)=>setFullName(e.target.value)} value={fullName}
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full px-3 py-2 border rounded-lg outline-none placeholder-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
              />
              <input  onChange={(e) => setEmail(e.target.value)} value={email}
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full px-3 py-2 border rounded-lg outline-none placeholder-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
              />
              <input onChange={(e) => setPassword(e.target.value)} value={password}
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full px-3 py-2 border rounded-lg outline-none placeholder-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
              />
              <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                required
                className="w-full px-3 py-2 border rounded-lg outline-none placeholder-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
              />
              
               {invalidText && (
                <p className="mb-3 mt-2 text-sm text-red-600 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                    ></path>
                  </svg>
                  {messageText}
                </p>
              )}
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-900 focus:ring-2 focus:ring-black focus:ring-offset-1"
              >
                Sign Up
              </button>
            </form>

            <p className="mt-4 text-sm text-center text-slate-600">
              Already have an account?{" "}
              <button onClick={toogleSignupForm} className="font-medium text-[#4285f4]">
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
