import { LayoutForm } from "@src/components/Layouts"
import { EditForm } from "@src/components/features/users/profile/EditForm"

export const EditProfile = () => {
  return (
    <LayoutForm title="Editar información">
      <EditForm />
    </LayoutForm>
  )
}