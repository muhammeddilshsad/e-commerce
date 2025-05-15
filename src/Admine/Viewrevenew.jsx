import React, { useEffect, useState } from "react";
import Sidebar from "../Page/Sidebar";
import { useNavigate } from "react-router";
import axios from "axios";
import { axiosInstance } from "../../axiosInstance";

const Viewrevenew = () => {
  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState(0);
  const [users, setUsers] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);



useEffect(() => {
    axiosInstance.get("/user/getproducts")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [])

  useEffect(() => {
    axiosInstance
      .get("/admin/getAllUsers")
      .then((response) => {
        const userData = response.data;
        setUsers(userData.length);

        let totalOrders = 0;
        let totalRevenue = 0;

        userData.forEach((user) => {
          if (user.orders) {
            totalOrders += user.orders.length;
            user.orders.forEach((order) => {
              totalRevenue += parseFloat(order.price) || 0;
            });
          }
        });

        setOrders(totalOrders);
        setRevenue(totalRevenue);
      })
      .catch((error) => {
        console.error("Fetching users error", error);
      });
  }, []);

  return (
    <div className="flex bg-black h-screen">
   <Sidebar/>
      <div className="flex-1 p-6 ml-80">
        <h1 className="text-3xl font-bold text-white mb-6">TOTAL REVENEW</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          <div
            className="bg-pink-600 text-black font-bold text-lg p-6 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer hover:scale-105 transform transition"
          >
            <p>Total Users</p>
            <p className="text-2xl mt-2">{users}</p>
          </div>

          <div
            className="bg-pink-600 text-black font-bold text-lg p-6 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer hover:scale-105 transform transition"
          >
            <p>Total Products</p>
            <p className="text-2xl font-bold text-black mt-2">{loading ? "..." : products.length}</p>
            
          </div>

          <div
            className="bg-pink-600 text-black font-bold text-lg p-6 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer hover:scale-105 transform transition"
          >
            <p>Total Revenue</p>
            <p className="text-2xl mt-2">${revenue.toFixed(2)}</p>
          </div>

          <div
            className="bg-pink-600 text-black font-bold text-lg p-6 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer hover:scale-105 transform transition"
          >
            <p>Total Orders</p>
            <p className="text-2xl mt-2">{orders}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewrevenew;