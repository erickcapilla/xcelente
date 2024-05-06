import { ButtonUI, Header } from "../components/features/ui";
import { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Chip,
} from "@nextui-org/react";
import { useAuth, useCategories, useProducts } from "@src/hooks";
import { useParams, useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Carousel } from "@src/components/features/ui/carousel";
import { EmblaOptionsType } from "embla-carousel";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { saveShopping } from "@src/services/firebase/api";

type Multi = {
  url: string;
  type: string;
};

export const Product = () => {
  const [images, setImages] = useState<Multi[]>([]);
  const { getCategoryNameById } = useCategories();
  const { isAuth, userAuthed } = useAuth();
  const { handleGetProduct, product } = useProducts();
  const { id } = useParams();
  const navigate = useNavigate();
  const OPTIONS: EmblaOptionsType = { loop: true };
  const urlParams = new URLSearchParams(window.location.search);
  const price = urlParams.get('price');

  const handleSave = async (id: string) => {
    try {
      await saveShopping(userAuthed.email || '', {
        id,
        progress: 0,
      })
    } catch (error) {
      console.error(error)
    }
  }
  
  const getImages = useCallback(async (id: string) => {
    const storage = getStorage();
    const extVideo = ["mp4", "mov", "avi", "wmv", "flv"];
    const urlsImg: Multi[] = [];
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
    console.log(price, data);
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
    handleSave(id || "")
    return actions.order.capture().then((details) => {
      const name = details.payer.name.given_name;
      alert(`Transaction completed by ${name}`);
    });
  };

  const handleBuy = () => {
    if (!isAuth) {
      navigate("/login");
      return;
    }
    alert("Compra realizada con éxito");
  };

  useEffect(() => {
    if(!(images.length > 0)) getImages(id || '');
    handleGetProduct(id || "");
  }, [handleGetProduct, id, getImages]);

  return (
    <>
      <Header title={"Comprar producto"} />
      <div className="w-full h-full p-3">
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
            <strong className="text-primary"> {product.name} </strong>
            <strong className="text-gray-500 text-xs">${product.price}</strong>
          </CardHeader>
          <CardBody className="text-black h-[60px] text-sm">
            <p> {product.description} </p>
          </CardBody>
          <CardFooter className="flex flex-col gap-2 w-full">
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
      </div>
    </>
  );
};
