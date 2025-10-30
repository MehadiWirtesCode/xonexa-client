import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import CartSuccessModal from "../ModalAndErrorOrEmptyPages/CartSuccessModal";
import { CartDataContext } from "./allProductDataConext/cartDataContext";
import toast from "react-hot-toast";

export const ProductDetails = () => {
  const { id } = useParams();

  const [productDetails, setProductDetails] = useState();
  const [selectedSize, setSelectedSize] = useState("MD");
  const [openModal, setOpenModal] = useState(false);
  const { setTotalCartItem } = useContext(CartDataContext);

  const sizes = ["S", "M", "L", "XL"];

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_PRODUCT_URL}/getproductdetails/${id}`)
      .then((res) => {
        console.log(res.data.message);
        setProductDetails(res.data.productDetails);
      })

      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [id]);

  //handle add cart item
  const handelAddCart = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("Token : ", token);
    const maxStock =
      productDetails?.sizes?.[selectedSize] ?? productDetails?.stock ?? 0;

    if (token) {
      const decoded = jwtDecode(token);
      const user_id = decoded.id;

      axios
        .post(`${import.meta.env.VITE_PRODUCT_URL}/setcartitem`, {
          product: productDetails,
          stock: productDetails.sizes[selectedSize] || productDetails.stock,
          user_id,
          selectedSize: productDetails?.sizes ? selectedSize : null,
        })

        .then((res) => {
          setOpenModal(true);
          setTotalCartItem((prev) => Number(prev) + 1);
          console.log(res.data.message);
        })

        .catch((err) => {
          toast.error(err.response.data.message)
          console.log(err.response.data.message);
        });
    } else {
      const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];

      const existingItemIndex = existingCart.findIndex(
        (item) =>
          item.product_id === productDetails.id && item.size === selectedSize
      );

      if (existingItemIndex !== -1) {
        const currentQty = existingCart[existingItemIndex].quantity || 1;

        if (currentQty >= maxStock) {
          toast.error("You’ve reached the maximum stock limit for this product!");
          return;
        }

        existingCart[existingItemIndex].quantity = currentQty + 1;
      } else {
        existingCart.push({
          product_id: productDetails.id,
          name: productDetails.name,
          size: selectedSize,
          image: productDetails.images[0],
          price: productDetails.price * (1 - productDetails.discount / 100),
          discount: productDetails.discount || 0,
          quantity: 1,
          stock: productDetails?.sizes[selectedSize],
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(existingCart));

      const totalQty = existingCart.reduce(
          (sum, item) => sum + Number(item.quantity), 0
      );
      setTotalCartItem(totalQty);
      console.log("Item added/updated successfully");
    }
  };

  return (
    <>
      <div className="p-2 lg:p-20">
        <div className="grid items-start grid-cols-1 lg:grid-cols-3">
          <div className="col-span-2 grid grid-cols-2 lg:sticky top-0 gap-0.5">
            <div className="columns-2 gap-0.5 space-y-0.5">
              <div className="overflow-hidden">
                <img
                  loading="lazy"
                  src={
                    productDetails?.images[0]}

                  alt={productDetails?.name}
                  className="w-full aspect-[253/337] object-cover object-top shadow-md hover:scale-[1.05] transition-all duration-300"
                />
              </div>
              <div className="overflow-hidden">
                <img
                  loading="lazy"
                  src={
                    productDetails?.images[1]}
                  alt={productDetails?.name}
                  className="w-full aspect-[253/337] object-cover object-top shadow-md hover:scale-[1.05] transition-all duration-300"
                />
              </div>
              <div className="overflow-hidden">
                <img
                  loading="lazy"
                  src={
                    productDetails?.images[2]}
                  alt={productDetails?.name}
                  className="w-full aspect-[253/337] object-cover object-top shadow-md hover:scale-[1.05] transition-all duration-300"
                />
              </div>
              <div className="overflow-hidden">
                <img
                  loading="lazy"
                  src={
                    productDetails?.images[3]}
                  alt={productDetails?.name}
                  className="w-full aspect-[253/337] object-cover object-top shadow-md hover:scale-[1.05] transition-all duration-300"
                />
              </div>
            </div>
            <div className="overflow-hidden">
              <img
                loading="lazy"
                src={
                  productDetails?.images[4]}
                alt={productDetails?.name}
                className="w-full aspect-[3/4] object-cover object-top shadow-md hover:scale-[1.05] transition-all duration-300"
              />
            </div>
          </div>

          <div className="py-6 px-8 max-lg:max-w-2xl">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {productDetails?.name}
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                Well-Versed Commerce
              </p>
            </div>

            <div className="mt-8">
              <div className="flex items-center flex-wrap gap-4">
                <p className="text-slate-900 text-4xl font-semibold">
                  $
                  {(
                    productDetails?.price *
                    (1 - productDetails?.discount / 100)
                  ).toFixed(2)}
                </p>
                <p className="text-xl mt-2 text-red-700">
                  <span>$</span>
                  <strike>{productDetails?.price}</strike>
                  <span className="ml-1">
                    discount ({productDetails?.discount}%)
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-8">
              {[
                "tops",
                "t shirts",
                "jackets",
                "pants",
                "denim",
                "active wear",
                "sweat wear",
              ].includes(productDetails?.category) ? (
                <>
                  <h3 className="text-xl font-semibold text-slate-900">
                    Choose a Size
                  </h3>

                  <div className="flex flex-wrap gap-4 mt-4">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 cursor-pointer border text-sm font-semibold rounded-full flex items-center justify-center transition-all duration-200 
                      ${
                        selectedSize === size
                          ? "border-slate-800 bg-slate-800 text-white shadow-md scale-105"
                          : "border-gray-300 text-slate-900 hover:border-slate-800 hover:scale-105 hover:bg-gray-100"
                      }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <h1 className="font-bold">
                  Stock Left :{" "}
                  <span className="text-green-600">
                    {productDetails?.stock}
                  </span>
                </h1>
              )}
            </div>

            <div className="mt-8 space-y-4">
              <button
                onClick={handelAddCart}
                type="button"
                className="w-full px-4 py-2.5 cursor-pointer border border-slate-800 bg-transparent hover:bg-slate-50 active:bg-blue-600 active:text-white text-slate-900 text-sm font-medium rounded-md"
              >
                Add to cart
              </button>
              <button
                type="button"
                className="w-full px-4 py-2.5 cursor-pointer border border-slate-800 bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium rounded-md"
              >
                Buy now
              </button>
            </div>

            <div className="mt-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Product Description
                </h3>
                <p className="text-sm text-slate-500 mt-4">
                  {productDetails?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openModal && (
        <CartSuccessModal
          productDetails={productDetails}
          setOpenModal={setOpenModal}
          selectedSize={selectedSize}
        />
      )}
    </>
  );
};
