import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import EmptyCart from "../../ModalAndErrorOrEmptyPages/EmptyCart";
import { useContext, useEffect, useState } from "react";
import { CartDataContext } from "../allProductDataConext/cartDataContext";
import toast from "react-hot-toast";

export const Cart = ({ setLoginOpen }) => {
  const [subtotal, setSubtotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const { totalCartItem, setTotalCartItem } = useContext(CartDataContext);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token : ", token);

    if (token) {
      const decoded = jwtDecode(token);
      const user_id = decoded.id;
      axios
        .get(`${import.meta.env.VITE_PRODUCT_URL}/getcartitems`, {
          params: {
            user_id: user_id,
          },
        })
        .then((res) => {
          setCartItems(res.data.items);
          console.log("All cart items products load successful");
          const totalQty = res.data.items.reduce(
            (sum, item) => sum + Number(item.quantity),
            0
          );
          setTotalCartItem(totalQty);
        })

        .catch((err) => {
          console.log("error fetching all cart items", err);
        });
    } else {
      const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(localCart);

      const totalQty = localCart.reduce((sum, item) => sum + item.quantity, 0);
      setTotalCartItem(totalQty);

      console.log("Cart loaded from localStorage");
    }
  }, []);

  const shipping = 2;
  const tax = 4;
  const total = subtotal + shipping + tax;

  //delete cart item handler
  const handleCartItemDelete = (cartId, product_id, size) => {
    if (localStorage.getItem("token")) {
      axios
        .delete(`${import.meta.env.VITE_PRODUCT_URL}/deletecartitem`, {
          params: { cart_id: cartId },
        })

        .then((res) => {
          console.log(res.data.message);
          setCartItems((prevItems) => {
            const updated = prevItems.filter((item) => item.cart_id !== cartId);
            setTotalCartItem(updated.length);
            return updated;
          });
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    } else {
      const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];

      const updatedCart = localCart.filter(
        (item) => !(item.product_id === product_id && item.size === size)
      );

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      setCartItems(updatedCart);

      const totalQty = updatedCart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      setTotalCartItem(totalQty);

      console.log("Item deleted from localStorage");
    }
  };

  //Increment handler
  const incrementHandler = (item) => {
  if (localStorage.getItem("token")) {
    const updatedItems = cartItems.map((cartItem) => {
      if (cartItem.cart_id === item.cart_id) {
        const newQuantity = Number(cartItem.quantity) + 1;

        // backend patch
        axios
          .patch(`${import.meta.env.VITE_PRODUCT_URL}/updatecartitem`, {
            cart_id: cartItem.cart_id,
            quantity: newQuantity,
          })
          .then((res) => console.log(res.data.message))
          .catch((err) => console.log(err.response?.data?.message));

        setTotalCartItem((prev) => Number(prev) + 1);
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });

    setCartItems(updatedItems);
  } 
    else {
      const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];

      const updatedCart = localCart.map((ci) => {
        if (ci.product_id === item.product_id && ci.size === item.size) {
          const newQuantity = Number(ci.quantity) + 1;

          return {
            ...ci,
            quantity: newQuantity,

          };
        }
        return ci;
      });

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      setCartItems(updatedCart);

      // total quantity update
      const totalQty = updatedCart.reduce((sum, ci) => sum + Number(ci.quantity), 0);
      setTotalCartItem(totalQty);
    }
  };

  //decrement handler
  const decrementHandler = (item) => {
    if (localStorage.getItem("token")) {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) => {
          if (cartItem.cart_id === item.cart_id) {
            const newQuantity = Number(item.quantity) - 1;

            setCartItems((prev) =>
              prev.map((ci) =>
                ci.cart_id === item.cart_id
                  ? { ...ci, quantity: newQuantity}
                  : ci
              )
            );

            // totalCartItem update
            setTotalCartItem((prev) => Number(prev) - 1);

            // backend
            axios
              .patch(`${import.meta.env.VITE_PRODUCT_URL}/updatecartitem`, {
                cart_id: item.cart_id,
                quantity: newQuantity,
              })
              .then((res) => console.log(res.data.message))
              .catch((err) => console.log(err.response?.data?.message));

            return {
              ...cartItem,
              quantity: newQuantity,
            };
          } else {
            return cartItem;
          }
        })
      );
    } 

    else {
      const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];

      const updatedCart = localCart.map((ci) => {
        if (ci.product_id === item.product_id && ci.size === item.size) {
          const newQuantity = Number(ci.quantity) - 1;

          return {
            ...ci,
            quantity: newQuantity,
          };
        }
        return ci;
      });

      setCartItems(updatedCart);

      // total quantity update
      const totalQty = updatedCart.reduce((sum, ci) => sum + ci.quantity, 0);
      setTotalCartItem(totalQty);
    }
  };


  //subTotal 
