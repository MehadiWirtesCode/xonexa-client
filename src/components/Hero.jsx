import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TextType from "./TextType";

export const Hero = ({ scrollToLocation }) => {
  const navigate = useNavigate();

  // Custom Image/Product Stack for the Right Side
  const images = [
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=300&h=400&q=80",
    "https://images.unsplash.com/photo-1594938363765-a9254c7d01c0?auto=format&fit=crop&w=350&h=450&q=80",
    "https://images.unsplash.com/photo-1577772619434-629a43a29026?auto=format&fit=crop&w=400&h=500&q=80",
  ];

  return (
    <section className="relative bg-white min-h-screen lg:min-h-[700px] overflow-hidden">
      {/* Background Gradient & Diagonal Split */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-blue-50/50 lg:bg-gradient-to-br lg:from-gray-50 lg:to-blue-50 transform lg:-skew-y-3 origin-top-left -mt-20"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-8 py-16 lg:py-32">
        {/* 1. RIGHT SIDE VISUALS - Mobile Order: 1st */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full lg:w-1/2 mt-8 lg:mt-0 flex justify-center relative order-1 lg:order-2"
        >
          <img
            src={images[0]}
            alt="Primary product photo"
            className="relative z-20 w-48 h-72 object-cover rounded-xl shadow-xl border-2 border-white 
lg:w-80 lg:h-[450px] lg:rounded-3xl lg:border-4 lg:shadow-2xl lg:transform lg:rotate-3 lg:hover:rotate-0 transition duration-500"
          />

          {/* Stacked images are hidden on small screens */}
          <img
            src={images[1]}
            alt="Secondary product photo 1"
            className="absolute top-10 right-1/4 md:right-1/3 w-40 h-60 object-cover rounded-xl shadow-xl opacity-70 transform -rotate-6 z-10 hidden lg:block"
          />
          <img
            src={images[2]}
            alt="Secondary product photo 2"
            className="absolute bottom-10 left-1/4 md:left-1/3 w-40 h-60 object-cover rounded-xl shadow-xl opacity-70 transform rotate-12 z-10 hidden lg:block"
          />
        </motion.div>

        {/* 2. LEFT SIDE CONTENT - Mobile Order: 2nd */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="w-full lg:w-1/2 text-center lg:text-left z-10 order-2 lg:order-1 mt-12 lg:mt-0"
        >
          {/* The Fixed is HERE! Increased min-h for large screens (220px) */}
          <div className="min-h-[100px] md:min-h-[120px] lg:min-h-[220px] mb-4">
            <TextType
              text={[
                "Discover Modern Fashion Trends",
                "Explore the Latest Styles",
                "Upgrade Your Wardrobe Today",
                "Be Bold, Be Stylish",
              ]}
              typingSpeed={70}
              pauseDuration={1800}
              showCursor={true}
              cursorCharacter="▌"
              textColors={["#111827", "#1E40AF", "#DC2626", "#F59E0B"]}
              className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight transition-colors duration-500 ease-in-out"
              cursorClassName="animate-pulse text-blue-600"
            />
          </div>

          <p className="text-gray-700 mt-4 text-base md:text-lg max-w-lg mx-auto lg:mx-0 font-medium">
            Redefine your style with our new arrivals — designed for comfort,
            confidence, and class. Get 20% off your first order!
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => navigate("/shop")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-lg shadow-md font-bold text-base transition transform hover:scale-[1.02] duration-300"
            >
              Shop The New Collection
            </button>
            <button
              onClick={scrollToLocation}
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-7 py-3 rounded-lg font-medium transition"
            >
              Find a Store
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
