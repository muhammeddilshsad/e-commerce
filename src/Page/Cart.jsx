import React, { useEffect } from 'react'
import { useCart } from '../Context/CartContext'
import { useNavigate } from 'react-router-dom'



function Cart() {
  const navigate = useNavigate()
  const { cart,  removeFromCart,getcartItem, handleQuantityChange, createorder} = useCart()

 const  handleclick=()=>{
  createorder()
  navigate("/Payment")
 
    
  }
   
  const handleIncrement = async(productId) =>{
    try {
      handleQuantityChange(productId, "increment");
      getcartItem()

     
    } catch (error) {
      console.log(error);
      
    }
  } 
  const handleDecrement = async(productId) => {
    try {
      handleQuantityChange(productId, "decrement");
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    getcartItem()

  },[])
console.log(cart);

  const totalAmount = cart.reduce((acc, item) => acc + (item.productId.price )* (item.quantity), 0).toFixed(2);
  

  return (

    
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">SHOPPING CART</h1>
      
       {cart.length === 0 ? (
        < p className="text-center text-gray-500">NO PRODUCTS</p>
      ) : (
          <>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((item, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
              <img src={item.productId.image_url} alt={item.productId.name} className="w-40 h-40 object-cover rounded-lg mb-4" />
              <h2 className="text-lg font-semibold mb-2">{item.productId.name}</h2>
              <p className="text-xl font-bold text-blue-600">${item.productId.price}</p>
              <div className="flex items-center mt-2">
                <button 
                  className="bg-gray-300 px-3 py-1 rounded-l-lg hover:bg-gray-400" 
                  onClick={() => handleDecrement(item._id)}
                
                >
                  {console.log("object",item)}
                  -
                </button>
                <span className="px-4 py-1 bg-gray-200">{item.quantity || 1}</span>
                <button 
                  className="bg-gray-300 px-3 py-1 rounded-r-lg hover:bg-gray-400" 
                  onClick={() => handleIncrement(item._id)}
                >
                  +
                </button>
              </div>
              <button 
  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
  onClick={() => removeFromCart(item.productId)}
>
  Remove
</button>

            </div>
          ))}
        </div>
      <button 
        className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600' 
        onClick={handleclick}
      >
        BUY NOW
      </button>
      <p className="mt-6 text-lg font-bold text-center">Total: ${totalAmount}</p>

      </>
      )}
     
    </div>
  )
}

export default Cart