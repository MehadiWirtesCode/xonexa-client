import { useState, useMemo, useEffect } from "react";
import {
  Mail,
  MapPin,
  CreditCard,
  Lock,
  Package,
  CheckCircle,
} from "lucide-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { TbMoneybag } from "react-icons/tb";
import { useContext } from "react";
import { CartDataContext } from "../components/allProductDataConext/cartDataContext";
import toast from "react-hot-toast";

//  Input fields attributes
const InputField = ({
  id,
  label,
  type = "text",
  icon: Icon,
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
    <div className="relative rounded-md shadow-sm">
      {Icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      )}
      <input
        type={type}
        name={id}
        id={id}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          block w-full rounded-lg border-gray-300  
          py-3 pr-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
          transition duration-150 ease-in-out
          ${Icon ? "pl-10" : "pl-4"}
        `}
      />
    </div>
  </div>
);

const Checkout = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const user_id = decoded.id;
  const { setTotalCartItem } = useContext(CartDataContext);

  const [checkoutItems, setCheckoutItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_PRODUCT_URL}/getcheckoutproducts`, {
        params: { user_id: user_id },
      })
      .then((res) => {
        setCheckoutItems(res.data.items);
        setSubtotal(res.data.subtotal);
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const isFormValid = useMemo(() => {
    return (
      formData.email &&
      formData.fullName &&
      formData.address &&
      formData.cardNumber
    );
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid || isProcessing) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      axios
        .post(`${import.meta.env.VITE_API_URL}/setcheckoutdetails`, {
          user_id,
          formData,
          checkoutItems,
        })

        .then((res) => {
          setCheckoutItems([]);
          setSubtotal(0);
          setTotalCartItem(0);
          setIsOrderPlaced(true);
          console.log(res.data.message);
        })

        .catch((err) => {
          if (err.response?.status === 400 && err.response?.data?.errors) {
            err.response.data.errors.forEach((msg) => toast.error(msg));
          } else {
            toast.error(err.response?.data?.message || "Something went wrong!");
          }
          console.log(err.response.data.message);
        });
    }, 2000);
  };

  if (isOrderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50  font-['Inter',_sans-serif]">
        <div className="bg-white  p-8 sm:p-12 rounded-2xl shadow-2xl text-center max-w-lg mx-auto transform transition-all duration-500 scale-100">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-extrabold text-gray-900  mb-4">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600  mb-8">
            Thank you for your purchase. Your order confirmation has been sent
            to your email.
            <br />
            Total charged:{" "}
            <span className="font-bold text-indigo-600">
              ${Number(subtotal + 2 + 4).toFixed(2)}
            </span>
          </p>
          <button
            onClick={() => {
              setIsOrderPlaced(false);
              setFormData({
                email: "",
                fullName: "",
                address: "",
                city: "",
                zip: "",
                cardNumber: "",
                expDate: "",
                cvv: "",
              });
            }}
            className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-150"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50  p-4 sm:p-8 font-['Inter',_sans-serif]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 text-gray-900 ">
          Secure Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="lg:grid lg:grid-cols-5 lg:gap-10"
        >
          <div className="lg:col-span-3 space-y-8 p-6 bg-white  rounded-xl shadow-xl">
            <div>
              <h2 className="text-2xl font-bold text-gray-900  mb-4 flex items-center">
                <Mail className="w-6 h-6 mr-2 text-indigo-500" />
                Contact Information
              </h2>
              <InputField
                id="email"
                label="Email Address"
                type="email"
                icon={Mail}
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Shipping details start from here*/}
            <div>
              <h2 className="text-2xl font-bold text-gray-900  mb-4 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-indigo-500" />
                Shipping Details
              </h2>
              <InputField
                id="fullName"
                label="Full Name"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
              <InputField
                id="address"
                label="Street Address"
                placeholder="123 Main St"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  id="city"
                  label="City"
                  placeholder="New York"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <InputField
                  id="zip"
                  label="ZIP / Postal Code"
                  placeholder="10001"
                  value={formData.zip}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* 3. Payment details start from here*/}
            <div>
              <h2 className="text-2xl font-bold text-gray-900  mb-4 flex items-center">
                <CreditCard className="w-6 h-6 mr-2 text-indigo-500" />
                Payment Information
              </h2>
              <InputField
                id="cardNumber"
                label="Card Number"
                type="tel"
                placeholder="XXXX XXXX XXXX XXXX"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  id="expDate"
                  label="Expiration (MM/YY)"
                  placeholder="12/26"
                  value={formData.expDate}
                  onChange={handleInputChange}
                />
                <InputField
                  id="cvv"
                  label="CVV"
                  placeholder="123"
                  type="password"
                  value={formData.cvv}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500 ">
                <Lock className="w-4 h-4 mr-1" />
                Your information is safe and secure.
              </div>
            </div>
          </div>

          {/* Right section start */}
          <div className="lg:col-span-2 mt-8 lg:mt-0">
            <div className="sticky top-8 p-6 bg-white  rounded-xl shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900  mb-6">
                Order Summary
              </h2>

              {/* cart items list  */}
              <div className="space-y-4 border-b border-gray-200  pb-4 mb-4">
                {checkoutItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900 ">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 ">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-xs text-slate-950">
                          Size : {item.size}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-700 ">
                      ${item.price}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price overview*/}
              <div className="space-y-2 mb-6 text-gray-700 ">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium">$ {subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center">
                    <Package className="w-4 h-4 mr-1 text-indigo-400" />
                    Shipping ($2) :
                  </span>
                  <span className="font-medium text-red-600">
                    $ {(Number(subtotal) + 2).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <div className="flex justify-center items-center ">
                    <TbMoneybag className="flex items-center text-purple-700" />
                    <span className="ml-1">Tax ($4):</span>
                  </div>
                  <span className="font-medium text-red-600">
                    $ {(Number(subtotal) + 4).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-indigo-200  flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900 ">
                  Order Total:
                </span>
                <span className="text-3xl font-extrabold text-indigo-600 ">
                  $ {(Number(subtotal) + 2 + 4).toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || isProcessing || subtotal <= 0}
                className={`
                  w-full py-4 mt-6 flex items-center justify-center space-x-2
                  font-bold text-lg rounded-xl shadow-2xl transition-all duration-300 transform
                  ${
                    isFormValid && !isProcessing && subtotal > 0
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-600/50"
                      : "bg-gray-300 text-gray-600  cursor-not-allowed"
                  }
                `}
              >
                {isProcessing ? (
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
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Place Secure Order</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
