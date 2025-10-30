import axios from "axios";
import { useEffect, useState } from "react";
import { Icons } from "../components/userDashboardSeperateComponents/Icons";
import StatCard from "../components/userDashboardSeperateComponents/StatCard";
import OrderHistoryCard from "../components/userDashboardSeperateComponents/OrderHistoryCard";
import Sidebar from "../components/userDashboardSeperateComponents/Sidebar";
import { jwtDecode } from "jwt-decode";
import { IoDiamondOutline } from "react-icons/io5";

const UserDashboard = () => {
  // State for mobile menu control (Sidebar visibility)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const [summary, setSummary] = useState([]);
  const [membership, setMembership] = useState("");

  const token = localStorage.getItem("token");
  const userId = jwtDecode(token);
  const user_id = userId.id;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/get-user-summary/${user_id}`)

      .then((res) => {
        setSummary(res.data.info);
      })

      .catch((err) => {
        console.log(err.response?.data?.message || err.message);
      });
  }, [user_id]);

  useEffect(() => {
    if (summary.length > 0) {
      const totalSpent =
        Number(summary.find((s) => s.name === "Total Spent")?.value) || 0;

      if (totalSpent <= 100) setMembership("Broze");
      else if (totalSpent <= 300) setMembership("Silver");
      else if (totalSpent <= 500) setMembership("Gold");
      else if (totalSpent <= 1000) setMembership("Diamond");
      else setMembership("Premium");
    }
  }, [summary]);

  const text =
    membership == "Bronze"
      ? "text-yellow-300"
      : membership == "Silver"
      ? "text-gray-400"
      : membership == "Gold"
      ? "text-yellow-500"
      : membership == "Diamond"
      ? "text-blue-400"
      : membership == "Premium"
      ? "text-purple-500"
      : "text-gray-800";

  return (
    <div className="min-h-screen flex bg-gray-100 font-inter">
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      <div className="flex-1 overflow-y-auto">
        {/* Mobile Header Bar (Only visible on mobile) */}
        <div className="bg-white p-4 sticky top-0 z-30 shadow-md md:hidden flex justify-between items-center">
          <h2 className="text-xl font-extrabold text-orange-500">Dashboard</h2>
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-600 hover:text-orange-500"
            aria-label="Open menu"
          >
            <Icons.Menu className="w-6 h-6" />
          </button>
        </div>

        <main className="max-w-7xl mx-auto p-4 md:p-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-gray-500 mb-8">
            Welcome back to your administrative control panel.
          </p>

          {/* 2. Summary Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {summary.map((stat) => {
              return (
                <StatCard
                  key={stat.name}
                  name={stat.name}
                  value={stat.value}
                  color={stat.color}
                  bgColor={stat.bgColor}
                  icon={Icons[stat.iconKey]}
                />
              );
            })}
          </div>

          {/* 3. Main Layout*/}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Recent Orders */}
            <div className="lg:col-span-2">
              <OrderHistoryCard />
            </div>

            {/* Right Column: Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-lg h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-3">
                  Account Details
                </h3>
                <div className="space-y-4">
                  {/* Detail Item 1 */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <p className="flex items-center font-medium">
                      <Icons.User className="w-4 h-4 mr-2 text-orange-500" />{" "}
                      Membership:
                    </p>
                    <div className="flex justify-center items-center gap-2">
                    <IoDiamondOutline className={`text-xl ${text}`}/>
                    <span className={`font-semibold ${text}`}>
                      {membership}
                    </span>
                    </div>
                  </div>

                  {/* Detail Item 2 */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <p className="flex items-center font-medium">
                      <Icons.Settings className="w-4 h-4 mr-2 text-orange-500" />{" "}
                      Preferences:
                    </p>
                    <span className="font-semibold text-gray-800">
                      Email & SMS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
