import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useCart } from '../Context/CartContext';
import ProductModal from './ProductModal';
import { axiosInstance } from '../../axiosInstance';
import { FaHeart } from "react-icons/fa";
import toast from 'react-hot-toast';


function Shop() {
    const [products, setProducts] = useState([]);
   
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const { handleAddToCart } = useCart();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

       
    useEffect(() => {
        axiosInstance.get("/user/getproducts").then((res) => {
            setProducts(res.data);
        });
    }, []);

    const filteredProducts = products.filter(product => 
        (category === 'All' || product.category === category) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const addToWishlist = async (productId) => {
        console.log(productId);
        
        try {
          const res = await axiosInstance.post('/user/addwishlist', { productId:productId });
          console.log(res);
          
          if (res.data.success) {
            alert('Product added to wishlist!');
          } 
          if(res.status===200){
            toast.success("item added to wishlist")
          }
        } catch (err) {
          console.error('Error adding to wishlist:', err);
          toast.error('item already in wishlist');
        }
      };
      

    const categories = ['All', ...new Set(products.map(product => product.category))];

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            <div className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    
                    <select 
                        className="mt-4 md:mt-0 w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                            onClick={() => handleProductClick(product)} 
                        >
                            <img 
                                src={product.image_url} 
                                alt={product.name} 
                                className="w-full h-64 object-cover" 
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                                <div className={`px-2 py-1 text-xs float-left w-1/3 font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </div>
                                <div className="flex items-center justify-between mt-8">
                                    <p className="text-lg font-bold text-teal-600">${product.price}</p>
                                   

        <button 
        className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-red-500 text-xl"
       onClick={(e) => {
       e.stopPropagation(); 
         addToWishlist(product._id); 
        }}
        >
        <FaHeart />
            </button>


                                    <button 
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300" 
                                        onClick={(e) => {
                                            e.stopPropagation(); 
                                            handleAddToCart(product);
                                        }}
                                        disabled={product.stock <= 0}
                                    >
                                        {product.stock > 0 ? 'ADD TO CART' : 'OUT OF STOCK'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && selectedProduct && (
                <ProductModal product={selectedProduct} onClose={closeModal} />
            )}
        </div>
    );
}

export default Shop;
