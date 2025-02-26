import React from "react";

function ProductModal({ product, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[90%] md:w-[50%]">
       
        <img src={product.image_url} alt={product.name} className="w-full h-64 object-cover rounded-lg" />
        <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-lg font-bold text-teal-600 mt-4">${product.price}</p>
        <div className="flex justify-between items-center mt-6">
          <p className={`text-sm px-3 py-1 rounded ${product.stock > 0 ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          <button className="float-right text-gray-500 text-xl font-semibold px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 active:bg-gray-200 transition-all"onClick={onClose}>CLOSE</button>

        </div>
      </div>
    </div>
  );
}

export default ProductModal;
