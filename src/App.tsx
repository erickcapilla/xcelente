import { NextUIProvider } from "@nextui-org/react";

import { useNavigate } from "react-router-dom";
import { RoutesMain } from "./routes";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import "@css/App.css";
import {
  ProductsProvider,
  CategoriesProvider,
  AuthProvider,
  UserProvider,
} from "./context";

const initialOptions = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: "MXN",
  intent: "capture",
};

const App = () => {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <AuthProvider>
        <UserProvider>
          <PayPalScriptProvider options={initialOptions}>
            <ProductsProvider>
              <CategoriesProvider>
                <RoutesMain />
              </CategoriesProvider>
            </ProductsProvider>
          </PayPalScriptProvider>
        </UserProvider>
      </AuthProvider>
    </NextUIProvider>
  );
};

export default App;
