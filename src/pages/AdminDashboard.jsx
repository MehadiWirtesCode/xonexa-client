import { Menu, LogOut, TrendingUp, Home } from "lucide-react";
import { SidebarItem } from "../components/AdminDashboardSeperateComponenets/Sidebar";
import ProductModal from "../components/AdminDashboardSeperateComponenets/ProductModal";
import StatCard from "../components/AdminDashboardSeperateComponenets/StatCard";
import ChartSection from "../components/AdminDashboardSeperateComponenets/ChartSection";
import InventoryAndActivitySection from "../components/AdminDashboardSeperateComponenets/InventoryAndActivitySection";
import { sidebarLinks } from "../components/AdminDashboardSeperateComponenets/ChartData";
import { AiOutlineDelete } from "react-icons/ai";
import { DeleteProductModal } from "../components/DeleteProductModal";
import { useContext, useState } from "react";
import LogoutModal from "../components/LogoutModal";
import { UsersContext } from "../contextApi/UserContextApi";
import { UserListModal } from "../components/AdminDashboardSeperateComponenets/UserListModal";
import ProductListModal from "../components/AdminDashboardSeperateComponenets/ProductListModal";

export default function AdminDashboard({ setAlert, setMessage }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const {setUsersListModal,setProductListModal} = useContext(UsersContext)
  
  const handleSidebarModal =(name)=>{
     if(name == "Users"){
      setIsSidebarOpen(false)
      setUsersListModal(true)
     }
     if(name == "Products"){
      setIsSidebarOpen(false);
      setProductListModal(true);
     }
  }
  return (
    <div className="flex  bg-gray-100 min-h-screen antialiased font-inter">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed z-40 inset-y-0 left-0 w-64 bg-white shadow-2xl lg:shadow-xl transform transition-transform duration-300 lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6 text-indigo-600" />
            <h1 className="text-2xl font-extrabold text-indigo-700">Welcome</h1>
          </div>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1 text-gray-500 hover:text-indigo-600 rounded-full transition"
          >
            <Menu size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarLinks.map((item) => (
            <SidebarItem
              key={item.name}
              name={item.name}
              Icon={item.Icon}
              onClick={() => handleSidebarModal(item.name)}
            />
          ))}

          <div className="border-t border-gray-100 pt-3 mt-3">
            <SidebarItem
              key="AddProduct"
              name="Add Product"
              Icon={sidebarLinks.find((link) => link.name === "Products").Icon} // Use Package Icon
              onClick={() => {
                setIsModalOpen(true);
                setIsSidebarOpen(false); // Close sidebar on mobile
              }}
              isAction={true}
            />
          </div>

          <div className="border-t border-gray-100 pt-3 mt-3">
            <button
              onClick={() => setDeleteModal(true)}
              className="flex hover:bg-red-200 active:bg-red-200 items-center space-x-3 p-3 w-full text-left rounded-xl transition-colors border-[2px] border-dotted border-purple-900 bg-red-300"
            >
              <AiOutlineDelete className="text-2xl text-gray-600" />
              <p className="text-gray-600 font-medium">Delete product</p>
            </button>
          </div>
        </nav>

        <div className="absolute bottom-6 w-full px-4">
          <button
            onClick={() => {
              setLogoutModal(true);
            }}
            className="flex items-center justify-center w-full p-3 bg-gray-800 text-white rounded-xl hover:bg-gray-500 transition font-medium"
          >
            <LogOut size={18} className="mr-2" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
        {/* Navbar */}
        <header className="flex items-center justify-between bg-white p-4 md:p-6 shadow-sm sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 hidden md:block">
              Dashboard Overview
            </h2>
          </div>

          <div className="flex items-center group">
            <span className="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 drop-shadow-lg transition-transform duration-300 group-hover:scale-105">
              Xonexa
            </span>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 md:p-8 space-y-8 overflow-y-auto">
          <StatCard
            title="total sales"
            Icon={TrendingUp}
            bgColor="bg-indigo-100"
            iconColor="text-indigo-600"
          />
          <ChartSection />
          <InventoryAndActivitySection />
        </main>
      </div>

      {/* Product Modal */}
      <ProductModal
        setAlert={setAlert}
        setMessage={setMessage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {logoutModal && (
        <LogoutModal
          logoutModal={logoutModal}
          setLogoutModal={setLogoutModal}
        />
      )}
      {deleteModal && (
        <DeleteProductModal
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
        />
      )}

      <UserListModal />
      <ProductListModal/>
    </div>
  );
}
