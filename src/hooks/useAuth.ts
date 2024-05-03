import { useContext } from 'react'
import { AuthContext } from "@context/index";

export const useAuth = () => {
  return useContext(AuthContext)
}