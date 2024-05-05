import Image from "@assets/producto.webp";
import { ProductsContext, CategoriesContext } from "@src/context";
import { DocumentData } from "firebase/firestore";
import { ButtonUI } from "../../ui";
import { useContext } from "react";
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
import { EmblaOptionsType } from 'embla-carousel'

interface Props {
  product: DocumentData;
}

export const ProductItem = ({ product }: Props) => {
  const { handleDeleteProduct } = useContext(ProductsContext);
  const { getCategoryNameById } = useContext(CategoriesContext);
  const { user } = useUser()
  const OPTIONS: EmblaOptionsType = { loop: true }

  return (
    <Card className="max-w-80 w-full border-t-secondary border-t-5 justify-self-center" shadow="sm" radius="sm">
          <div>
            <Carousel slides={[Image, Image]} options={OPTIONS} />
          </div>
          <CardHeader className="flex justify-between items-center">
            <strong className="text-primary"> {product.name} </strong>
            <strong className="text-gray-500 text-xs">
              ${product.price}
            </strong>
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
                  href={`/product/${product.id}`}
                >
                  Comprar
                </ButtonUI>
              )}
          </CardFooter>
        </Card>
  )
}