import React, { useEffect } from 'react';
import { useCart } from '../Context/CartContext'; 
import { useNavigate } from 'react-router-dom';


function Wishlist() {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, getWishlistItems ,   handleAddToCart} = useCart();
   console.log(wishlist);
  
  useEffect(() => {
    
    getWishlistItems();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">MY WISHLIST</h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">No items in wishlist</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist[0].productId.map((item, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-40 h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
              <p className="text-xl font-bold text-blue-600">${item.price}</p>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={() => removeFromWishlist(item._id)}
              >
                Remove
              </button>
              <button
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                onClick={() => handleAddToCart(item)}
              >
                ADD TO CART
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
