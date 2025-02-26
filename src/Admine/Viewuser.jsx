import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Page/Sidebar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Viewuser() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  const DeleteUser = (id) => {
    axios
      .delete(`http://localhost:8000/users/${id}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        toast.success("User deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user");
      });
  };

  const BlockUser = (id, isBlocked) => {
    axios
      .patch(`http://localhost:8000/users/${id}`, { active: !isBlocked })
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, active: !isBlocked } : user
          )
        );
        toast.success(`User ${isBlocked ? "blocked" : "unblocked"} successfully`);
      })
      .catch((error) => {
        console.error("Error updating user status:", error);
        toast.error("Failed to update user status");
      });
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 ml-80">
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
        User List
      </h2>
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-md px-4 py-2 w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <p className="text-center text-gray-600">Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200 transition duration-200`}
                >
                  <td className="px-6 py-3 text-left">{user.id}</td>
                  <td className="px-6 py-3 text-left">{user.name}</td>
                  <td className="px-6 py-3 text-left">{user.email}</td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => navigate(`/UserDetails/${user.id}`)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2 transition duration-300"
                    >
                      View
                    </button>
                    <button
                      onClick={() => BlockUser(user.id, user.active)}
                      className={`px-4 py-2 rounded-md text-white transition duration-300 ${
                        user.active
                        ? "bg-green-500 hover:bg-green-700"
                        : "bg-red-500 hover:bg-red-700"
                      }`}
                    >
                      {user.active ? "Block" : "Unblock"}
                    </button>
                    <button
                      onClick={() => DeleteUser(user.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Sidebar />
        </div>
      )}
    </div>
  );
}

export default Viewuser;
