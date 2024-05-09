import { useProducts, useCategories } from "@src/hooks";
import { DocumentData } from "firebase/firestore";
import { ButtonUI } from "../../ui";
import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Chip,
  Link,
} from "@nextui-org/react";
import { useUser } from "@src/hooks";
import { Carousel } from "../../ui/carousel";
import { EmblaOptionsType } from "embla-carousel";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

type Multi = {
  url: string;
  type: string;
}
interface Props {
  product: DocumentData;
}

export const ProductItem = ({ product }: Props) => {
  const { handleDeleteProduct } = useProducts();
  const { getCategoryNameById } = useCategories();
  const [images, setImages] = useState<Multi[]>([]);
  const { user } = useUser();
  const OPTIONS: EmblaOptionsType = { loop: true };
  const storage = getStorage();
  
  const getImages = useCallback(async () => {
    const extVideo = ['mp4', 'mov', 'avi', 'wmv', 'flv'];
  const urlsImg: Multi[] = [];
    const listRef = ref(storage, `${product.id}`);
    const res = await listAll(listRef);
    res.items.forEach(async (itemRef) => {
      const url = await getDownloadURL(ref(storage, itemRef.fullPath));
      urlsImg.push({url, type: extVideo.includes(itemRef.name.split('.').pop() || '.png') ? 'video' : 'image'});
      setImages([...urlsImg]);
    });
  }, [product, storage]);

  useEffect(() => {
    getImages();
  }, [getImages]);

  return (
    <Card
      className="max-w-80 w-full border-t-secondary border-t-5 justify-self-center h-[380px] "
      shadow="sm"
      radius="sm"
    >
      <div className="h-40">
        {images.length > 0 && <Carousel slides={images} options={OPTIONS} />}
      </div>
      <CardHeader className="flex justify-between items-center mt-5">
        <strong className="text-primary max-w-[90%] text-sm"> {product.name} </strong>
        <strong className="text-gray-500 text-xs">${product.price}</strong>
      </CardHeader>
      <CardBody className="text-black h-[60px] text-sm">
        <p> {product.description} </p>
      </CardBody>
      <CardFooter className="flex flex-col">
        <div className="container flex justify-between items-center text-gray-500 text-xs">
          <div className="container">
            Disponibilidad: <strong>{product.availability}</strong>
          </div>
          <Chip
            color="secondary"
            variant="flat"
            size="sm"
            className="text-black"
          >
            {getCategoryNameById(product.category)}
          </Chip>
        </div>
        {user.isAdmin ? (
          <div className="container w-full flex gap-2 justify-between mt-2">
            <ButtonUI
              color="danger"
              variant="ghost"
              className="w-[50%]"
              onPress={() => {
                handleDeleteProduct(product.id);
              }}
            >
              Eliminar
            </ButtonUI>
            <ButtonUI
              as={Link}
              color="primary"
              variant="solid"
              className="w-[50%]"
              href={`/edit/${product.id}`}
            >
              Editar
            </ButtonUI>
          </div>
        ) : (
          <ButtonUI
            as={Link}
            color="primary"
            variant="solid"
            className="w-full mt-2 h-10 shrink-0"
            size="md"
            href={`/product/${product.id}?price=${product.price}`}
          >
            Comprar
          </ButtonUI>
        )}
      </CardFooter>
    </Card>
  );
};
