import React from 'react';
import { Truck, Tag, Heart, Zap, Shield, Sparkles, Leaf, Award, ArrowRight } from 'lucide-react';

// Data for the main feature grid
const features = [
  {
    icon: Leaf, // Reusing Leaf from AboutUs for consistency on Sustainability
    title: '100% Sustainable Sourcing',
    description: 'We prioritize organic cotton, recycled polyester, and cruelty-free materials for every collection, minimizing our environmental footprint.',
    color: 'text-green-600 bg-green-50',
  },
  {
    icon: Shield,
    title: 'Ethical Manufacturing',
    description: 'Our clothes are made in audited facilities ensuring fair wages, safe working conditions, and no child labor. Wear your values proudly.',
    color: 'text-indigo-600 bg-indigo-50',
  },
  {
    icon: Truck,
    title: 'Worldwide Express Shipping',
    description: 'Get your Xonexa pieces fast and reliably. We offer complimentary express shipping on all orders over $100 globally.',
    color: 'text-sky-600 bg-sky-50',
  },
  {
    icon: Award, // Reusing Award for Exceptional Quality consistency
    title: 'Unrivaled Garment Quality',
    description: 'Designed to last, our pieces undergo rigorous testing to ensure durability, fit, and comfort, backed by a 2-year quality guarantee.',
    color: 'text-amber-600 bg-amber-50',
  },
  {
    icon: Heart,
    title: 'Dedicated Customer Care',
    description: 'Our support team is available 24/7 to assist with sizing, styling, returns, or any questions you may have. Your satisfaction is guaranteed.',
    color: 'text-red-600 bg-red-50',
  },
  {
    icon: Sparkles,
    title: 'Design Innovation',
    description: 'Stay ahead of the curve with our in-house design team constantly curating collections that fuse timeless elegance with current trends.',
    color: 'text-purple-600 bg-purple-50',
  },
];

const FeaturesPage = () => {
  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* Hero Section: Consistent dark header */}
      <section className="relative py-20 md:py-28 bg-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            Why Choose Xonexa?
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-4xl mx-auto opacity-90 border-t border-indigo-400 pt-4">
            It's more than just clothing. It's a commitment to quality, ethics, and sustainability.
          </p>
        </div>
      </section>

      {/* Main Features Grid Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Commitments to You
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We focus on delivering an exceptional shopping experience backed by superior products and transparent business practices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-gray-200 shadow-md transition duration-300 hover:shadow-xl hover:scale-[1.02] transform"
              >
                {/* Icon Circle */}
                <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 ${feature.color}`}>
                  <feature.icon className={`w-6 h-6 ${feature.color.split(' ')[0]}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust/Process Section: Adding a secondary section for more depth */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 gap-12 items-center">
            <div className="col-span-1 mb-8 lg:mb-0">
              <h3 className="text-4xl font-extrabold text-gray-900 mb-4 border-l-4 border-amber-600 pl-4">
                The Xonexa Promise
              </h3>
              <p className="text-lg text-gray-700">
                We believe in a transparent supply chain. Our promise is quality and trust in every thread.
              </p>
            </div>
            
            {/* Simple Process Flow */}
            <div className="col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div className="relative">
                <p className="text-5xl font-extrabold text-indigo-700 mb-2">1</p>
                <h4 className="text-lg font-semibold text-gray-900">Source</h4>
                <p className="text-sm text-gray-600">Ethical material sourcing.</p>
                <div className="hidden sm:block absolute top-6 right-0 w-1/2 h-1 bg-indigo-200 transform translate-x-1/2"></div>
              </div>
              <div className="relative">
                <p className="text-5xl font-extrabold text-indigo-700 mb-2">2</p>
                <h4 className="text-lg font-semibold text-gray-900">Craft</h4>
                <p className="text-sm text-gray-600">Expert tailoring & quality control.</p>
                <div className="hidden sm:block absolute top-6 right-0 w-1/2 h-1 bg-indigo-200 transform translate-x-1/2"></div>
              </div>
              <div className="relative">
                <p className="text-5xl font-extrabold text-indigo-700 mb-2">3</p>
                <h4 className="text-lg font-semibold text-gray-900">Deliver</h4>
                <p className="text-sm text-gray-600">Fast, carbon-neutral shipping.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) Section: Uses the main accent color (Indigo) - Consistent with About Us Page */}
      <section className="py-16 bg-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Experience the Xonexa Difference
          </h2>
          <p className="text-indigo-200 text-lg mb-8">
            Ready to upgrade your wardrobe with pieces that truly matter?
          </p>
          <a
            href="/shop"
            // Professional button style: White text on Indigo background
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-indigo-700 bg-white hover:bg-indigo-50 transition duration-300 transform hover:scale-105"
          >
            Shop the Collection
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </section>

    </div>
  );
};

export default FeaturesPage;
