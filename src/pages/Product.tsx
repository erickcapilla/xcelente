import Image from "@assets/producto.webp";
import { ButtonUI, Header } from "../components/features/ui";
import { useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Chip,
} from "@nextui-org/react";
import { useAuth, useCategories, useProducts } from "@src/hooks";
import { useParams, useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";

export const Product = () => {
  const { getCategoryNameById } = useCategories();
  const { isAuth } = useAuth();
  const { handleGetProduct, product } = useProducts();
  const { id } = useParams();
  const navigate = useNavigate();

  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "10",
          },
        },
      ],
    });
  };

  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then((details) => {
      const name = details.payer.name.given_name;
      alert(`Transaction completed by ${name}`);
    });
  };

  const handleBuy = () => {
    if (!isAuth) {
      navigate("/login");
      return;
    }
    alert("Compra realizada con éxito");
  };

  useEffect(() => {
    handleGetProduct(id || "");
  }, [handleGetProduct, id]);

  return (
    <>
      <Header title={"Comprar producto"} />
      <div className="w-full h-full p-3">
        <Card
          className="max-w-80 w-full border-t-secondary border-t-5 justify-self-center h-auto mx-auto"
          shadow="sm"
          radius="sm"
        >
          <div className="h-40">
            <img src={Image} alt="" className="w-full h-full object-cover" />
          </div>
          <CardHeader className="flex justify-between items-center">
            <strong className="text-primary"> {product.name} </strong>
            <strong className="text-gray-500 text-xs">${product.price}</strong>
          </CardHeader>
          <CardBody className="text-black h-[60px] text-sm">
            <p> {product.description} </p>
          </CardBody>
          <CardFooter className="flex flex-col gap-2 w-full">
            <div className="container flex justify-between items-center text-gray-500 text-xs">
              <div className="container">
                Disponibilidad: <strong>{product.availability}</strong>
              </div>
              <Chip
                color="secondary"
                variant="flat"
                size="sm"
                className="text-black"
              >
                {getCategoryNameById(product.category)}
              </Chip>
            </div>
            {isAuth ? (
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => onCreateOrder(data, actions)}
                onApprove={(data, actions) => onApproveOrder(data, actions)}
              />
            ) : (
              <ButtonUI
                color="primary"
                variant="solid"
                className="w-full mt-2 h-10 shrink-0 font-bold"
                size="md"
                onPress={handleBuy}
              >
                Inicia sesión para poder comprar
              </ButtonUI>
            )}
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
