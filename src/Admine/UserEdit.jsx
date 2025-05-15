import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { axiosInstance } from "../../axiosInstance";

function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    image_url: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/admin/getAllProduct/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [id]);

   const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .put(`/admin/updateProduct/${id}`, product)
      .then(() => {
        toast.success("Product updated successfully!");
        navigate("/viewproduct");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading product details...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-green-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-green-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Stock</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-green-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Image URL</label>
            <input
              type="text"
              name="image_url"
              value={product.image_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-green-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-green-300"
              rows="4"
            ></textarea>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/viewproduct")}
              className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserEdit;
