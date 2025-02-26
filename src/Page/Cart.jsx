import React from 'react'
import { useCart } from '../Context/CartContext'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const navigate = useNavigate()
  const { cart, handleDecrement,handleIncrement, removeFromCart } = useCart()

  const handleRemove = (productId) => {
    removeFromCart(productId)
  }

  const totalAmount = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0).toFixed(2);

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
              <img src={item.image_url} alt={item.name} className="w-40 h-40 object-cover rounded-lg mb-4" />
              <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
              <p className="text-xl font-bold text-blue-600">${item.price}</p>
              <div className="flex items-center mt-2">
                <button 
                  className="bg-gray-300 px-3 py-1 rounded-l-lg hover:bg-gray-400" 
                  onClick={() => handleDecrement(item.id)}
                >
                  -
                </button>
                <span className="px-4 py-1 bg-gray-200">{item.quantity || 1}</span>
                <button 
                  className="bg-gray-300 px-3 py-1 rounded-r-lg hover:bg-gray-400" 
                  onClick={() => handleIncrement(item.id)}
                >
                  +
                </button>
              </div>
              <button 
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      <button 
        className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600' 
        onClick={() => navigate("/Payment")}
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