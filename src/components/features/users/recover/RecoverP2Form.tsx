import { ButtonUI, TextField } from "../../ui";
import { EyeSlashFilledIcon, EyeFilledIcon } from "@icons/index";
import { useState } from "react";
import { useAuth } from '@src/hooks'
import { useNavigate } from "react-router-dom"

export const RecoverP2Form = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    }
    const [password, setPassword] = useState({
      password: '',
      new: '',
      confirm: '',
    })
    const { changePassword } = useAuth()
    const navigate = useNavigate()

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      setPassword({ ...password, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
      e.preventDefault()

      if(password.new === password.confirm) {
        try {
          await changePassword(password.password, password.new)
          navigate("/profile")
          console.log("Changed")
        } catch (e) {
          console.error(e)
        }
      }
    }

    return (
        <form className="grid gap-y-2 text-black" onSubmit={handleSubmit}>
            <TextField
                isRequired
                name="password"
                type={isVisible ? "text" : "password"}
                label="Contraseña actual"
                placeholder="Ingresa tu contraseña actual"
                autoFocus
                autoComplete="new-password"
                minLength={8}
                onChange={handleChange}
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
            <TextField
                isRequired
                name="new"
                type={isVisible ? "text" : "password"}
                label="Nueva contraseña"
                placeholder="Ingresa la nueva contraseña"
                autoComplete="new-password"
                minLength={8}
                onChange={handleChange}
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
            <TextField
                isRequired
                name="confirm"
                type={isVisible ? "text" : "password"}
                label="Confirmar contraseña"
                placeholder="Ingresa la misma contraseña"
                onChange={handleChange}
                autoComplete="new-password"
                minLength={8}
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
            <ButtonUI color="primary" variant="solid" type="submit" className="mt-2 h-10">
                Confirmar
            </ButtonUI>
        </form>
    );
};