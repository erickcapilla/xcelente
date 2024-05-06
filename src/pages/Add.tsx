import { AddForm } from "@src/components/features/products";
import { LayoutForm } from "@src/components/Layouts";

export const Add = () => {
  return (
    <LayoutForm title="Nuevo Producto">
      <AddForm />
    </LayoutForm>
  );
};
