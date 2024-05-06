import { Select, SelectItem, Textarea } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { DocumentData } from "firebase/firestore";
import { ButtonUI, TextField } from "../../ui";
import { Product } from "@src/types";
import { useCategories, useProducts } from "@src/hooks";
import { FilesUpload } from '../../files'


interface Props {
  id: string;
}

export const EditForm = ({ id }: Props) => {
  const { categories } = useCategories();
  const { hanldeUpdateProduct } = useProducts();
  const { products } = useProducts();
  const [product, setProduct] = useState<DocumentData>({});
  const [productValue, setProductValue] = useState<Product>(product);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    setProduct(
      products.find((product: DocumentData) => product.id === id) || {}
    );
    console.log(product);
    setProductValue(product);
  }, [id, products, product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setProductValue({ ...productValue, [e.target.name]: e.target.value });

  const handleChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    const selectedFilesArray = Array.from(selectedFiles || [])
    setFiles(selectedFilesArray);
  }

  const handleSubmit = async (
    e: React.FormEvent<EventTarget>
  ): Promise<void> => {
    e.preventDefault();
    const productUpdated = {
      name: productValue?.name,
      description: productValue?.description,
      price: productValue?.price,
      category: productValue?.category,
      availability: productValue?.availability,
    };

    try {
      await hanldeUpdateProduct(product.id, productUpdated, files);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="grid gap-y-2 text-black">
        <TextField
          isRequired
          type="text"
          name="name"
          label="Nombre del producto"
          placeholder="Ingresa el nombre del producto"
          autoFocus
          defaultValue={product.name}
          value={productValue?.name}
          onChange={handleChange}
        />
        <Textarea
          color="primary"
          variant="bordered"
          radius="sm"
          isRequired
          type="text"
          name="description"
          label="Descripción"
          placeholder="Ingresa descripción del producto"
          defaultValue={product.description}
          value={productValue?.description}
          onChange={handleChange}
        />
        <TextField
          isRequired
          type="number"
          name="price"
          label="Precio"
          placeholder="Ingresa el precio del producto"
          defaultValue={product.price}
          value={productValue?.price}
          onChange={handleChange}
        />
        <TextField
          isRequired
          type="number"
          name="availability"
          label="Cantidad"
          placeholder="Ingresa la catidad del producto"
          defaultValue={product.availability}
          value={productValue?.availability}
          onChange={handleChange}
        />
        <Select
          isRequired
          items={categories as Iterable<DocumentData>}
          name="category"
          label="Categoría"
          placeholder="Selecciona una categoría"
          variant="bordered"
          color="primary"
          radius="sm"
          value={productValue?.category}
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
    </>
  );
};
