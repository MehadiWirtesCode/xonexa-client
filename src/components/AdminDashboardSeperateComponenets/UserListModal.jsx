import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UsersContext } from "../../contextApi/UserContextApi";

const ConfirmationModal = ({
  user,
  deleteUserModal,
  setDeleteUserModal,
  onDelete,
}) => {
  const display = deleteUserModal ? "flex" : "hidden";

  return (
    <div
      className={`fixed inset-0 z-[60] ${display} flex items-center justify-center bg-opacity-40 backdrop-blur-sm transition-opacity duration-300`}
      onClick={() => setDeleteUserModal(false)}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 p-6 transform scale-100 transition duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-red-700 mb-4 border-b pb-2">
          Confirm Deletion
        </h3>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete the user:{" "}
          <span className="font-semibold text-gray-900">{user.full_name}</span>?
          <br />
          This action cannot be undone.
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setDeleteUserModal(false)}
            className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition duration-150"
          >
            Cancel
          </button>
          <button
            onClick={() => onDelete(user.user_id)}
            className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-150 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

//  Table Row Component
const TableRow = ({ user, onDelete }) => {
  const [deleteUserModal, setDeleteUserModal] = useState(false);

  return (
    <tr key={user.user_id} className="hover:bg-gray-50 transition duration-100">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {user.full_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            user.role === "1"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {user.role === "1" ? "admin" : "user"}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
        <button
          onClick={() => setDeleteUserModal(true)}
          className="text-red-600 hover:text-red-800 transition duration-150 p-2 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
          title={`Delete user ${user.name}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6"></path>
            <path d="M14 2h-4a2 2 0 0 0-2 2v2h8V4a2 2 0 0 0-2-2z"></path>
          </svg>
        </button>

        {deleteUserModal && (
          <ConfirmationModal
            user={user}
            deleteUserModal={deleteUserModal}
            setDeleteUserModal={setDeleteUserModal}
            onDelete={onDelete}
          />
        )}
      </td>
    </tr>
  );
};

//  User List Modal
export const UserListModal = () => {
  const { users, setUsers, usersListModal, setUsersListModal } =
    useContext(UsersContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/getallusers`)
      .then((res) => {
        console.log(res.data.message);
        setUsers(res.data.allUsers);
      })
      .catch((err) => {
        console.log(err.response?.data?.message || "Error fetching users");
      });
  }, [setUsers]);

  //handle delete user
  const handleDeleteUser = async (userId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/deleteuser/${userId}`
      );
      console.log(res.data.message);

      setUsers((prev) => prev.filter((user) => user.user_id !== userId));
    } catch (err) {
      console.log(err.response?.data?.message || "Delete failed");
    }
  };

  const display = usersListModal ? "flex" : "hidden";
  return (
    <div
      className={`fixed inset-0 z-50 ${display} items-center justify-center bg-opacity-40 backdrop-blur-sm transition-opacity duration-300`}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modalTitle"
    >
      <div
        id="modalContent"
        className={`bg-white rounded-xl shadow-2xl w-full max-w-5xl mx-4 my-8 max-h-[90vh] flex flex-col transform duration-300`}
      >
        {/* Header section start */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white rounded-t-xl z-10">
          <h2 id="modalTitle" className="text-2xl font-bold text-gray-800">
            User List
          </h2>
          <button
            onClick={() => setUsersListModal(false)}
            className="text-gray-400 hover:text-gray-600 transition"
            title="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Body section start*/}
        <div className="p-6 flex-grow overflow-y-auto">
          {users.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              No users found. Add new users to manage them here.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <TableRow
                      key={user.user_id}
                      user={user}
                      onDelete={() => handleDeleteUser(user.user_id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
