"use client";

import { useCart } from "@/hooks/use-cart";
import useCartSheet from "@/hooks/use-cart-sheet";
import { Product } from "@/types";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "@/lib/utils";

interface AddToCartButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonVariants> {
  product: Product;
  quantity?: number;
  asChild?: boolean;
  setIsDialogOpen?: (value: boolean) => void;
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-xl text-white font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:stroke-white [&_svg]:stroke-1 [&_svg]:size-8 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-white rounded-full hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-20 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-16 w-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const AddToCartButton = React.forwardRef<HTMLDivElement, AddToCartButtonProps>(
  (
    {
      className,
      product,
      quantity,
      variant,
      size,
      setIsDialogOpen,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const { onOpenChange } = useCartSheet();

    const { addItemCard } = useCart();

    const handleAddToCart = async () => {
      onOpenChange();
      if (setIsDialogOpen) {
        setIsDialogOpen(false);
      }
      addItemCard(product, quantity);
    };

    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCart();
        }}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
AddToCartButton.displayName = "AddToCartButton";

export { AddToCartButton };
