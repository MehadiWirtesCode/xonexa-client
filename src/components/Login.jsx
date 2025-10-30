import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from 'react-hot-toast'
export const Login = ({
  loginOpen,
  setLoginOpen,
  setSignupOpen,
  setAlert,
  setMessage,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid,setInvalid]=useState(false);
  const toogleLoginForm = () => {
    setLoginOpen(false);
    setSignupOpen(true);
  };

  const loginFormHandler = async (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/login`, {
        email: email,
        password: password,
      })

      .then((res) => {
        console.log(res.data.message);
        setLoginOpen(false);
        setAlert(true);
        
        if (res.data.token) {
         localStorage.setItem("token", res.data.token);
         localStorage.setItem("role", res.data.role);
        }
        setMessage(res.data.message);
        setInvalid(false);
        setEmail("");
        setPassword("");
        window.location.back();
      })
      .catch((err) => {
        setInvalid(true);
        console.log(err.response?.data?.message || err.message || "Something went wrong!");
      });
  };

  //Login with google
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );

        console.log("✅ Google user info:", userInfo.data);

        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/googlelogin`,
          {
            email: userInfo.data.email,
          }
        );

        console.log("✅ Backend response:", res.data.message);
        setLoginOpen(false);
        setAlert(true);
          if (res.data.token) {
         localStorage.setItem("token", res.data.token);
         localStorage.setItem("role", res.data.role);
        }
        setMessage(res.data.message);
        window.history.back();
      } catch (err) {
        console.error(err.response?.data?.message || err.message || "Something went wrong");
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <div
      id="login-popup"
      tabIndex={-1}
      className={` ${
        loginOpen ? "flex" : "hidden"
      } bg-black/50 backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full flex items-center justify-center`}
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          {/* Close Button */}
          <button
            onClick={() => setLoginOpen(false)}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="#c6c7c7"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close popup</span>
          </button>

          <div className="p-5">
            {/* Heading */}
            <div className="text-center">
              <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                Login to your account
              </p>
              <p className="mt-2 text-sm leading-4 text-slate-600">
                You must be logged in to perform this action.
              </p>
            </div>

            {/* Social Buttons */}
            <div className="mt-7 flex flex-col gap-2">
              <button
                onClick={loginWithGoogle}
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-[18px] w-[18px]"
                />
                Continue with Google
              </button>
            </div>

            {/* OR Divider */}
            <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
              <div className="h-px w-full bg-slate-200"></div>
              OR
              <div className="h-px w-full bg-slate-200"></div>
            </div>

            {/* Login Form */}
            <form className="w-full" onSubmit={loginFormHandler}>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email Address"
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
              />

              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
              />

              {invalid && (
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
                  Invalid information
                </p>
              )}  

              <p onClick={()=> toast.error(`🤖 Sorry this service is not available now!`)}
              className="mb-3 mt-2 text-sm text-gray-500 hover:underline active:underline hover:cursor-pointer">
                <a
                  className="text-blue-800 hover:text-blue-600"
                >
                  Reset your password?
                </a>
              </p>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
              >
                Continue
              </button>
            </form>

            {/* Sign Up */}
            <div className="mt-6 text-center text-sm text-slate-600">
              Don't have an account?{" "}
              <button
                onClick={toogleLoginForm}
                className="font-medium text-[#4285f4]"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
