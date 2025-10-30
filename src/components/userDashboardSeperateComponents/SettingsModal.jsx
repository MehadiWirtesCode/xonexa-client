import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
export const SettingsModal = ({ settingsModal, setSettingsModal }) => {
  const display = settingsModal ? "flex" : "hidden";

  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isGoogleLogin, setGoogleLogin] = useState(false);

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userEmail = decoded.email;
  const user_id = decoded.id;

  //get login type
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/login-by-Google/${user_id}`)

      .then((res) => {
        console.log(res.data.message);
        if(res.data.isGoogle){
            setGoogleLogin(true)
        }
        else{
            setGoogleLogin(false)
        }
      })
      .catch((err) => console.log(err.response?.data?.message || err.message));
  }, [user_id]);

  //update email handler 
  const handleUpdateEmail = () => {
    axios
      .patch(`${import.meta.env.VITE_API_URL}/update-email`, {
          email,
          user_id,
        })

      .then((res) => {
        setEmail("")
        toast.success(res.data.message)
      })

      .catch((err) => {
        toast.error(err.response?.data?.message || err.message);
      });

    console.log("Update email:", email);
  };

  //change passsword handler
  const handleChangePassword = () => {
    axios.patch(`${import.meta.env.VITE_API_URL}/change-password`,{
        currentPassword,
        newPassword,
        user_id,
        userEmail,
      }
    )

    .then(res =>{
       setCurrentPassword("")
       setNewPassword("")
       toast.success(res.data.message)
    })

    .catch(err =>{
      toast(err.response?.data?.message || err.message)
    })
    console.log("Change password:", currentPassword, newPassword);
  };

  return (
    <div
      className={`fixed inset-0 backdrop-blur-sm bg-opacity-50 z-50 ${display} items-center justify-center p-4`}
    >
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-xl">
        {/* Close Button */}
        <button
          onClick={() => setSettingsModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Settings</h2>

        { !isGoogleLogin ? (<>
                  <div className="mb-6">
          <h3 className="font-semibold mb-2">Update Email</h3>
          <input
            type="email"
            placeholder="Enter new email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <button
            onClick={handleUpdateEmail}
            className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition"
          >
            Update Email
          </button>
        </div>
          <div>
            <h3 className="font-semibold mb-2">Change Password</h3>
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <button
              onClick={handleChangePassword}
              className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
            >
              Change Password
            </button>
          </div> </>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 mt-6 border border-green-300 rounded-xl bg-green-50 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-500 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2l4-4M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8s-8 3.582-8 8s3.582 8 8 8z"
              />
            </svg>
            <p className="text-center text-green-700 font-semibold text-lg">
              You logged in with Google
            </p>
            <p className="text-center text-green-600 text-sm mt-1">
              Password change is not available for social login.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
