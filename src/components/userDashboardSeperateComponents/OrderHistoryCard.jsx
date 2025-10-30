import { useEffect, useState } from "react";
import axios from "axios";
import OrderItem from "./OrderItem";
import {jwtDecode} from 'jwt-decode'

const OrderHistoryCard =() => {
  
  const [orderHistory,setOrderHistory] = useState([]);
   const token = localStorage.getItem("token");
   const decoded = jwtDecode(token)
   const user_id = decoded.id;

  useEffect(()=>{
    
    axios.get(`${import.meta.env.VITE_PRODUCT_URL}/getusers-order-item/${user_id}`)
    .then(res =>{
      setOrderHistory(res.data.items)
    })

    .catch(err =>{
      console.log(err.response?.data?.message || err.message);    
    })
  },[user_id])

  return(
  <div className="bg-white p-6 rounded-xl shadow-lg h-full">
    
    {/* Card Header */}
    <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-3">
      Latest Activity
    </h3>
    
    {/* Order List */}
    <ul className="divide-y divide-gray-100">
      {orderHistory.map((order) => (
        
        <OrderItem  key={order.order_id} product={order}/>
      ))}
    </ul>

  </div>
  )
};

export default OrderHistoryCard;