import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'


export const useCart = ()=>{
    return useContext(CartContext)
}

const CartContext =createContext()
const CartProvider = ({children}) => {
    const [cart,setCart]=useState([])
    const [order,setOrder]= useState([])

 const userId = localStorage.getItem('userId')
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await axios.get(`http://localhost:8000/users/${userId}`);
                if(response.data){
                    setCart(response.data.cart || [])
                    setOrder(response.data.order || [])
                }
                

            }catch(error){
                toast.error("Please Login")
            }
        }
        if(userId){
            fetchData()
        }
    },[userId])

    const handleAddTocart = async (product)=>{
        try{
           const response =  await axios.get(`http://localhost:8000/users/${userId}`)
           const currentCart = response.data.cart || [];
           const existingProduct = currentCart.find((item)=> item.id === product.id)

           let newCart;
  
           if(existingProduct){
            currentCart.map((item)=> 
            item.id === product.id ? {...item, quantity : quantity + 1 } : item);
            alert("Quantity Increased")
            console.log();
            
           }else{
            newCart = [...currentCart,{...product,quantity : 1}]
            toast.success(`${product.name} add to cart!`)
           }
           await axios.patch(`http://localhost:8000/users/${userId}`,{cart : newCart})
           setCart(newCart)
           
        }catch(error){
            if(userId){
         toast.error("ALREADY ADD TO CART")
            }
            else{
                toast.error("PLEASE LOGIN")
            }
        }
    }


       const conformOrder = async () => {
         try {
          const response = await axios.get(`http://localhost:8000/users/${userId}`);
          const existingOrders = response.data.orders || [];

          const newOrder = {
            order_id: `ORD${Date.now()}`, 
            products: cart,   
          };

          const updatedOrders = [...existingOrders,newOrder];
  
          await axios.patch(`http://localhost:8000/users/${userId}`, { orders: updatedOrders });
          await axios.patch(`http://localhost:8000/users/${userId}`, { cart: [] });
          toast.success("Order placed successfully!");
          setCart([]);
          setOrder(updatedOrders); 
      } catch (error) {
          console.error("Error placing order:", error);
          toast.error("Failed to place order. Please try again.");
      }
  };
  
        const removeFromCart = async (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        try {
          await axios.patch(`http://localhost:8000/users/${userId}`,{ cart: updatedCart });
          setCart(updatedCart); 
          toast.success("Product removed from the cart.");
        } catch (error) {
          console.error("Failed to remove product from cart:", error);
          toast.error("Failed to remove product. Please try again.");
        }
      };

      const handleCancel = (itemId) => {
        setCart(cart.filter(item => item.id !== itemId));
        toast.success(" product order Cancel")
      };

          const handleIncrement = (productId) => {
         setCart(prevCart => {
          const updatedCart = prevCart.map(item => 
            item.id === productId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
          );

          axios.patch(`http://localhost:8000/users/${userId}`, { cart: updatedCart });
          return updatedCart;
        });
      };
  
      const handleDecrement = (productId) => {
        setCart(prevCart => {
          const updatedCart = prevCart.map(item => 
            item.id === productId ? { ...item, quantity: (item.quantity || 1) - 1 } : item
          );
      
          axios.patch(`http://localhost:8000/users/${userId}`, { cart: updatedCart });
          return updatedCart;
        });
      };
   
    
  return (
    <CartContext.Provider value={{
        cart,
        setCart,
        order,
        handleAddTocart,
        removeFromCart,
        conformOrder,
        handleCancel,
        handleIncrement,
        handleDecrement,
      
    }}>
        {children}
    </CartContext.Provider>
      
  )
}

export default CartProvider

