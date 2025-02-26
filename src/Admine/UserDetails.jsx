
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";


const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8000/users/${userId}`)
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
          setLoading(false);
        });
    }
  }, [userId]);

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
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <MdArrowBackIosNew onClick={() => navigate(-1)} />

      <div className="flex justify-center items-center h-full">
  <FaUserLarge className="text-8xl text-gray-700" />
       </div>

        <h1 className="text-3xl font-semibold text-gray-800 mb-6">User Details</h1>
        <div className="space-y-3">
          <p className="text-lg text-gray-700"><strong>Name:</strong> {user.name}</p>
          <p className="text-lg text-gray-700"><strong>Email:</strong> {user.email}</p>
        </div>
      </div>

     
      <div className="max-w-4xl mx-auto mt-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800">Ordered Items</h2>
        {user.orders && user.orders.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {user.orders.map((product, index) => (
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
          <p className="text-gray-500 italic mt-4">No orders found</p>
        )}
      </div>

      <div className="max-w-4xl mx-auto mt-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800">Items in Cart</h2>
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