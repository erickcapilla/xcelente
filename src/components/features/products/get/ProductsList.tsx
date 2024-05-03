import { DocumentData } from "firebase/firestore";
import { ProductItem } from "./ProductItem";
import { useProducts } from "@src/hooks";


export const ProductList = () => {
  const { products } = useProducts(); 

  return (
    <>
      {products.map((product: DocumentData) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </>
  );
};
