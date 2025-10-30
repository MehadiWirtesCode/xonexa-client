import React from 'react';
import { useNavigate } from 'react-router-dom';
const CheckCircleIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <path d="M22 4L12 14.01l-3-3"></path>
  </svg>
);


const XIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const CartSuccessModal = ({setOpenModal,productDetails,selectedSize}) => {

    const navigate = useNavigate();
    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4  bg-opacity-50">
            
            <div 
                className="bg-white rounded-lg shadow-2xl w-full max-w-md mt-16  scale-100 opacity-100 relative"
                onClick={(e) => e.stopPropagation()} // Prevents click inside modal from closing it
            >
                {/* Close Button */}
                <button
                    onClick={()=>setOpenModal(false)}

                    className="absolute top-3 right-3 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    aria-label="Close modal"
                >
                    <XIcon className="w-5 h-5" />
                </button>
                
                <div className="p-6">
                    
                    {/* Header: Success Message */}
                    <div className="flex items-center border-b border-gray-100 pb-4 pr-10">
                        <CheckCircleIcon className="w-7 h-7 text-green-500 mr-3 flex-shrink-0" />
                        <h2 className="text-xl font-bold text-gray-800">Item Added to Cart Successfully</h2>
                    </div>

                    {/* Item Details */}
                    <div className="mt-4 flex items-center">
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg mr-4 flex items-center justify-center border border-gray-200">
                            {/* Placeholder for Product Image */}
                            <img src={productDetails?.images[0]}
                             alt={`${productDetails?.name}`}/>
                        </div>
                        <div className="flex-grow">
                            <p className="text-gray-700 font-semibold"></p>
                            <p className="text-sm text-gray-500">Price: {productDetails?.price} | {selectedSize}</p>
                        </div>
                    </div>
                    
                    {/* CTAs */}
                    <div className="mt-6 flex flex-col space-y-3">
                        
                        <button 
                        onClick={()=>{
                            setOpenModal(false)
                            navigate("/cart")
                        }}                          
                            className="w-full px-4 py-2 text-sm font-semibold text-white bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-150 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                            aria-label="Review Cart"
                        >
                            Review Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartSuccessModal; 
