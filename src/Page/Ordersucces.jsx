import React from 'react';
import { useParams } from 'react-router-dom';

const CheckoutSuccess = () => {
  
    const { sessionId } = useParams();
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="p-8 max-w-md bg-white rounded-lg shadow-md text-center">
                
                <div className="mb-6">
                    <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Completed!</h1>
                <p className="text-gray-600 mb-8">Thank you for your purchase. Your order has been processed successfully.</p>
                
                
                <div className="flex justify-center space-x-4 mb-8">
                    <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                    </div>
                    <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                    </div>
                    <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                        </svg>
                    </div>
                </div>
                
                <p className="text-sm text-gray-500 mb-8">Order ID: {sessionId ? sessionId.substring(0, 12) : 'ORD' + Math.floor(Math.random() * 10000)}</p>
                
                <button 
                    onClick={() => window.location.href = '/'}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                    Continue Shopping
                </button>
            </div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div 
                        key={i}
                        className="absolute bg-blue-500 rounded-full opacity-70"
                        style={{
                            width: `${Math.random() * 20 + 10}px`,
                            height: `${Math.random() * 20 + 10}px`,
                            left: `${Math.random() * 100}%`,
                            top: `-50px`,
                            animation: `fall ${Math.random() * 3 + 2}s linear ${Math.random() * 2}s infinite`,
                        }}
                    ></div>
                ))}
            </div>
            
            
            <style jsx>{`
                @keyframes fall {
                    0% {
                        transform: translateY(-10px) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default CheckoutSuccess;