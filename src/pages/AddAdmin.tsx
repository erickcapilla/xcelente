import { AddForm } from "@src/components/features/users";
import { LayoutForm } from "@src/components/Layouts";

import "@css/App.css";

import { useAuth, useUser } from '@hooks/index'
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

export const AddAdmin = () => {
  const { user } = useUser();
  const { isAuth } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if(!isAuth && !user.admin) {
      navigate('/')
    }
  }, [isAuth, navigate, user])

  return (
    <LayoutForm title="Nuevo administrador">
      <AddForm />
    </LayoutForm>
  );
}