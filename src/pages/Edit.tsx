import { useParams } from "react-router-dom";
import { EditForm } from "@components/features/products";
import { LayoutForm } from "@components/Layouts";

export const Edit = () => {
  const { id } = useParams();

  return (
    <LayoutForm title="Editar producto">
      <EditForm id={id || ""} />
    </LayoutForm>
  );
};
