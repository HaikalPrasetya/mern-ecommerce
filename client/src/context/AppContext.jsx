import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../apiClient";
import { loadStripe } from "@stripe/stripe-js";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [totalPrice, setTotalPrice] = useState(
    sessionStorage.getItem("total") || 0
  );
  const [productsId, setProductsId] = useState(
    sessionStorage.getItem("ids") || []
  );
  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: apiClient.getMe,
  });
  if (isLoading) return null;
  const stripePromises = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);
  return (
    <AppContext.Provider
      value={{
        user,
        stripePromises,
        totalPrice,
        setTotalPrice,
        productsId,
        setProductsId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
