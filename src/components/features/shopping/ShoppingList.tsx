import { ShoppingItem } from "./ShoppingItem";
import { useEffect, useState, useCallback } from "react";
import { getShoppings } from "@src/services/firebase/api";
import { useAuth, useUser } from "@src/hooks";
import { DocumentData } from "firebase/firestore";

export const ShoppingList = () => {
  const [shoppings, setShoppings] = useState<DocumentData[]>([]);
  const { userAuthed } = useAuth();
  const { handleGetUsers, users, user } = useUser();

  const handleGetShoppings = useCallback(async () => {
    try {
      const productsData: DocumentData[] = [];
      await getShoppings(userAuthed.email).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const docData = { ...doc.data() };
          productsData.push(docData);
        });
      });
      setShoppings(productsData);
    } catch (error) {
      console.error(error);
    }
  }, [userAuthed]);

  const handleGetAllShoppings = useCallback(async () => {
    try {
      const productsData: DocumentData[] = [];
      users.map(async user => {
        await getShoppings(user.id).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const docData = { ...user, product: doc.id,  ...doc.data() };
            productsData.push(docData);
          });
          setShoppings(productsData);
        });
      })
    } catch (error) {
      console.error(error)
    }
  }, [users])

  useEffect(() => {
    if(user.isAdmin) {
      if(users.length === 0) handleGetUsers()
      handleGetAllShoppings()
    } else {
      handleGetShoppings();
    }
  }, [handleGetShoppings, user, handleGetAllShoppings, handleGetUsers, users]);

  return (
    <>
      {shoppings.map((shopping) => {
        return <ShoppingItem shopping={shopping} key={shopping.id} />;
      })}
    </>
  );
};
