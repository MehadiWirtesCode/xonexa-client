import axios from "axios";
import { Trash2, X } from "lucide-react";
import { useState } from "react";

export const DeleteProductModal = ({deleteModal,setDeleteModal}) =>{
 
  const dsiplay = deleteModal ? "flex":"hidden";
  const [isValid,setValid] = useState(false);
  const [validMessage,setValidMessage] = useState("");
  const [productId,setProductId] = useState("");

     const handleDeleteProdcut= async(e) =>{
        e.preventDefault();
       await axios.post(`${import.meta.env.VITE_PRODUCT_URL}/deleteproduct`,{id:productId})
       .then(res =>{
        setDeleteModal(false)
         console.log(res.data.message);
       })
       .catch(err =>{
        console.log(err.response.data.message);
         setValid(true);
         setValidMessage(err.response.data.message);
       })
     }

    return (
    <div 
      className={`${dsiplay} fixed inset-0 z-50  items-center justify-center  backdrop-blur-sm p-4`}
     
    >
      {/* Modal Content - CHANGED: max-w-sm and p-6 for a smaller size */}
      <div 
        className="bg-white  w-full max-w-sm rounded-2xl shadow-2xl p-6 relative transform transition-all duration-300"
        style={{ fontFamily: 'Inter, sans-serif' }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={() =>setDeleteModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 "
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Icon and Heading Block */}
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-red-100  rounded-full mb-4">
            {/* Larger and bolder Trash icon */}
            <Trash2 className="text-red-600  w-7 h-7" />
          </div>
          
          {/* Title */}
          <h2 className="text-xl font-bold text-center text-gray-900  mb-2">
            Confirm Permanent Deletion
          </h2>
        </div>

        {/* Description */}
        <p className="text-center text-gray-600  mb-4 text-sm leading-relaxed">
          {/* Instruction changed to type the specific product name/ID */}
          To confirm deletion, please enter the <span className="font-extrabold text-red-600 ">(PRODUCT ID)</span> in the box below.
        </p>
        <p className="text-center text-xs text-gray-500  mb-6">
            This action will permanently delete this product and its associated data.
        </p>

        {/* Input Field */}
        <input 
            type="number"
            onChange={(e) => setProductId(e.target.value)}
            value={productId}
            placeholder={`xxxxxxxxx`}
            className="w-full px-4 py-2 mb-6 border border-gray-300  rounded-lg text-gray-900  placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150"
        />
        {isValid && (
                <p className="mb-3 mt-2 text-sm text-red-600 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                    ></path>
                  </svg>
                  {validMessage}
            </p>)}
         
        {/* Buttons */}
        <div className="flex justify-between gap-3">
          <button
            className="flex-1 px-4 py-2 rounded-xl border border-gray-300  text-gray-700  bg-gray-50  hover:bg-gray-100  transition duration-150 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-sm"
          >
            Cancel
          </button>
          <button onClick={handleDeleteProdcut}
           className="flex-1 px-4 py-2 rounded-xl bg-red-600 text-white font-medium transition duration-150 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center space-x-2 text-sm">
            <Trash2 size={25} />
            <span>Delete Permanently</span>
          </button>
        </div>
      </div>
    </div>
    )
}