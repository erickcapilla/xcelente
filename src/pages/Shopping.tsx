import { Header } from "@src/components/features/ui";
import { ShoppingList } from "@src/components/features/shopping";
import { ScrollShadow } from "@nextui-org/react";
import { useUser } from "@src/hooks";
import { getReport } from "@src/services/firebase/api";
import { DocumentData } from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Report } from "@src/components/features/report";

export const Shopping = () => {
  const { user, users, handleGetUsers } = useUser();
  const [shoppings, setShoppings] = useState<DocumentData[]>([]);

  const handleGetAllShoppings = useCallback(async () => {
    try {
      const productsData: DocumentData[] = [];
      users.map(async (user) => {
        await getReport(user.id).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const docData = { ...user, product: doc.id, ...doc.data() };
            productsData.push(docData);
          });
          setShoppings(productsData);
        });
      });
    } catch (error) {
      console.error(error);
    }
  }, [users]);

  useEffect(() => {
    if (user.isAdmin) {
      if (users.length === 0) handleGetUsers();
      handleGetAllShoppings();
    }
  }, [user, handleGetAllShoppings, handleGetUsers, users]);

  return (
    <>
      <Header title={user.isAdmin ? "Pedidos" : "Mis compras"} />
      <main className="flex flex-col gap-y-1 ">
        {user.isAdmin && (
          <PDFDownloadLink
            document={<Report shoppings={shoppings} />}
            fileName="ReporteMensual"
            className="border-2 border-primary text-primary py-1 px-3 self-end w-auto rounded-md my-3"
          >
            Descargar reporte mensual
          </PDFDownloadLink>
        )}
        <ScrollShadow className="cards-container pb-1" size={5} hideScrollBar>
          <ShoppingList />
        </ScrollShadow>
      </main>
    </>
  );
};
