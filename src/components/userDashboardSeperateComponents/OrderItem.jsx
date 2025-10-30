// const OrderItem = ({product}) => {
//   const bg_color = product.status == "pending" ?"bg-yellow-400":"bg-green-500";
//   return (
//     <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition duration-150 -mx-4 px-4 rounded-lg">
      
//       {/* Product Details (left side) */}
//       <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
//         <div>
//           <p className="text-sm font-semibold text-gray-800">{product.user_id}</p>
//           <p className="text-xs text-gray-500">
//             Order {product.order_id} | {product.created_at}
//           </p>
//         </div>
//       </div>

//       {/* Status and Amount (right side) */}
//       <div className="flex items-center justify-between w-full sm:w-auto mt-2 sm:mt-0">
        
//         {/* Status Badge */}
//         <span
//           className={`text-xs font-medium px-3 py-1 rounded-full ${bg_color} mr-4`}
//         >
//           {product.status}
//         </span>
        
//         {/* Amount */}
//         <div className="text-right">
//           {/* Amount is highlighted with the primary orange accent color */}
//           <p className="text-lg font-bold text-orange-500">
//             ${Number(product.total).toFixed(2)}
//           </p>
//         </div>
//       </div>
//     </li>
//   );
// };

// export default OrderItem;

const OrderItem = ({ product }) => {
  const bgColor =
    product.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800";

  return (
    <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 mb-3 bg-white shadow-sm rounded-xl hover:shadow-md transition-shadow duration-200">
      
      {/* Left: Order Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
        <div>
          <p className="text-sm font-semibold text-gray-900">Order #{product.order_id}</p>
          <p className="text-xs text-gray-500"> <span className="text-orange-600">Order Date :</span> {new Date(product.created_at).toLocaleString()}</p>
          <p className="text-xs text-gray-500">User ID: {product.user_id}</p>
        </div>
      </div>

      {/* Right: Status & Amount */}
      <div className="flex items-center justify-between w-full sm:w-auto mt-3 sm:mt-0 gap-4">
        {/* Status Badge */}
        <span className={`px-3 py-1 rounded-full font-semibold text-xs ${bgColor}`}>
          {product.status}
        </span>

        {/* Amount */}
        <p className="text-lg font-bold text-orange-500">
          ${Number(product.total).toFixed(2)}
        </p>
      </div>
    </li>
  );
};

export default OrderItem;
