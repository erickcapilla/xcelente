import { extendVariants, Input } from "@nextui-org/react";

export const TextField = extendVariants(Input, {
  defaultVariants: {
    variant: "bordered",
    color: "primary",
    radius: "sm",
  },
});