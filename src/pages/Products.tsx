import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollShadow,
  Link,
} from "@nextui-org/react";
import { CategoriesForm } from "@components/features/categories";
import { ProductList } from "@components/features/products";
import { Header, ButtonUI } from "@components/features/ui";
import { FilterIcon } from "@icons/index";
import "@css/App.css";
import { useUser } from "@src/hooks";

export const Products = () => {
  const { user } = useUser();

  return (
    <>
      <Header title={user.isAdmin ? "Administrar" : "Productos"} />

      <main className="flex flex-col gap-y-3">
        <div className="h-auto w-full flex items-center justify-between">
          {user.isAdmin && (
            <ButtonUI
              as={Link}
              color="primary"
              variant="ghost"
              size="md"
              className="w-auto font-bold"
              href="/add"
            >
              Agregar
            </ButtonUI>
          )}
          <Popover placement="bottom" showArrow className="max-w-96">
            <PopoverTrigger>
              <Link
                as={ButtonUI}
                color="primary"
                variant="bordered"
                startContent={<FilterIcon size={20} />}
                className="border-none"
                size="sm"
              >
                {user.isAdmin ? "Categorías" : "Filtros"}
              </Link>
            </PopoverTrigger>
            <PopoverContent>
              <CategoriesForm />
            </PopoverContent>
          </Popover>
        </div>
        <ScrollShadow className="cards-container pb-1" size={5} hideScrollBar>
          <ProductList />
        </ScrollShadow>
      </main>
    </>
  );
};
