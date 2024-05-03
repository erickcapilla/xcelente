import { useContext } from "react";
import { ProductsContext } from "@context/index";

export const useProducts = () => {
  return useContext(ProductsContext)
}