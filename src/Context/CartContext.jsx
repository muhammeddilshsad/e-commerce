
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../axiosInstance';
import { data } from 'react-router-dom';


const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const[clientSecret,setClientSecret]=useState("")
  const user = JSON.parse(localStorage.getItem('user'));
  const [wishcout,setWishcount]=useState(0)
  console.log(wishcout);
  
  useEffect(() => {
    if (!user) {
      toast.error("Please Login");
    }
  }, [user]);

  const getcartItem=async()=>{
    try{
      const response=await axiosInstance.get(`/user/getcartitem/${user._id}`)
      setCart(response.data.items)
      
    }catch(error){
      console.log(error);
      
    }
  }
  


   const handleAddToCart = async (product) => {
    
    try {
      const response = await axiosInstance.post(`/user/addtocart`,{productId:product._id})
      
      if (response.status===200) {
      toast.success(`${product.name} added to cart`)
      }
      getcartItem()
    } catch (error) {
      if (user._id) {
        toast.error("ALREADY ADD TO CART")
      }
      else {
        toast.error("PLEASE LOGIN")
      }
    }
  }


  const handleAddToWishlist = async (product) => {
    try {
      const response = await axiosInstance.post(`/user/addtowishlist/${user._id}`, { productId: product._id });
      
      if (response.status===200) {
        toast.success(`added to wishlist`)
       
        }
        getWishlistItems()
        
    } catch (error) {
      if (user._id) {
        
      }else{
        toast.error("Error adding product to wishlist");
      }
     
    }
  };


  const removeFromWishlist = async (productId) => {
    try {
      const res=await axiosInstance.delete(`/user/removewishlist/${productId}`);
      console.log(res);
      
      if(res.status===200){
        toast.success('remove the wishlist')
      }
      await getWishlistItems()
    } catch (error) {
      console.log(error);
      
      toast.error("Error removing item from wishlist");
    }
  };
  


  const getWishlistItems = async () => {
    try {
      const wishlistitem=await axiosInstance.get(`/user/getWishlist/${user._id}`)
      setWishcount(wishlistitem.data[0].productId.length);
      
      setWishlist(wishlistitem.data)

    } catch (error) {
      console.log(error);
      
    }
    
  };

  const removeFromCart = async (productId) => {
    console.log(productId)
    try {
      const res=await axiosInstance.delete(`/user/deleteCartItem/${productId._id}`, {
        data: { userId: user._id }
      });
      getcartItem()
      toast.success("Product removed from cart");
    } catch (error) {
      toast.error("Error removing product from cart");
      console.error(error);
    }
  };
  


  const conformOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/users/${user._id}`);
      const existingOrders = response.data.orders || [];
      const newOrder = {
        order_id: `ORD${Date.now()}`,
        products: cart,
      };
      const updatedOrders = [...existingOrders, newOrder];
      await axios.patch(`http://localhost:8000/users/${user._id}`, { orders: updatedOrders });
      await axios.patch(`http://localhost:8000/users/${user._id}`, { cart: [] });
      toast.success("Order placed successfully");
      setCart([]);
    } catch (error) {
      toast.error("Failed to place order. Please try again");
    }
  };

  const handleQuantityChange = async (productId, action) => {
    console.log(productId)
  
    try {
      const response = await axiosInstance.put("/user/handleQuantityChange", {
        productId,
        
        action,
      });
      const newCart=await axiosInstance.get(`/user/getcartitem/${user._id}`)
      setCart(newCart.data.items)
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };
  const createorder = async () => {
    try {
      const response = await axiosInstance.post(`user/createorder`);
      console.log(response.data.data.clientSecret)
      setClientSecret(response.data.data.clientSecret)
  
      if (response.status === 200) {
        toast.success("Order created successfully"); 
      }
    } catch (error) {
      toast.error("Order creation failed"); 
      console.log("Order error:", error);
    }
  };
  
  

  

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        wishlist,
        setWishlist,
        handleAddToCart,
        handleAddToWishlist,
        removeFromCart,
        removeFromWishlist,
        conformOrder,
        handleQuantityChange,
        getWishlistItems,
        getcartItem,
        wishcout,
        createorder,
        clientSecret
       
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
