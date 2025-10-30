import React from 'react';
import { ShieldCheck, Sparkles, Truck, HeartHandshake } from 'lucide-react';

const TrustBanner = () => {
  const trustFeatures = [
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      description: 'All transactions are encrypted and secure.',
      color: 'text-green-600',
    },
    {
      icon: Sparkles,
      title: 'Premium Quality',
      description: 'Crafted with the finest, durable materials.',
      color: 'text-indigo-600',
    },
    {
      icon: Truck,
      title: 'Fast Shipping',
      description: 'Worldwide delivery, right to your doorstep.',
      color: 'text-blue-600',
    },
    {
      icon: HeartHandshake,
      title: 'Satisfaction Guaranteed',
      description: 'Not happy? Get a full refund within 30 days.',
      color: 'text-pink-600',
    },
  ];

  return (
    <div className="bg-white py-8 lg:py-12 shadow-md border-b border-gray-100 font-['Inter']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Shop With Us?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Experience the best with our commitment to quality and service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-100"
            >
              <div className={`p-4 rounded-full bg-white shadow-lg ${feature.color} mb-4`}>
                <feature.icon size={36} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBanner;
