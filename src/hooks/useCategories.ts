import { useContext } from 'react'
import { CategoriesContext } from '@context/index'

export const useCategories = () => {
  return useContext(CategoriesContext)
}