import React from "react";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import TextType from "./TextType";

// Mock data for shop locations
const locations = [
  {
    id: 1,
    city: "JESSORE (Main Branch)",
    address: "14/A, Gulshan Avenue, Dhaka-1212",
    phone: "+880 1711-XXXXXX",
    hours: "10:00 AM - 9:00 PM (Daily)",
    mapLink:
      "https://www.google.com/maps/place/Khajura+Bazar/@23.2807143,89.251269,17z/data=!3m1!4b1!4m6!3m5!1s0x39ff6a5e0d59bbb7:0x6d74fae1c7802fa9!8m2!3d23.2807143!4d89.2538439!16s%2Fg%2F1pp2tk4rs?entry=ttu&g_ep=EgoyMDI1MTAyMC4wIKXMDSoASAFQAw%3D%3D", // Example Map Link
  },
  {
    id: 2,
    city: "Khulna Branch",
    address: "22/B, CDA Avenue, Chattogram",
    phone: "+880 1812-XXXXXX",
    hours: "11:00 AM - 8:00 PM (Closed Friday)",
    mapLink:
      "https://www.google.com/maps/place/Shantidham+More,+Khulna/@22.8122778,89.5508801,15z/data=!3m1!4b1!4m6!3m5!1s0x39ff901d05bfd8c9:0xd289d68d2e0260b0!8m2!3d22.8122785!4d89.5611799!16s%2Fg%2F11bzv3wgr_?entry=ttu&g_ep=EgoyMDI1MTAyMC4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    id: 3,
    city: "Dhaka Branch",
    address: "35, Shib Bari Mor, Khulna-9000",
    phone: "+880 1913-XXXXXX",
    hours: "10:00 AM - 9:00 PM (Closed Saturday)",
    mapLink:
      "https://www.google.com/maps/place/Mirpur+10/@23.808359,90.3656391,17z/data=!3m1!4b1!4m6!3m5!1s0x3755c0d64e52c951:0xf2cd1aca716f7f10!8m2!3d23.808359!4d90.368214!16s%2Fg%2F11j5d5h597?entry=ttu&g_ep=EgoyMDI1MTAyMC4wIKXMDSoASAFQAw%3D%3D",
  },
];

// Reusable Location Card Component
const LocationCard = ({ location }) => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="flex items-center space-x-3 mb-4">
        <MapPin className="w-7 h-7 text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-900">{location.city}</h3>
      </div>

      <div className="space-y-4 text-gray-600">
        {/* Address */}
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 flex-shrink-0 text-gray-500 mt-1" />
          <p className="text-base">{location.address}</p>
        </div>

        {/* Phone */}
        <div className="flex items-start space-x-3">
          <Phone className="w-5 h-5 flex-shrink-0 text-gray-500 mt-1" />
          <p className="text-base">
            <a
              href={`tel:${location.phone.replace(/[^0-9+]/g, "")}`}
              className="hover:text-indigo-600 transition-colors"
            >
              {location.phone}
            </a>
          </p>
        </div>

        {/* Hours */}
        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 flex-shrink-0 text-gray-500 mt-1" />
          <p className="text-base">{location.hours}</p>
        </div>

        {/* Map Link Button */}
        <a
          href={location.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-500 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
        >
          <span>View on Map</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

// Main Component
const ShopLocations = () => {
  return (
    <div className="py-16 bg-gray-50 font-['Inter',_sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Our Presence
          </h2>
           <p className="text-4xl font-bold text-slate-800">Find Your Nearest Store..</p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopLocations;
