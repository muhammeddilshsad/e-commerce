import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddProduct = ({ setIsAddModalOpen }) => {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: "",
    image_url: "",
    category: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? (isNaN(parseFloat(value)) ? "" : parseFloat(value)) : value,
    }));
  };

  const handleSubmit = async () => {
    const { name, image_url, category, price, stock } = newProduct;

    if (!name || !image_url || !category || !price || !stock) {
      toast.error("All fields are required!");
      return;
    }

    try {
      await axios.post("http://localhost:8000/products", {
        ...newProduct,
        id: Date.now().toString(),
      });

      toast.success("Product added successfully!");
      navigate("/viewproduct");
      setIsAddModalOpen(false);
    } catch (error) {
      
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "name", label: "Product Name", type: "text" },
            { name: "image_url", label: "Image URL", type: "text" },
            { name: "price", label: "Price", type: "number" },
            { name: "stock", label: "Stock", type: "number" },
          ].map(({ name, label, type }) => (
            <div key={name}>
              <label className="block text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                value={newProduct[name]}
                onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-700">Category</label>
            <select
              name="category"
              value={newProduct.category}
              onChange={handleChange}
              className="border border-gray-300 rounded px-4 py-2 w-full"
            >
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button onClick={() => setIsAddModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
