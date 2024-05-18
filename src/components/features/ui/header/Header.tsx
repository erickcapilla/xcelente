import Logo from "@icons/logo.svg";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Navbar,
  NavbarContent,
  NavbarItem,
  User,
  Link,
} from "@nextui-org/react";
import { ButtonUI } from "../index";
import { useAuth, useUser } from "@src/hooks";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
}

export const Header = ({ title }: Props) => {
  const { isAuth, logout } = useAuth();
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setUser({});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="w-screen pl-6 text-primary flex items-center justify-between">
      <div className="flex items-center mt-2">
        <img src={Logo} alt="Logo de xcelente" width={35} />
        <h2 className="font-bold ml-1 text-sm max-[450px]:hidden">{title}</h2>
      </div>
      <Navbar className="p-0 w-auto">
        <NavbarContent
          className="w-auto flex justify-center gap-3"
          justify="end"
        >
          <NavbarItem className="flex gap-3">
            <Link href="/" className="font-bold text-xs" underline="always">
              Productos
            </Link>
            {isAuth && (
              <Link
                href="/shopping"
                className="font-bold text-xs"
                underline="always"
              >
                {user.isAdmin ? "Pedidos" : "Mis compras"}
              </Link>
            )}
          </NavbarItem>
          <NavbarItem className="w-auto cursor-pointer">
            <div className="flex justify-end">
              {isAuth ? (
                <Dropdown radius="sm" showArrow>
                  <DropdownTrigger>
                    <User
                      classNames={{
                        name: "font-bold text-xs",
                      }}
                      name={user.fullName}
                      avatarProps={{
                        src: "https://images.unsplash.com/broken",
                        size: "sm",
                        showFallback: true,
                      }}
                    />
                  </DropdownTrigger>
                  <DropdownMenu
                    className="text-black"
                    aria-label="Action event example"
                    onAction={(key) => {
                      key === "admin" && navigate("/new-admin");
                      key === "profile" && navigate("/profile");
                      key === "logout" && handleLogout();
                    }}
                  >
                    <DropdownSection showDivider>
                      <DropdownItem key="profile">Perfil</DropdownItem>
                    </DropdownSection>
                    {user.isAdmin && (
                      <DropdownSection showDivider>
                        <DropdownItem key="admin">
                          Agregar administrador
                        </DropdownItem>
                      </DropdownSection>
                    )}
                    <DropdownSection>
                      <DropdownItem key="logout" color="danger">
                        Cerrar sesión
                      </DropdownItem>
                    </DropdownSection>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <ButtonUI
                  as={Link}
                  href="/login"
                  className="font-bold text-xs"
                  color="secondary"
                  size="sm"
                  variant="flat"
                >
                  Iniciar sesión
                </ButtonUI>
              )}
            </div>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </header>
  );
};
