import { createContext, useState, useEffect, useCallback } from "react";
import { DocumentData } from "firebase/firestore";
import {
  saveCategory,
  deleteCategory,
  updateCategory,
  getCategories,
} from "@src/services/firebase/api";

type Categories = {
  categories: DocumentData[];
  handleAddCategory: (category: DocumentData) => void;
  handleDeleteCategory: (id: string) => void;
  handleUpdateCategory: (id: string, updatedCategory: DocumentData) => void;
  handleGetCategories: () => void;
  getCategoryNameById: (id: string) => string;
  loading: boolean;
};

export const CategoriesContext = createContext<Categories>({
  categories: [],
  handleAddCategory: () => Promise<void>,
  handleDeleteCategory: () => Promise<void>,
  handleUpdateCategory: () => Promise<void>,
  handleGetCategories: () => Promise<void>,
  getCategoryNameById: () => "",
  loading: false,
});

interface Props {
  children?: React.ReactNode;
}

export const CategoriesProvider = ({ children }: Props) => {
  const [categories, setCategories] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetCategories = useCallback(async () => {
    setLoading(true);
    try {
      const categoriesData: DocumentData[] = [];
      await getCategories().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const docData = { id: doc.id, ...doc.data() };
          categoriesData.push(docData);
        });
      });
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error getting documents: ", error);
    } finally {
      setLoading(false);
    }
  }, [setCategories, setLoading]);

  const handleAddCategory = async (category: DocumentData) => {
    try {
      await saveCategory(category);
      setCategories([...categories, category]);
    } catch (error) {
      console.log("Error adding document: ", error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id);
      setCategories(
        categories.filter((category: DocumentData) => category.id !== id)
      );
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const handleUpdateCategory = async (
    id: string,
    updatedCategory: DocumentData
  ) => {
    try {
      await updateCategory(id, updatedCategory);
      const categoryIndex = categories.findIndex(
        (category: DocumentData) => category.id === id
      );
      if (categoryIndex !== -1) {
        const updatedCategories = [...categories];
        updatedCategories[categoryIndex] = {
          ...updatedCategories[categoryIndex],
          ...updatedCategory,
        };
        setCategories(updatedCategories);
        console.log("Category successfully updated!");
      } else {
        console.error("Category with ID", id, "not found for update.");
      }
    } catch (error) {
      console.log("Error adding document: ", error);
    }
  };

  const getCategoryNameById = (id: string): string => {
    const category = categories.find(
      (category: DocumentData) => category.id === id
    );
    return category?.name || "Sin categoría";
  };

  useEffect(() => {
    handleGetCategories()
  }, [handleGetCategories])

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        handleAddCategory,
        handleDeleteCategory,
        handleUpdateCategory,
        handleGetCategories,
        getCategoryNameById,
        loading,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
