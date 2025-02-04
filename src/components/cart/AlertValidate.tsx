import { ShoppingDelete } from "@/assets/icons";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const springTransition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 1,
};

interface AlertValidateProps {
  errorValidate: boolean | unknown;
}

export const AlertValidate = ({ errorValidate }: AlertValidateProps) => {
  const c = useTranslations("checkout.checkout");
  return (
    <AnimatePresence>
      {errorValidate ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ ...springTransition }}
        >
          <Alert
            variant="destructive"
            className="border border-rose-500 text-rose-500"
          >
            <ShoppingDelete className="stroke-rose-500" />
            <AlertTitle className="font-bold">
              {c("messages.warning.title")}
            </AlertTitle>
            <AlertDescription>
              {c("messages.warning.description")}
            </AlertDescription>
          </Alert>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
