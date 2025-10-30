const StatCard = ({ name, value, icon: Icon, color, bgColor }) => {

  return (
    // Card uses a light background with a contrasting color bar (border-l-4 border-orange-500)
    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500 transition duration-300 hover:shadow-xl">
      <div className="flex justify-between items-start">
        <div>
          {/* Display the value */}
          <p className="text-3xl font-extrabold text-gray-900">{value}</p>
          {/* Display the name/title */}
          <p className="text-sm font-medium text-gray-500 mt-1">{name}</p>
        </div>
        
        {/* Circular background with dynamic color based on props */}
        <div className={`p-3 rounded-full ${bgColor} bg-opacity-20`}>
          {/* Icon is dynamically rendered. 'color' prop sets the text/stroke color. */}
          <Icon className={`w-7 h-7 ${color}`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;