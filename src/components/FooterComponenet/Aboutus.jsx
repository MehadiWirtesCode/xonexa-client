import React from 'react';
import { Leaf, Award, Users, ArrowRight } from 'lucide-react'; // Lucide icons for modern visual cues

// Define the company values data
const coreValues = [
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'Ensuring eco-friendly materials and production processes to protect our planet.',
    // Changed color from bright green to classic green
    color: 'text-green-600',
  },
  {
    icon: Award,
    title: 'Exceptional Quality',
    description: 'Every garment is crafted with the highest quality standards for lasting wear.',
    // Changed color to deep indigo accent
    color: 'text-indigo-600',
  },
  {
    icon: Users,
    title: 'Customer Centricity',
    description: "Our customers' satisfaction is our top priority. We offer prompt and friendly service.",
    // Changed color to a classic amber/gold for emphasis
    color: 'text-amber-600',
  },
];

// Main About Us Page Component
const AboutUsPage = () => {
  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* Hero Section: Clean, professional dark header */}
      <section className="relative py-24 md:py-32 bg-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-4xl mx-auto opacity-90 border-t border-indigo-400 pt-4">
            Where craftsmanship meets ethics to redefine your wardrobe.
          </p>
        </div>
      </section>

      {/* Brand Story Section: Clean white background with subtle accents */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
            
            <div className="mb-10 lg:mb-0">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6 border-l-4 border-indigo-600 pl-4">
                The Genesis of Xonexa
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Xonexa's journey began with a simple vision: to provide people with clothing that is both stylish and responsible. We believe that fashion is not just the art of dressing, but a means to express one's values through enduring quality.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                From a small online venture, we have become a reliable name for sustainable and high-quality fashion. Our goal is to bring the latest trends to every customer in an eco-friendly manner, without compromising on style.
              </p>
            </div>
            
            {/* Impact Statistics Section (Replaces Placeholder Image) */}
            <div className="p-8 bg-gray-100 rounded-xl shadow-inner border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Impact in Numbers</h3>
              <div className="grid grid-cols-3 gap-6 text-center">
                {/* Metric 1: Sustainable Sourcing */}
                <div>
                  <p className="text-5xl font-extrabold text-indigo-700 mb-1">95%</p>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Sustainable Sourcing</p>
                </div>
                {/* Metric 2: Happy Customers */}
                <div>
                  <p className="text-5xl font-extrabold text-indigo-700 mb-1">25K+</p>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Happy Customers</p>
                </div>
                {/* Metric 3: Years in Business */}
                <div>
                  <p className="text-5xl font-extrabold text-indigo-700 mb-1">8</p>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Years of Excellence</p>
                </div>
              </div>
              <p className="mt-6 text-sm text-gray-500 italic text-center">
                Committed to transparency and continuous improvement since day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section: Subtle gray background for contrast */}
      <section className="py-16 md:py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Our Core Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                // Cleaner look: subtle shadow and border, professional hover
                className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition duration-300"
              >
                <value.icon className={`w-10 h-10 mx-auto mb-4 ${value.color}`} />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-500 text-base">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) Section: Uses the main accent color (Indigo) */}
      <section className="py-16 bg-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Redefine Your Style
          </h2>
          <p className="text-indigo-200 text-lg mb-8">
            Explore our latest collection and become a part of the sustainable fashion movement.
          </p>
          <a
            href="/shop"
            // Professional button style: White text on Indigo background
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-indigo-700 bg-white hover:bg-indigo-50 transition duration-300 transform hover:scale-105"
          >
            Shop Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </section>

    </div>
  );
};

export default AboutUsPage;
