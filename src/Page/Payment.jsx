import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';


function Payment() {
  const navigate = useNavigate();
  const { conformOrder } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    conformOrder();
    navigate('/orders');
  };

  return (
    <>

    <div 
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
        "url('https://cdn.pixabay.com/photo/2014/10/27/19/18/baby-shoes-505471_1280.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      > 
      <div className="max-w-md w-full mx-auto p-6 shadow-lg rounded-lg ">
        <h2 className="text-xl font-bold mb-4 text-center text-white">Payment Details</h2>
        <form  onSubmit={handleSubmit} className="space-y-3 text-white">
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
            required
            />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
            required
            />
          <input 
            type="tel" 
            name="phone" 
            placeholder="Phone Number" 
            value={formData.phone} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
            required
            />
          <textarea 
            name="address" 
            placeholder="Address" 
            value={formData.address} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
            required
            />
          <button type="submit"  className="w-full bg-blue-500 text-white p-2 rounded">Proceed to Pay</button>
        </form>
      </div>
    </div>
  </>
  );
}

export default Payment;
