import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../axiosInstance";

function UserProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()

  useEffect(() => {
    axiosInstance
      .get(`/admin/getProductById/${id}`) 
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((error) => { 
          console.log(error)
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading product details...</p>;
  }

  if (!product) {
    return <p className="text-center text-red-500">Product not found.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-60 object-cover rounded-md"
        />
        <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-gray-800 font-semibold text-lg mt-2">Price: ₹{product.price}</p>
        <p className="text-gray-800 font-semibold text-lg mt-2">Stock: {product.stock}</p>
        <p className="text-gray-800 font-semibold text-lg mt-2">category: {product.category}</p>
        <button 
  onClick={() => navigate(-1)} 
  style={{ backgroundColor: "#4CAF50",color: "white",padding: "10px 20px",border: "none",borderRadius: "5px",cursor: "pointer" }}>Go Back</button>

      </div>
    </div>
  );
}

export default UserProduct;
