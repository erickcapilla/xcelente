import { extendVariants, Button } from "@nextui-org/react";

export const ButtonUI = extendVariants(Button, {
  defaultVariants: {
    color: "primary",
    variant: "solid",
    size: "md",
    radius: "sm",
  },
})