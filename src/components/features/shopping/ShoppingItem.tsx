import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Check } from "@icons/index";

export const ShoppingItem = () => {
  return (
    <Card
      className="max-w-80 w-full border-t-secondary border-t-5 justify-self-center h-[120px]"
      shadow="sm"
      radius="sm"
    >
      <CardHeader className="w-full font-bold text-primary justify-center h-auto p-0 pt-3">
        Nombre producto
      </CardHeader>
      <CardBody className="p-0 pb-3 flex items-center justify-center">
        <ProgressBar percent={40} filledBackground="#45D483" width={200}>
          <Step transition="scale">
            {({ accomplished }) => (
              <div className="flex flex-col gap-1 items-center justify-center mt-3 ml-4">
                <Check color={accomplished ? "#17C964" : "#D4D4D8"} size={30} />
                <p className="text-primary text-[.5rem] font-bold">Solicitado</p>
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
      </CardBody>
    </Card>
  );
};
