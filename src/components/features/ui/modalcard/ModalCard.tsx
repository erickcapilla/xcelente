import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  title: string;
  body: ReactNode;
}

export const ModalCard = ({
  isOpen,
  onOpenChange,
  title,
  body,
}: ModalProps) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className="w-[300px]"
        disableAnimation
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="text-primary">{title}</ModalHeader>
              <ModalBody>{body}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};