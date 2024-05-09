import { ShoppingItem } from "./ShoppingItem";
import { useEffect, useState, useCallback } from "react";
import { getShoppings } from "@src/services/firebase/api";
import { useAuth } from "@src/hooks";
import { DocumentData } from "firebase/firestore";

export const ShoppingList = () => {
  const [shoppings, setShoppings] = useState<DocumentData[]>([]);
  const { userAuthed } = useAuth();

  const handleGetShoppings = useCallback(async () => {
    try {
      const productsData: DocumentData[] = [];
      await getShoppings("erickpoblano25@gmail.com")
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const docData = { id: doc.id, ...doc.data() };
            productsData.push(docData);
          });
        })
        setShoppings(productsData);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {handleGetShoppings()}, [handleGetShoppings, userAuthed]);
  return (
    <>
      {shoppings.map((shopping) => {
        return <ShoppingItem shopping={shopping} key={shopping.id} />;
      })}
    </>
  );
};
