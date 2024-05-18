import { ButtonUI, Header } from "../components/features/ui";
import { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Chip,
  Link,
} from "@nextui-org/react";
import { useAuth, useCategories, useProducts, useUser } from "@src/hooks";
import { useParams, useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Carousel } from "@src/components/features/ui/carousel";
import { EmblaOptionsType } from "embla-carousel";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { saveShopping } from "@src/services/firebase/api";
import { months } from "@src/utils/utils";

type Multimedia = {
  url: string;
  type: string;
};

export const Product = () => {
  const [images, setImages] = useState<Multimedia[]>([]);
  const { getCategoryNameById } = useCategories();
  const { isAuth, userAuthed } = useAuth();
  const { id } = useParams();
  const { handleGetProduct, products } = useProducts();
  const product = products.filter((product) => product.id === id);
  const navigate = useNavigate();
  const OPTIONS: EmblaOptionsType = { loop: true };
  const [price, setPrice] = useState(product[0].price);
  const { user } = useUser();

  const handleSave = async () => {
    try { 
      await saveShopping(userAuthed.email || "", {
        name: product[0].name,
        status: "one",
        price: price,
        month: months[new Date().getMonth()],
      });
    } catch (error) {
      console.error(error);
    }
  };


  const getImages = useCallback(async (id: string) => {
    const storage = getStorage();
    const extVideo = ["mp4", "mov", "avi", "wmv", "flv"];
    const urlsImg: Multimedia[] = [];
    const listRef = ref(storage, `${id}`);
    const res = await listAll(listRef);
    res.items.forEach(async (itemRef) => {
      const url = await getDownloadURL(ref(storage, itemRef.fullPath));
      urlsImg.push({
        url,
        type: extVideo.includes(itemRef.name.split(".").pop() || ".png")
          ? "video"
          : "image",
      });
      setImages([...urlsImg]);
    });
  }, []);

  const onCreateOrder = (data, actions) => {
    setPrice(product[0].price);
    console.log(data);
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: price,
          },
        },
      ],
    });
  };

  const onApproveOrder = (data, actions) => {
    console.log(data);
    handleSave();
    return actions.order.capture().then((details) => {
      const name = details.payer.name.given_name;
      alert(`Transaction completed by ${name}`);
    });
  };

  const handleBuy = async () => {
    if (!isAuth) {
      navigate("/login");
      return;
    }
  };

  useEffect(() => {
    if (!(images.length > 0)) getImages(id || "");
  }, [handleGetProduct, id, getImages, images]);

  return (
    <>
      <Header title={"Comprar producto"} />
      <main className="w-full h-full p-3">
        <Card
          className="max-w-80 w-full border-t-secondary border-t-5 h-auto mx-auto"
          shadow="sm"
          radius="sm"
        >
          <div className="h-40">
            {images.length > 0 && (
              <Carousel slides={images} options={OPTIONS} />
            )}
          </div>
          <CardHeader className="flex justify-between items-center mt-5">
            <strong className="text-primary"> {product[0].name} </strong>
            <strong className="text-gray-500 text-xs">
              ${product[0].price}
            </strong>
          </CardHeader>
          <CardBody className="text-black h-[60px] text-sm">
            <p> {product[0].description} </p>
          </CardBody>
          <CardFooter className="flex flex-col gap-2 w-full">
            <div className="container flex justify-between items-center text-gray-500 text-xs">
              <div className="container">
                Disponibilidad: <strong>{product[0].availability}</strong>
              </div>
              <Chip
                color="secondary"
                variant="flat"
                size="sm"
                className="text-black"
              >
                {getCategoryNameById(product[0].category)}
              </Chip>
            </div>
            {isAuth ? (
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => onCreateOrder(data, actions)}
                onApprove={(data, actions) => onApproveOrder(data, actions)}
              />
            ) : (
              <ButtonUI
                color="primary"
                variant="solid"
                className="w-full mt-2 h-10 shrink-0 font-bold"
                size="md"
                onPress={handleBuy}
              >
                Inicia sesión para poder comprar
              </ButtonUI>
            )}
          </CardFooter>
        </Card>
        {(!user.address && isAuth) && (
          <article className="border-2 border-danger max-w-80 w-full m-auto mt-3 text-danger flex gap-2 text-sm items-center p-2 rounded-md">
            <p>Ingresa tu dirección en tu información</p>
            <Link
              href="/profile"
              className="text-secondary "
              underline="always"
            >
              Perfil
            </Link>
          </article>
        )}
      </main>
    </>
  );
};
