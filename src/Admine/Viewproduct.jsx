import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Page/Sidebar";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axiosInstance";
import toast from "react-hot-toast";

function Viewproduct() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getproduct()
  
   
  }, []);
  const getproduct=async()=>{
    try {
      const res= await axiosInstance.get("/user/getproducts")
      {
        setProducts(res.data);
        setFilteredProducts(res.data);

        const uniqueCategories = [...new Set(res.data.map((product) => product.category))];
        setCategories(uniqueCategories);
        setLoading(false);
      }
      
    } catch (error) {
      console.error("Error fetching products:", error);
      
    }
  }

  useEffect(() => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  const handleDelete = async(id) => {
    try {
      const response= await axiosInstance.delete(`admin/deleteProduct/${id}`) 
      console.log(response)
      getproduct()
      if(response.status===200){
        toast.success("product deleted successsfuly")
      }
      
    } catch (error) {
      console.error("Error deleting product:", error);
      
    }

    
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex">
      <div className="w-1/4">
        <Sidebar />
      </div>

      <div className="w-3/4 pl-8">
        <h1 className="text-3xl font-semibold text-center mb-6">All Products</h1>

        <div className="flex justify-between mb-6">
          <input
            type="text"
            placeholder="Search Products..."
            className="border p-2 w-1/2 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="border p-2 rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <button
            onClick={() => navigate("/addproduct")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add Product
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white shadow-lg rounded-lg p-4">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                <p className="text-gray-600">₹{product.price}</p>
                <p className="text-sm text-gray-500"> {product.category}</p>

                  <button
                    onClick={() => navigate(`/userproduct/${product._id}`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    View Details
                  </button>
                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => navigate(`/useredit/${product._id}`)}
                    className="bg-green-500 text-white h-10 w-20 rounded-md hover:bg-green-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
}

export default Viewproduct;
