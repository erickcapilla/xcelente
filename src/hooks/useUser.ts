import { useContext } from 'react'
import { UserContext } from '@context/index'

export const useUser = () => {
  return useContext(UserContext)
}