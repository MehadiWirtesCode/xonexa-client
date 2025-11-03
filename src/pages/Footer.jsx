import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Main section start */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-y-10 md:gap-x-12 lg:gap-x-16">
          {/* left section start*/}
          <div className="md:col-span-2 md:pr-8 border-b md:border-b-0 md:border-r border-gray-700 pb-8 md:pb-0">
            <h3 className="text-xl font-bold text-blue-400 tracking-tight">
              Stay Ahead. Get Updates.
            </h3>
            <p className="mt-3 text-sm text-gray-400">
              Join our mailing list for product news, exclusive insights, and
              tips directly to your inbox.
            </p>

            <form className="mt-6">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-t-md focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toast.error(`Subscription service not available`);
                }}
                type="submit"
                className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-b-md hover:bg-blue-700 transition"
              >
                Subscribe Now
              </button>
            </form>
          </div>

          {/*middle navigation links*/}
          <div className="md:col-span-2 grid grid-cols-2 gap-8 md:pl-8">
            {/* Column Company & Support*/}
            <div>
              <h3 className="text-base font-semibold text-white tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <NavLink
                    to="/about-us"
                    className="text-sm text-gray-400 hover:text-blue-400 transition"
                  >
                    Our Story
                  </NavLink>
                </li>
                <li>
                  <a
                    href="/careers"
                    className="text-sm text-gray-400 hover:text-blue-400 transition"
                  >
                    Careers{" "}
                    <span className="text-xs bg-blue-600 px-2 py-0.5 rounded ml-1">
                      Hiring!
                    </span>
                  </a>
                </li>
                <li>
                  <NavLink
                    to="/blog"
                    className="text-sm text-gray-400 hover:text-blue-400 transition"
                  >
                    Blog
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/press"
                    className="text-sm text-gray-400 hover:text-blue-400 transition"
                  >
                    Press Kit
                  </NavLink>
                </li>
              </ul>

              <h3 className="text-base font-semibold text-white tracking-wider uppercase mt-6">
                Shop
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <NavLink
                    to="/shop"
                    className="text-sm text-gray-400 hover:text-blue-400 transition"
                  >
                    Shop All
                  </NavLink>
                </li>
                <li>
                  <a
                    href="/pricing"
                    className="text-sm text-gray-400 hover:text-blue-400 transition"
                  >
                    Pricing Plans
                  </a>
                </li>
              </ul>
            </div>

            {/*Support/Legal */}
            <div>
              <h3 className="text-base font-semibold text-white tracking-wider uppercase">
                Support & Legal
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <NavLink
                    to="/faq"
                    className="text-sm text-gray-400 hover:text-blue-400 transition"
                  >
                    FAQ Center
                  </NavLink>
                </li>
                <li>
                  <a
                    href="/support"
                    className="text-sm text-gray-400 hover:text-blue-400 transition"
                  >
                    Customer Support
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-sm text-gray-400 hover:text-blue-400 transition"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-sm text-gray-400 hover:text-blue-400 transition"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-1 md:pl-8 pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-gray-700">
            <div className="flex items-center space-x-2">
              <img
                className="w-auto h-10 rounded-full"
                src="/public/images/logo.png"
                alt="Xonexa logo"
              />
              <span className="text-2xl font-extrabold text-blue-400">
                Xonexa
              </span>
            </div>
            <p className="mt-4 text-xs text-gray-400 leading-relaxed">
              "Driving digital excellence through innovative solutions."
            </p>

            <div className="mt-6 space-y-3">
              <a
                href="mailto:mehedihassan6838@gmail.com"
                className="flex items-center text-gray-400 hover:text-white transition"
              >
                <FaEnvelope className="h-3 w-3 mr-3 text-blue-500" />{" "}
                mehedihassan6838@gmail.com
              </a>
              <a
                href="tel:+8801724953889"
                className="flex items-center text-gray-400 hover:text-white transition"
              >
                <FaPhoneAlt className="h-3 w-3 mr-3 text-blue-500" />{" "}
                +8801724953889
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-3 mt-6">
              <a
                href="#"
                title="Facebook"
                className="text-gray-400 hover:text-blue-600 transition duration-200"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="#"
                title="Twitter"
                className="text-gray-400 hover:text-blue-400 transition duration-200"
              >
                <FaTwitter size={16} />
              </a>
              <a
                href="#"
                title="Instagram"
                className="text-gray-400 hover:text-pink-600 transition duration-200"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="#"
                title="LinkedIn"
                className="text-gray-400 hover:text-blue-700 transition duration-200"
              >
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>
        </div>

        <hr className="mt-12 border-gray-700" />

        {/* Copyright section start*/}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6">
          <p className="text-sm text-gray-500 order-2 md:order-1 mt-4 md:mt-0">
            © {new Date().getFullYear()} Xonexa. All rights reserved.
          </p>
          <div className="text-sm text-gray-500 order-1 md:order-2">
            <p>Made with ❤️ in Jessore.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