const calculateSubtotal = (items) => {
    return items.reduce((total, item) => {
        const price = parseFloat(item.price); 
        const quantity = parseInt(item.quantity) || 0; 
        const price_value = isNaN(price) ? 0 : price;
        
        return total + (quantity * price_value);
    }, 0);
  };

  useEffect(() => {
    const newSubtotal = calculateSubtotal(cartItems);
    setSubtotal(newSubtotal);
  }, [cartItems]);

  //checkout page handler
  const checkoutPageHandler = () => {
    if (localStorage.getItem("token") && totalCartItem) {
      navigate("/checkout");
    } else if (localStorage.getItem("token") && !totalCartItem) {
      toast.error("Your cart is empty!");
    } else {
      setLoginOpen(true);
    }
  };

  return (
    <div className="max-w-5xl max-lg:max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-semibold text-slate-900">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 lg:gap-x-8 gap-x-6 gap-y-8 mt-6">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.length == 0 ? (
            <EmptyCart />
          ) : (
            cartItems.map((items) => {
              return (
                <div className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-sm border border-gray-200">
                  <div className="flex gap-6 sm:gap-4 max-sm:flex-col">
                    <div className="w-24 h-24 max-sm:w-24 max-sm:h-24 shrink-0">
                      <img
                        loading="lazy"
                        onClick={() =>
                          navigate(`/productdetails/${items.product_id}`)
                        }
                        src={items.image}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                          {items.name}
                        </h3>
                        <p className="text-purple-700">Size : {items.size}</p>
                      </div>

                      <div className="mt-auto">
                        <h3 className="text-sm font-semibold text-slate-900">
                          $ {Number(items.price).toFixed(2)}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="ml-auto flex flex-col">
                    <div className="flex items-start gap-4 justify-end">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 cursor-pointer fill-slate-400 hover:fill-pink-600 inline-block"
                        viewBox="0 0 64 64"
                      >
                        <path
                          d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                          data-original="#000000"
                        ></path>
                      </svg>

                      {/* delete button */}
                      <svg
                        onClick={() =>
                          handleCartItemDelete(
                            items.cart_id,
                            items.product_id,
                            items.size
                          )
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 cursor-pointer fill-red-600 hover:fill-red-700 inline-block"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                          data-original="#000000"
                        ></path>
                        <path
                          d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                    <div className="flex items-center gap-3 mt-auto">
                      {/* decrement button */}
                      <button
                        onClick={() => decrementHandler(items)}
                        type="button"
                        disabled={items.quantity <= 1}
                        className={`flex items-center justify-center w-[18px] h-[18px] rounded-full outline-none 
                         ${
                           items.quantity <= 1
                             ? "bg-gray-300 cursor-not-allowed"
                             : "bg-slate-400 cursor-pointer"
                         }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-2 fill-white"
                          viewBox="0 0 124 124"
                        >
                          <path
                            d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </button>

                      <span className="font-semibold text-base leading-[18px]">
                        {items.quantity}
                      </span>

                      {/* increment button */}
                      <button
                        onClick={() => incrementHandler(items)}
                        type="button"
                        disabled={items.quantity >= items.stock}
                        className={`flex items-center justify-center w-[18px] h-[18px] cursor-pointer outline-none rounded-full ${
                          items.quantity >= items.stock
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-slate-800 hover:bg-slate-900 text-white"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-2 fill-white"
                          viewBox="0 0 42 42"
                        >
                          <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="bg-white rounded-md px-4 py-6 h-max shadow-sm border border-gray-200">
          <ul className="text-slate-500 font-medium space-y-4">
            <li className="flex flex-wrap gap-4 text-sm">
              Subtotal{" "}
              <span className="ml-auto font-semibold text-green-600">
                $ {Number(subtotal).toFixed(2)}
              </span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Shipping{" "}
              <span className="ml-auto font-semibold text-red-600">
                $ {Number(shipping).toFixed(2)}
              </span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Tax{" "}
              <span className="ml-auto font-semibold text-red-600">
                $ {Number(tax).toFixed(2)}
              </span>
            </li>
            <hr className="border-slate-300" />
            <li className="flex flex-wrap gap-4 text-sm font-semibold text-slate-900">
              Total <span className="ml-auto">${Number(total).toFixed(2)}</span>
            </li>
          </ul>
          <div className="mt-8 space-y-4">
            <button
              onClick={checkoutPageHandler}
              type="button"
              className="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-slate-800 hover:bg-slate-900 text-white rounded-md cursor-pointer"
            >
              Buy Now
            </button>
            <button
              onClick={() => navigate("/shop")}
              type="button"
              className="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-slate-50 hover:bg-slate-100 text-slate-900 border border-gray-300 rounded-md cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-4">
            <img
              src="https://readymadeui.com/images/master.webp"
              alt="card1"
              className="w-10 object-contain"
            />
            <img
              src="https://readymadeui.com/images/visa.webp"
              alt="card2"
              className="w-10 object-contain"
            />
            <img
              src="https://readymadeui.com/images/american-express.webp"
              alt="card3"
              className="w-10 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
