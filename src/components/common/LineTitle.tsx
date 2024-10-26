import { motion } from "framer-motion";
import { HtmlHTMLAttributes } from "react";

type LineTitleProps = HtmlHTMLAttributes<HTMLDivElement>;

export const LineTitle = (props: LineTitleProps) => {
  return (
    <div {...props}>
      <div className="inline-flex w-full items-center justify-end gap-px">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="h-px w-full bg-gradient-to-l from-current to-transparent"
        ></motion.div>
        <motion.div
          initial={{ scale: 0, rotate: 45 }}
          transition={{ duration: 0.5 }}
          animate={{ scale: 1, rotate: 45 }}
          className="aspect-square size-4 shrink-0 rotate-45 border border-current"
        ></motion.div>
      </div>
    </div>
  );
};
