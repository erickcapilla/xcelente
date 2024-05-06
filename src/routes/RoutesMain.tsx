import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import {
  Products,
  Product,
  Shopping,
  Login,
  Add,
  Edit,
  Signup,
  RecoverP1,
  RecoverP2,
  AddAdmin,
  EditProfile,
} from "../pages";
import { useAuth } from "@src/hooks";
import { useUser } from "@src/hooks";

export const RoutesMain = () => {
  const { isAuth } = useAuth();
  const { user } = useUser();

  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={!isAuth} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route index path="/" element={<Products />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<Product />} />

      <Route element={<ProtectedRoute isAllowed={isAuth && user.isAdmin} />}>
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/new-admin" element={<AddAdmin />} />
      </Route>

      <Route element={<ProtectedRoute isAllowed={isAuth} />}>
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/new-password" element={<RecoverP2 />} />
      </Route>

      <Route path="/shopping" element={<Shopping />} />
      <Route path="/recover-password-send-mail" element={<RecoverP1 />} />
    </Routes>
  );
};
