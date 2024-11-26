import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "../ui/button";

interface AlertDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const AlertSuccessCheckout = ({
  isOpen,
  setIsOpen,
}: AlertDialogProps) => {
  const handleClose = () => {
    setIsOpen(false);
    window.location.href = "/";
  };

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent tabIndex={undefined}>
            <AlertDialogHeader>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="mx-auto h-16 w-16 text-emerald-500" />
              </motion.div>
              <AlertDialogTitle className="mt-4 text-center text-2xl font-bold text-emerald-500">
                ¡Pago Realizado con Éxito!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center text-gray-600">
                Su pago ha sido procesado correctamente. ¡Gracias por su compra!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-center">
              <Button
                onClick={handleClose}
                className="rounded-full bg-emerald-500 px-6 py-2 font-bold text-white shadow-md hover:bg-emerald-500"
              >
                Aceptar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </AnimatePresence>
  );
};
