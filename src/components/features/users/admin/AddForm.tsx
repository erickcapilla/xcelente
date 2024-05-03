import { ButtonUI, TextField } from "../../ui";
import { EyeSlashFilledIcon, EyeFilledIcon } from "@icons/index";
import { useState } from "react";
import { useUser, useAuth } from "@src/hooks";
import { useNavigate } from "react-router-dom";

export const AddForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { signup, logout } = useAuth();
  const { handleAddUser } = useUser();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser = {
      fullName: user.fullName,
      isAdmin: true,
    };

    try {
      await signup(user.email, user.password);
      await handleAddUser(user.email, newUser);
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-[400px] mx-auto"
      onSubmit={handleSubmit}
    >
      <TextField
        name="fullName"
        type="text"
        label="Nombre completo"
        placeholder="Ingresa tu nombre completo"
        isRequired
        autoFocus
        value={user.fullName}
        onChange={handleChange}
        autoComplete="username"
      />
      <TextField
        name="email"
        label="Correo electrónico"
        placeholder="Ingresa tu correo electrónico"
        isRequired
        value={user.email}
        onChange={handleChange}
        autoComplete="email"
      />
      <TextField
        type={isVisible ? "text" : "password"}
        label="Contraseña"
        placeholder="Ingresa tu contraseña"
        name="password"
        endContent={
          <button
            className="focus:outline-none mb-1"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
          </button>
        }
        isRequired
        value={user.password}
        onChange={handleChange}
        autoComplete="new-password"
      />
      <TextField
        type={isVisible ? "text" : "password"}
        label="Confirmar Contraseña"
        placeholder="Ingresa la misma contraseña"
        name="confirmPassword"
        endContent={
          <button
            className="focus:outline-none mb-1"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
          </button>
        }
        isRequired
        value={user.confirmPassword}
        onChange={handleChange}
        autoComplete="new-password"
      />
      <ButtonUI type="submit" className="w-full" color="primary">
        Crear cuenta
      </ButtonUI>
    </form>
  );
};
