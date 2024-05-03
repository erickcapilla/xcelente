import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
} from "@nextui-org/react";

import { useAuth, useUser } from "@src/hooks";

import { EyeSlashFilledIcon, EyeFilledIcon } from "@icons/index";
import Logo from "@icons/logo.svg";
import { ButtonUI, TextField } from "../../ui";

export const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useAuth();
  const { handleGetUser } = useUser();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    try {
      await login(user.email, user.password);
      await handleGetUser(user.email)
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="max-w-[400px] w-full mx-auto h-auto">
      <CardHeader>
        <div className="flex gap-3 items-center mx-auto text-lg text-center">
          <img
            src={Logo}
            alt="Logo de la  plataforma"
            className="mx-auto"
            width={50}
          />
          <strong className="text-lg text-primary"> Iniciar sesión </strong>
        </div>
      </CardHeader>
      <CardBody>
        <form className="grid gap-y-7 text-black" onSubmit={handleSubmit}>
          <TextField
            name="email"
            type="email"
            label="Correo electrónico"
            placeholder="Ingresa tu correo electrónico"
            onChange={handleChange}
            value={user.email}
            autoComplete="email"
          />
          <TextField
            name="password"
            type={isVisible ? "text" : "password"}
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            onChange={handleChange}
            value={user.password}
            autoComplete="current-password"
            endContent={
              <button
                className="focus:outline-none mb-1"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
              </button>
            }
          />
          <ButtonUI type="submit" color="primary">
            Iniciar sesión
          </ButtonUI>
        </form>
      </CardBody>
      <CardFooter className="flex justify-center">
        <Link
          href="/recover-password-send-mail"
          color="secondary"
          underline="always"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </CardFooter>
    </Card>
  );
};
