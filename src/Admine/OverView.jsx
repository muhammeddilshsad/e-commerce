import React, { useEffect, useState } from "react";
import Sidebar from "../Page/Sidebar";
import { useNavigate } from "react-router";

import { axiosInstance } from "../../axiosInstance";

const OverView = () => {
  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'))
  console.log(user)
  
  const getallorders=async()=>{
    
    try {
      const response=await axiosInstance.get("/admin/getAllOrders")
     
      
      setOrders(response.data)
      
      
    } catch (error) {
      console.log(error)
      
    }
  }





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

      getallorders()

     
      
  }, [])

  useEffect(() => {
    axiosInstance
      .get("admin/getAllUsers")
      .then((response) => {
        const userData = response.data;
        setUsers(userData.length)
      })
      .catch((error) => {
        console.error("Fetching users error", error);
      });
  }, []);

  useEffect(() => {
    if (Array.isArray(orders)) {
      const totalRevenue = orders.reduce((acc, order) => acc + (order.amount || 0), 0);
      setRevenue(totalRevenue);
    }
  }, [orders]);
 
  

 
console.log("Type of orders:", typeof orders)
  if(user.role==="admin"){
  return (
    <div className="flex bg-black h-screen">
   <Sidebar/>
      <div className="flex-1 p-6 ml-80">
        <h1 className="text-3xl font-bold text-white mb-6">Admin Dashboard</h1>
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
            <p className="text-2xl mt-2">${revenue}</p>
          </div>

          <div
            className="bg-pink-600 text-black font-bold text-lg p-6 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer hover:scale-105 transform transition"
          >
            <p>Total Orders</p>
            <p className="text-2xl mt-2">{orders.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}else{
  return(
       <h1>You are not Admin</h1>
  )
}
};

export default OverView;