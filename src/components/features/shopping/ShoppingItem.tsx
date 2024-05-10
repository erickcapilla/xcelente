import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { Card, CardBody, CardHeader, Button, Divider } from "@nextui-org/react";
import { Check } from "@icons/index";
import { DocumentData } from "firebase/firestore";
import { status } from "@src/utils/utils";
import { useUser } from "@src/hooks";
import { useState } from "react";
import { updateShopping } from "@src/services/firebase/api";

interface Props {
  shopping: DocumentData;
}

export const ShoppingItem = ({ shopping }: Props) => {
  const { user } = useUser();
  const [statusNow, setStatusNow] = useState(shopping.status);

  const handleNextStep = async () => {
    let status = statusNow;

    if (status === "one") {
      setStatusNow("two");
      status = "two";
      await updateShopping(shopping.id, shopping.product, { status });
      return;
    }
    if (status === "two") {
      setStatusNow("three");
      status = "three";
      await updateShopping(shopping.id, shopping.product, { status });
      return;
    }
    if (status === "three") {
      setStatusNow("four");
      status = "four";
      await updateShopping(shopping.id, shopping.product, { status });
      return;
    }
  };

  const handleBeforeStep = async () => {
    let status = statusNow;

    if (status === "two") {
      setStatusNow("one");
      status = "one";
      await updateShopping(shopping.id, shopping.product, { status });
    }
    if (status === "three") {
      setStatusNow("two");
      status = "two";
      await updateShopping(shopping.id, shopping.product, { status });
    }
    if (status === "four") {
      setStatusNow("three");
      status = "three";
      await updateShopping(shopping.id, shopping.product, { status });
    }
  };

  return (
    <Card
      className={`max-w-80 w-full border-t-secondary border-t-5 justify-self-center ${
        user.isAdmin ? "h-[250px]" : "h-[150px]"
      }`}
      shadow="sm"
      radius="sm"
    >
      <CardHeader className="w-full font-bold text-primary justify-center h-auto p-0 py-2">
        {shopping.name}
      </CardHeader>
      <Divider />
      <CardBody
        className={`flex gap-8 items-center h-full w-full ${
          user.isAdmin && "justify-between"
        }`}
      >
        <div className="w-full text-sm flex items-center justify-between mb-[-.5rem]">
          <div className="text-center h-auto w-1/2">
            <p className="text-black text-xs"> {shopping.fullName} </p>
            <p className="text-gray-500 mt-[-.3rem] text-[.6rem]">
              {" "}
              {shopping.id}{" "}
            </p>
          </div>
          <p className="text-gray-500 text-xs"> {shopping.address} </p>
        </div>
        <ProgressBar
          percent={status[statusNow]}
          filledBackground="#45D483"
          width={200}
        >
          <Step transition="scale">
            {({ accomplished }) => (
              <div className="flex flex-col gap-1 items-center justify-center mt-3 ml-4">
                <Check color={accomplished ? "#17C964" : "#D4D4D8"} size={30} />
                <p className="text-primary text-[.5rem] font-bold">
                  Solicitado
                </p>
              </div>
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished }) => (
              <div className="flex flex-col gap-1 items-center justify-center mt-3">
                <Check color={accomplished ? "#17C964" : "#D4D4D8"} size={30} />
                <p className="text-primary text-[.5rem] font-bold">Preparado</p>
              </div>
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished }) => (
              <div className="flex flex-col gap-1 items-center justify-center mt-3">
                <Check color={accomplished ? "#17C964" : "#D4D4D8"} size={30} />
                <p className="text-primary text-[.5rem] font-bold">En camino</p>
              </div>
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished }) => (
              <div className="flex flex-col gap-1 items-center justify-center mt-3 ml-[-16px]">
                <Check color={accomplished ? "#17C964" : "#D4D4D8"} size={30} />
                <p className="text-primary text-[.5rem] font-bold">Entregado</p>
              </div>
            )}
          </Step>
        </ProgressBar>
        {user.isAdmin && (
          <div className="flex items-center justify-between w-full">
            <Button
              variant="ghost"
              color="secondary"
              radius="sm"
              size="sm"
              onPress={handleBeforeStep}
            >
              Anterior
            </Button>
            <Button
              variant="solid"
              color="primary"
              radius="sm"
              size="sm"
              onPress={handleNextStep}
            >
              Siguiente
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
