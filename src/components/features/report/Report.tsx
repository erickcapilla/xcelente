import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { DocumentData } from "firebase/firestore";
import { months } from "@src/utils/utils";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
  },
  section: {
    flexDirection: "row",
    margin: 10,
    padding: 10,
    flexGrow: 1,
    justifyContent: "space-between",
  },
  products: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  }
});

interface Props {
  shoppings: DocumentData[];
}

// Create Document Component
export const Report = ({ shoppings }: Props) => {
  const month = months[new Date().getMonth()];
  const total = shoppings.reduce((acc, shopping) => acc + shopping.price, 0);

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.section}>
          <Text>XCELENTE</Text>
          <Text>Reporte de compras de {month}</Text>
        </View>
        {shoppings.map((shopping, index) => (
          <View key={shopping.id} style={styles.products}>
            <Text>{index}</Text>
            <Text>{shopping.name}</Text>
            <Text>{shopping.price}</Text>
          </View>
        ))}
        <View>
          <Text>Total: ${total}</Text>
        </View>
      </Page>
    </Document>
  );
};
