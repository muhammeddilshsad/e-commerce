
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import { axiosInstance } from "../../axiosInstance";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      getuseray();
      getusersorder();
    }
  }, [userId]);

  const getuseray = async () => {
    try {
      const response = await axiosInstance.get(`admin/getUserById/${userId}`);
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setLoading(false);
    }
  };

  const getusersorder = async () => {
    try {
      const response = await axiosInstance.get(`admin/getAllorders/${userId}`);
      console.log(response);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-600 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-red-500 font-semibold">User not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 py-10 px-6">
      {/* User Info */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <MdArrowBackIosNew onClick={() => navigate(-1)} />
        <div className="flex justify-center items-center h-full">
          <FaUserLarge className="text-8xl text-gray-700" />
        </div>

        <h1 className="text-3xl font-semibold text-gray-800 mb-6">User Details</h1>
        <div className="space-y-3">
          <p className="text-lg text-gray-700">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>

      {/* Orders Section */}
      {/* Orders Section */}
<div className="max-w-4xl mx-auto mt-8 bg-white p-8 rounded-lg shadow-lg">
  <h2 className="text-2xl font-semibold text-gray-800">Ordered Items</h2>
  {orders && orders.length > 0 ? (
    <ul className="mt-4 space-y-3">
      {orders.map((order, orderIndex) => (
        <div key={orderIndex}>
          {order.products.map((item, prodIndex) => (
            <li
              key={prodIndex}
              className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <img
                src={item.productId.image_url}
                alt={item.productId.name}
                className="w-16 h-16 rounded-lg object-cover mr-4"
              />
              <div>
                <p className="font-medium text-gray-800">{item.productId.name}</p>
                <p className="text-gray-600">${item.productId.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </li>
          ))}
        </div>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500 italic mt-4">No orders found</p>
  )}
</div>


      
      <div className="max-w-4xl mx-auto mt-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800"></h2>
        {user.cart && user.cart.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {user.cart.map((product, index) => (
              <li key={index} className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover mr-4"
                />
                <div>
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-gray-600">${product.price}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic mt-4">No products found</p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
