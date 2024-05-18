import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Header } from "@components/features/ui";
import Logo from "@icons/logo.svg";

interface Props {
  title: string;
  children?: React.ReactNode;
}

export const LayoutForm = ({ title, children }: Props) => {
  return (
    <>
      <Header title="XCELENTE" />
      <main className="flex flex-col pt-3 gap-5 w-screen">
        <Card className="max-w-[400px] w-full mx-auto h-auto shrink-1 text-black">
          <CardHeader>
            <div className="flex gap-3 items-center mx-auto tx-lg">
              <img
                src={Logo}
                alt="Logo de la  plataforma"
                className="mx-auto"
                width={50}
              />
              <strong className="text-lg text-primary">
                { title }
              </strong>
            </div>
          </CardHeader>
          <CardBody>{children}</CardBody>
        </Card>
      </main>
    </>
  );
};
