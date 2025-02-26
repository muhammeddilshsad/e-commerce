import React, { useEffect, useState } from "react";
import { ShoppingCart, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const { cart, setCart } = useCart();

  useEffect(() => {
    const user = localStorage.getItem("userId");
    if (user) {
      setIsLogged(true);
      axios .get(`http://localhost:8000/users/${user}`)
        .then((res) => setCart(res.data.cart || []))
        .catch((error) => console.error("Error fetching user cart:", error));
    }
  }, [setCart]);

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
      

        {isLogged && (
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
        {!isLogged && (
          <button onClick={() => navigate("/signin")} className="hover:text-blue-600">
            Log in
          </button>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <button onClick={() => navigate("/cart")} className="relative">
          <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
              {cart.length}
            </span>
          )}
        </button>
        <button className="md:hidden" aria-label="Open menu">
          <Menu className="w-6 h-6 text-gray-700 hover:text-blue-600" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
