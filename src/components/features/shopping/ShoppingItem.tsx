import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import { Check } from "@icons/index";
import { DocumentData } from "firebase/firestore";
import { status } from "@src/utils/utils";
import { useUser} from "@src/hooks";
import { useState } from 'react'

interface Props {
  shopping: DocumentData;
}

export const ShoppingItem = ({ shopping }: Props) => {
  const { user  } = useUser()
  const [statusNow, setStatusNow] = useState(shopping.status)

  const handleNextStep = () => {
    if(statusNow === "one") setStatusNow("two")
    if(statusNow === "two") setStatusNow("three")
    if(statusNow === "three") setStatusNow("four")
  }

  const handleBeforeStep = () => {
    if(statusNow === "two") setStatusNow("one")
    if(statusNow === "three") setStatusNow("two")
    if(statusNow === "four") setStatusNow("three")
  }

  return (
    <Card
      className="max-w-80 w-full border-t-secondary border-t-5 justify-self-center h-[200px]"
      shadow="sm"
      radius="sm"
    >
      <CardHeader className="w-full font-bold text-primary justify-center h-auto p-0 pt-3">
        {shopping.name}
      </CardHeader>
      <CardBody className="grid gap-8 place-items-center h-full w-full">
        <ProgressBar percent={status[statusNow]} filledBackground="#45D483" width={200}>
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
        { user.isAdmin && (
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
