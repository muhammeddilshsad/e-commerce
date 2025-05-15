import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../axiosInstance';

function Orders() {
  const [orders, setOrders] = useState([]); 
  const user= JSON.parse(localStorage.getItem('user'));
  console.log(user);
  
  const navigate = useNavigate();

 


  const orderget=async()=>{
    try {
     const response= await axiosInstance.get(`/user/getallorders/${user._id}`)
     console.log(response.data);
     
     setOrders(response.data || []); 
      
    } catch (error) {
      console.log(error)
    
      
    }
  }

  useEffect(() => {
    orderget()
   
  }, []); 

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('https://cdn.pixabay.com/photo/2023/05/29/13/10/shoes-8026038_1280.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Order Confirmation</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No items in the order</p>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">Your Orders:</h2>
          {orders?.map((order, index) => (
            <div key={index} className="mb-6 bg-gray-800 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold text-white">
                Order: {index+1}
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {order.products?.map((item, idx) => (
                  <li key={idx} className="p-4 border rounded-lg shadow-lg bg-white">
                    <img
                      src={item.productId.image_url}
                      alt={item.productId.name || 'Product image'}
                      className="w-full h-56 object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
                      loading="lazy"
                    />
                    <p className="mt-3 font-medium text-center">{item.productId.name}</p>
                    <p className="text-gray-700 text-center font-semibold">${item.productId.price}</p>
                    <p className="text-gray-700 text-center font-semibold">Category: {item.productId.category}</p>
                    <p className="text-gray-700 text-center font-semibold">Quantity: {item.productId.quantity || 1}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button
            className="mt-6 bg-red-500 text-white p-2 rounded block mx-auto"
            onClick={() => navigate("/")}
          >
            BACK TO HOME PAGE
          </button>
        </div>
      )}
    </div>
  );
}

export default Orders;
