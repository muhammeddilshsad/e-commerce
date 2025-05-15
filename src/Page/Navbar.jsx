import React, { useEffect, useState } from "react";
import { ShoppingCart, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import axios from "axios";
import { FaHeart } from "react-icons/fa";


function Navbar() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const {wishcout, cart ,getcartItem, wishlist,getWishlistItems} = useCart();
console.log(wishlist);


const user = localStorage.getItem("user");

  useEffect(() => {
    getcartItem()
    getWishlistItems()
  }, []);

  return (
    <nav className=" bg-transparent py-4 px-6 flex justify-between items-center ">
      <button  className="text-2xl font-bold text-black">
        SHOEZY
      </button>

      <div className="hidden md:flex space-x-6 text-black font-medium ">
        <button onClick={() => navigate("/")}   className="hover:text-black cursor-pointer">
          Home
        </button>
        <button onClick={() => navigate("/shop")} className="hover:text-black cursor-pointer">
          Shop
        </button>
        <button onClick={() => navigate("/Orders")} className="hover:text-black cursor-pointer">
          Orders
        </button>
      

        {user && (
          <button
            onClick={() => {
              localStorage.clear();
              setIsLogged(false);
              navigate("/signin");
            }}
            className="hover:text-blue-600 cursor-pointer"
          >
            Log Out
          </button>
        )}
        {!user && (
          <button onClick={() => navigate("/signin")} className="hover:text-blue-600">
            Log in
          </button>
        )}
      </div>

      {user?(<div className="flex items-center space-x-4">
        <button onClick={() => navigate("/Wishlist")} className="relative">
        <FaHeart className="w-5 h-5 text-gray-700 hover:text-pink-600" />
        {wishlist && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
            {wishlist?.[0]?.productId?.length}
          </span>
        )}
      </button>
      
        <button onClick={() => navigate("/cart")} className="relative">
          <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
              {cart.length}
            </span>
            
          )}
         
        </button>
        {console.log("object",cart.length)}
        <button className="md:hidden" aria-label="Open menu">
          <Menu className="w-6 h-6 text-gray-700 hover:text-blue-600" />
        </button>
      </div>):null}
    </nav>
  );
}

export default Navbar;
