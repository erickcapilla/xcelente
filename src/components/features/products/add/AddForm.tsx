import { Select, SelectItem, Textarea } from "@nextui-org/react";
import { ButtonUI, TextField } from "../../ui";
import { useState } from "react";
import { DocumentData } from "firebase/firestore";
import { useCategories, useProducts } from "@src/hooks";
import { FilesUpload } from '../../files'

export const AddForm = () => {
  const { categories } = useCategories();
  const { handleAddProduct } = useProducts();
  const [files, setFiles] = useState<File[]>([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    availability: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    const selectedFilesArray = Array.from(selectedFiles || [])
    setFiles(selectedFilesArray);
  }

  const handleSubmit = async (
    e: React.FormEvent<EventTarget>
  ): Promise<void> => {
    e.preventDefault();
    try {
      await handleAddProduct(product, files);
      console.log(files)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-y-2 text-black">
      <TextField
        isRequired
        name="name"
        type="text"
        label="Nombre del producto"
        placeholder="Ingresa nombre del producto"
        autoFocus
        value={product.name}
        onChange={handleChange}
      />
      <Textarea
        color="primary"
        variant="bordered"
        radius="sm"
        isRequired
        name="description"
        type="text"
        label="Descripción"
        placeholder="Ingresa descripción del producto"
        value={product.description}
        onChange={handleChange}
      />
      <TextField
        isRequired
        name="price"
        type="number"
        label="Precio"
        placeholder="Ingresa precio del producto"
        value={product.price}
        onChange={handleChange}
      />
      <TextField
        name="availability"
        isRequired
        type="number"
        label="Cantidad"
        placeholder="Ingresa catidad del producto"
        value={product.availability}
        onChange={handleChange}
      />
      <Select
        isRequired
        name="category"
        items={categories as Iterable<DocumentData>}
        label="Categoría"
        placeholder="Selecciona una categoría"
        variant="bordered"
        color="primary"
        radius="sm"
        value={product.category}
        onChange={handleChange}
      >
        {(categories: DocumentData) => (
          <SelectItem
            key={categories.id}
            textValue={categories.name}
            className="text-black"
          >
            {categories.name}
          </SelectItem>
        )}
      </Select>
      <FilesUpload onChange={(e) => handleChangeFiles(e)} />
      <ButtonUI
        color="primary"
        variant="solid"
        type="submit"
        className="mt-2 h-10"
      >
        Guardar
      </ButtonUI>
    </form>
  );
};
