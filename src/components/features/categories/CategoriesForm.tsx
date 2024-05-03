import { Chip, Button } from "@nextui-org/react";
import { useState } from "react";
import { ButtonUI, TextField } from "../ui";
import { DocumentData } from "firebase/firestore";
import { useCategories, useUser, useProducts } from "@src/hooks";

type Filters = {
  category: "";
  min: "";
  max: "";
};

export const CategoriesForm = () => {
  const [nameValue, setNameValue] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [price, setPrice] = useState<Filters>({
    category: "",
    min: "",
    max: "",
  });
  const { user } = useUser();

  const {
    categories,
    handleAddCategory,
    handleUpdateCategory,
    handleDeleteCategory,
  } = useCategories();
  const { filterProducts, handleGetProducts } = useProducts();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setPrice({ ...price, [e.target.name]: e.target.value });

  const editCategory = (category: DocumentData) => {
    setIsEdit(true);
    setNameValue(category.name);
    setCategoryId(category.id);
  };

  const handleSubmit = async (
    e: React.FormEvent<EventTarget>
  ): Promise<void> => {
    e.preventDefault();

    if (user.isAdmin) {
      const name = nameValue;
      setNameValue("");

      if (isEdit) {
        try {
          handleUpdateCategory(categoryId, {
            name,
          });
          setIsEdit(false);
        } catch (e) {
          console.error("Error adding document: ", e);
          setIsEdit(false);
        }
      } else {
        try {
          handleAddCategory({
            name,
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    }

    if (!user.isAdmin) {
      filterProducts("price", price);
      console.log("Hola")
    }
  };

  return (
    <form className="grid gap-y-3" onSubmit={handleSubmit}>
      {user.isAdmin && (
        <TextField
          type="text"
          label="Categoría"
          placeholder="Nombre de la categoría"
          autoFocus
          className="text-black"
          isRequired
          value={nameValue}
          onChange={(e) => {
            setNameValue(e.target.value);
          }}
        />
      )}
      <div className="w-full grid gap-2">
        <h3 className="text-xs font-bold text-primary">Categorías</h3>
        <div className="w-full flex gap-2 flex-wrap">
          {categories.map((category: DocumentData) => (
            <Chip
              key={category.id}
              onClose={
                user.isAdmin && (() => handleDeleteCategory(category.id))
              }
              variant="flat"
              color="secondary"
              className="text-black"
              as={Button}
              onPress={
                user.isAdmin
                  ? () => editCategory(category)
                  : () => filterProducts("category", { category: category.id, min: '', max: '' })
              }
            >
              {category.name}
            </Chip>
          ))}
        </div>
      </div>
      {!user.isAdmin && (
        <div className="w-full grid gap-2">
          <h3 className="text-xs font-bold text-primary">Precios</h3>
          <div className="w-full flex gap-2 flex-wrap">
            <TextField
              name="min"
              type="number"
              min={0}
              label="Min.precio"
              placeholder="Ingresa precio minimo"
              autoFocus
              className="text-black"
              isRequired
              value={price.min}
              onChange={handleChange}
            />
            <TextField
              name="max"
              type="number"
              min={1}
              label="Max. precio"
              placeholder="Ingresa precio maximo"
              className="text-black"
              isRequired
              value={price.max}
              onChange={handleChange}
            />
            <ButtonUI
              type="submit"
              color="primary"
              variant="solid"
              size="sm"
              className="w-full h-[40px]"
            >
              Aplicar filtro por precio
            </ButtonUI>
            <ButtonUI
              type="button"
              color="danger"
              variant="solid"
              size="sm"
              className="w-full h-[40px]"
              onPress={() => handleGetProducts()}
            >
              Quitar filtros
            </ButtonUI>
          </div>
        </div>
      )}
      {user.isAdmin && (
        <ButtonUI
          type="submit"
          color="primary"
          variant="solid"
          className="h-[40px]"
        >
          {isEdit ? "Editar Categoría" : "Agregar Categoría"}
        </ButtonUI>
      )}
    </form>
  );
};
