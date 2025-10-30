import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AllProductProvider } from "./components/allProductDataConext/allProductConext.jsx";
import { UsersContext, UsersProvider } from "./contextApi/UserContextApi.jsx";
import { CartDataProvider } from "./components/allProductDataConext/cartDataContext.jsx";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
createRoot(document.getElementById("root")).render(
  <CartDataProvider>
    <UsersProvider>
      <AllProductProvider>
        <BrowserRouter>
          <GoogleOAuthProvider clientId={clientId}>
            <App />
          </GoogleOAuthProvider>
        </BrowserRouter>
      </AllProductProvider>
    </UsersProvider>
  </CartDataProvider>
);
