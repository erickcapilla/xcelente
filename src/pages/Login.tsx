import "@css/App.css";

import { LoginForm } from "@components/features/users";
import { ButtonUI, Header } from "@src/components/features/ui";
import { Link } from "@nextui-org/react";

export const Login = () => {
  return (
    <>
      <Header title="XCELENTE" />
      <main className="flex flex-col justify-center gap-5 w-screen">
        <LoginForm />
        <ButtonUI
          as={Link}
          href="/signup"
          variant="ghost"
          color="secondary"
          className="max-w-[400px] w-full mx-auto font-bold"
        >
          Crear cuenta
        </ButtonUI>
      </main>
    </>
  );
};
