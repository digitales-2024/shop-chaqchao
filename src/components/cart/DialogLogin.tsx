import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogContainer,
} from "@/components/common/Dialog";
import { ScrollArea } from "@/components/common/ScrollArea";

import { cn } from "@/lib/utils";

import { FormLogin } from "../account/login/FormLogin";
import { buttonVariants } from "../ui/button";

export const DialogLogin = () => {
  return (
    <Dialog
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 24,
      }}
    >
      <DialogTrigger>
        <DialogTitle
          className={cn(
            "w-full text-center font-bold shadow",
            cn(buttonVariants({})),
          )}
        >
          Iniciar sesión
        </DialogTitle>
      </DialogTrigger>
      <DialogContainer>
        <DialogContent className="relative h-auto w-[500px] border border-gray-100 bg-white">
          <ScrollArea className="h-[90vh]" type="scroll">
            <FormLogin />
          </ScrollArea>
          <DialogClose className="text-zinc-500" />
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
};
