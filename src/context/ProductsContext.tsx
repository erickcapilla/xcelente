import { createContext, useState, useEffect, useCallback } from "react";
import { DocumentData } from "firebase/firestore";
import {
  saveProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  getProduct,
} from "@src/services/firebase/api";

type Filters = {
  category: "";
  min: "";
  max: "";
};

type Products = {
  products: DocumentData[];
  product: DocumentData;
  handleAddProduct: (product: DocumentData) => void;
  handleDeleteProduct: (id: string) => void;
  hanldeUpdateProduct: (id: string, updatedProduct: DocumentData) => void;
  handleGetProducts: () => void;
  handleGetProduct: (id: string) => void;
  filterProducts: (type: string, values: Filters) => void;
  loading: boolean;
};

export const ProductsContext = createContext<Products>({
  products: [],
  product: {},
  handleAddProduct: () => Promise<void>,
  handleDeleteProduct: () => Promise<void>,
  hanldeUpdateProduct: () => Promise<void>,
  handleGetProducts: () => Promise<void>,
  handleGetProduct: () => Promise<void>,
  filterProducts: () => {},
  loading: false,
});

interface Props {
  children?: React.ReactNode;
}

export const ProductsProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<DocumentData[]>([]);
  const [product, setProduct] = useState<DocumentData>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetProducts = useCallback(async () => {
    setLoading(true);
    try {
      const productsData: DocumentData[] = [];
      await getProducts().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const docData = { id: doc.id, ...doc.data() };
          productsData.push(docData);
        });
      });
      setProducts(productsData);
    } catch (error) {
      console.error("Error getting documents: ", error);
    } finally {
      setLoading(false);
    }
  }, [setProducts, setLoading]);

  const handleAddProduct = async (product: DocumentData) => {
    try {
      await saveProduct(product);
      setProducts([...products, product]);
    } catch (error) {
      console.log("Error adding document: ", error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts(
        products.filter((product: DocumentData) => product.id !== id)
      );
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const hanldeUpdateProduct = async (
    id: string,
    updatedProduct: DocumentData
  ) => {
    try {
      await updateProduct(id, updatedProduct);
      const productIndex = products.findIndex(
        (product: DocumentData) => product.id === id
      );
      if (productIndex !== -1) {
        const updatedProducts = [...products];
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          ...updatedProduct,
        };
        setProducts(updatedProducts);
        console.log("Product successfully updated!");
      } else {
        console.error("Product with ID", id, "not found for update.");
      }
    } catch (error) {
      console.log("Error adding document: ", error);
    }
  };

  const handleGetProduct = async (id: string) => {
    try {
      const res = await getProduct(id);
      setProduct(res.data() || {});
    } catch (error) {
      console.error(error);
    }
  };

  const filterProducts = (type: string, values: Filters) => {
    if(type === "category") {
      const filtered = products.filter(
        (product: DocumentData) => product.category === values.category)
      setProducts(filtered);
      console.log(products.filter(
        (product: DocumentData) => product.category === values.category))
    }
    if(type === "price") {
      const filtered = products.filter(
        (product: DocumentData) => parseInt(product.price) >= parseInt(values.min) && parseInt(product.price) <= parseInt(values.max)
      )
      setProducts(filtered);
      console.log(products.filter(
        (product: DocumentData) => parseInt(product.price) >= parseInt(values.min) && parseInt(product.price) <= parseInt(values.max)
      ))

      console.log("filtered: ", filtered)
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, [handleGetProducts]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        product,
        handleAddProduct,
        handleDeleteProduct,
        hanldeUpdateProduct,
        handleGetProducts,
        handleGetProduct,
        filterProducts,
        loading,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
