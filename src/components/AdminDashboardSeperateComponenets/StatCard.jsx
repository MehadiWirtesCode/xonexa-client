import { useEffect, useState } from "react";
import axios from "axios";

const StatCard = ({ title, Icon, bgColor, iconColor }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_PRODUCT_URL}/get-total-sales`)
      .then((res) => {
        setValue(Number(res.data.totalValue));
      })
      .catch((err) => {
        console.log(err.response?.data?.message || err.message);
      });
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.03]">
      {/* Icon Background */}
      <div
        className={`absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full shadow-lg ${bgColor} ${iconColor}`}
      >
        <Icon size={28} />
      </div>

      {/* Title */}
      <p className="text-gray-500 text-sm font-semibold mb-3">{title}</p>

      {/* Value */}
      <h3 className="text-4xl font-extrabold text-gray-900 mt-2 mb-2">
        $ {value} {/* Number formatting */}
      </h3>

      {/* Optional Subtitle */}
      <p className="text-xs text-gray-400">
        Total completed sales
      </p>
    </div>
  );
};

export default StatCard;
