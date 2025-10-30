import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TextType from "./TextType";

export const Hero = ({ scrollToLocation }) => {
  const navigate = useNavigate();
  return (
    <section className="relative bg-gradient-to-br from-gray-100 to-white overflow-hidden py-16 md:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 lg:px-8 gap-12">
        {/* LEFT SIDE CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center md:text-left"
        >
          <div className="text-center h-[120px] md:h-[140px] lg:h-[160px] overflow-hidden">
            <TextType
              text={[
                "Discover Modern Fashion Trends",
                "Explore the Latest Styles",
                "Upgrade Your Wardrobe Today",
                "Be Bold, Be Stylish",
                "Shop Your Favorite Outfits",
                "Trending Now for You",
              ]}
              typingSpeed={70}
              pauseDuration={1800}
              showCursor={true}
              cursorCharacter="▌"
              textColors={[
                "#111827",
                "#1E40AF",
                "#DC2626",
                "#F59E0B",
                "#10B981",
                "#8B5CF6",
              ]}
              className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight transition-colors duration-500 ease-in-out"
              cursorClassName="animate-pulse text-blue-600"
            />
          </div>

          <p className="text-gray-600 mt-4 text-base md:text-lg max-w-md mx-auto md:mx-0">
            Redefine your style with our new arrivals — designed for comfort,
            confidence, and class.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => navigate("/shop")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-full font-medium transition"
            >
              Shop Now
            </button>
            <button
              onClick={scrollToLocation}
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-7 py-3 rounded-full font-medium transition"
            >
              Shop Locations
            </button>
          </div>
        </motion.div>

        {/* RIGHT SIDE IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex justify-center"
        >
          <img
            src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=700&q=80"
            alt="Model in modern fashion outfit"
            className="w-[85%] md:w-[80%] lg:w-[75%] rounded-2xl shadow-xl object-cover"
          />
        </motion.div>
      </div>

      {/* Decorative Background Circles */}
      <div className="absolute top-10 left-0 w-60 h-60 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-pink-100 rounded-full blur-3xl opacity-30 -z-10"></div>
    </section>
  );
};
