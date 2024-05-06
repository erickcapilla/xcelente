import { ButtonUI, TextField } from "../../ui";
import { Textarea, Link } from "@nextui-org/react";
import { useState } from "react";
import { useAuth, useUser } from "@src/hooks";
import { useNavigate } from "react-router-dom";

export const EditForm = () => {
  const { userAuthed } = useAuth();
  const { user, handleUpdateUser } = useUser();
  const navigate = useNavigate();
  const [userValues, setUserValues] = useState({
    fullName: user.fullName,
    address: user.address,
    phone: user.phone,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUserValues({ ...userValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    console.log(user, userAuthed.email)
    try {
      await handleUpdateUser(userAuthed?.email || '', userValues);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
    console.log("Submit");
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-y-2 text-black">
      <TextField
        isRequired
        type="text"
        name="fullName"
        label="Nombre completo"
        placeholder="Ingresa tu nombre completo"
        autoFocus
        defaultValue={user.fullName}
        value={userValues?.fullName}
        onChange={handleChange}
      />
      <TextField
        isRequired
        type="email"
        name="email"
        label="Correo electrónico"
        placeholder="Ingresa tu correo electrónico"
        defaultValue={userAuthed.email || ""}
        value={userAuthed?.email || ""}
        onChange={() => {}}
        readOnly
      />
      <Textarea
        color="primary"
        radius="sm"
        variant="bordered"
        isRequired
        type="text"
        name="address"
        label="Dirección"
        placeholder="Ingresa tu dirección"
        defaultValue={user.address}
        value={userValues?.address}
        onChange={handleChange}
      />
      <TextField
        isRequired
        type="number"
        name="phone"
        label="Número de telefono"
        placeholder="Ingresa tu numero de telefono"
        defaultValue={user.phone}
        value={userValues?.phone}
        onChange={handleChange}
      />
      <div className="w-full flex gap-3">
        <ButtonUI as={Link}  href="/new-password" color="secondary" variant="ghost" className="w-full">
          Cambiar contraseña
        </ButtonUI>
        <ButtonUI type="submit" color="primary" className="w-full">
          Guardar
        </ButtonUI>
      </div>
    </form>
  );
};
