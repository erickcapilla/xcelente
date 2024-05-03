import { SignupForm } from "@src/components/features/users";
import { LayoutForm } from "@src/components/Layouts";

import "@css/App.css";

export const Signup = () => {
  return (
    <LayoutForm title="Nueva cuenta">
      <SignupForm />
    </LayoutForm>
  );
};
