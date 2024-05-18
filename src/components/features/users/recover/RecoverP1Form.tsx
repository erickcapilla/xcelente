import { ButtonUI, TextField } from "../../ui";
import { useState } from "react";
import { useAuth } from "@src/hooks";

export const RecoverP1Form = () => {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    try {
      await resetPassword(email);
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="grid gap-y-2 text-black" onSubmit={handleSubmit}>
      <TextField
        isRequired
        name="name"
        type="text"
        label="Correo electrónico"
        placeholder="Ingresa tu correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <ButtonUI
        color="primary"
        variant="solid"
        type="submit"
        className="mt-2 h-10"
      >
        Recuperar
      </ButtonUI>
    </form>
  );
};
