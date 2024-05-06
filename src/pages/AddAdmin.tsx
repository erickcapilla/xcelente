import { AddForm } from "@src/components/features/users";
import { LayoutForm } from "@src/components/Layouts";

import "@css/App.css";

export const AddAdmin = () => {
  return (
    <LayoutForm title="Nuevo administrador">
      <AddForm />
    </LayoutForm>
  );
}