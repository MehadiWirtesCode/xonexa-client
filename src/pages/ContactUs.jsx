import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsappSquare,
  FaLinkedin,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700  mb-1"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={id}
      id={id}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="block w-full rounded-lg border-gray-300  
        py-3 px-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
        transition duration-150 ease-in-out shadow-sm"
    />
  </div>
);


const TextAreaField = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  required = false,
}) => (
  <div className="mb-6">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700  mb-1"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      name={id}
      id={id}
      rows="4"
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="block w-full rounded-lg border-gray-300  
        py-3 px-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
        transition duration-150 ease-in-out shadow-sm"
    ></textarea>
  </div>
);

//  ContactInfoBlock components start  

const ContactInfoBlock = ({ Icon, title, content }) => (
  <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50  transition duration-300 hover:bg-gray-100 ">
    <div className="flex-shrink-0 pt-1">
      <Icon className="w-6 h-6 text-indigo-500" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900 ">{title}</h3>
      <p className="text-gray-600 ">{content}</p>
    </div>
  </div>
);


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 5000);

      console.log("Contact Form Submitted:", formData);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50  p-4 sm:p-8 font-['Inter',_sans-serif]">
      <div className="max-w-7xl mx-auto py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600  max-w-2xl mx-auto">
            We're here to help! Send us a message, and we'll get back to you as
            soon as possible.
          </p>
        </header>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">         
          <div className="lg:col-span-2 p-6 bg-white  rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900  mb-6 flex items-center">
              <MessageSquare className="w-6 h-6 mr-2 text-indigo-500" />
              Send Us a Message
            </h2>

            {isSubmitted ? (
              <div className="p-8 text-center bg-green-50  border border-green-300  rounded-xl transition duration-500 scale-100">
                <Send className="w-10 h-10 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-700 ">
                  Message Sent!
                </h3>
                <p className="text-green-600  mt-2">
                  Thank you for reaching out. We appreciate your patience and
                  will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    id="name"
                    label="Full Name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <InputField
                    id="email"
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <InputField
                  id="subject"
                  label="Subject"
                  placeholder="How can we help you today?"
                  value={formData.subject}
                  onChange={handleInputChange}
                />

                <TextAreaField
                  id="message"
                  label="Your Message"
                  placeholder="Tell us about your query, order number, or feedback..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full py-3 mt-4 flex items-center justify-center space-x-2
                    font-bold text-lg rounded-xl shadow-lg transition-all duration-300 transform
                    ${
                      isSubmitting
                        ? "bg-indigo-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/50"
                    }
                    text-white
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/*Contact details side*/}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900  mb-4">
              Our Details
            </h2>
            <div className="p-6 bg-white  rounded-2xl shadow-xl space-y-6">
              <ContactInfoBlock
                Icon={Phone}
                title="Phone"
                content={
                  <a
                    href="tel:+01724953889"
                    className="text-indigo-600  hover:underline"
                  >
                    +8801724953899
                  </a>
                }
              />
              <ContactInfoBlock
                Icon={Mail}
                title="Email Support"
                content={
                  <a
                    href="mailto:mehedihassan6838@gmail.com"
                    className="text-indigo-600  hover:underline"
                  >
                    mehedihassan6838@gmail.com
                  </a>
                }
              />
              <ContactInfoBlock
                Icon={MapPin}
                title="Visit Our Headquarters"
                content="123 R.N Road, Tech City, Jessore Khulna"
              />
            </div>

            {/* social icons */}
            <div className="w-full h-20 bg-gray-200 rounded-2xl shadow-xl flex items-center justify-evenly text-gray-500  text-sm">
              <a
                href="https://www.facebook.com/share/1DGT6Mu3F8/"
                target="_blank" rel="noopener noreferrer"
              >
                <FaFacebook className="text-4xl text-blue-600" />
              </a>
              <a
                href="https://www.instagram.com/iddebona70?igsh=N2ttZWc1YjRqa2Y="
                target="_blank" rel="noopener noreferrer"
              >
                <FaInstagram className="text-4xl text-pink-600" />
              </a>
              <a
                href="https://wa.me/8801724953889?text=Hello%20Mehadi!"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsappSquare className="text-4xl text-green-600" />
              </a>
              <a
                href="https://www.linkedin.com/in/md-mehadi-hasan-ariful-60bb30375/"
                target="_blank" rel="noopener noreferrer"
              >
                <FaLinkedin className="text-4xl text-blue-600" />
              </a>
              <a
                href="https://x.com/Mehadi_Hasan68?t=rdJriXK0C3Kvxl1xVsEnog&s=09"
                target="_blank" rel="noopener noreferrer"
              >
                <FaSquareXTwitter className="text-4xl text-black" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
