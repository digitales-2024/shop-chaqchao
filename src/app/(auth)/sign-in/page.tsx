"use client";

import { ChaqchaoLogo } from "@/assets/images/ChaqchaoLogo";
import Bg from "@/assets/images/login/singin.webp";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "next-view-transitions";
import Image from "next/image";

import { FormLogin } from "@/components/account/login/FormLogin";
import { LanguageSelector } from "@/components/templates/navbar/LanguageSelector";

export default function AuthCards() {
  const t = useTranslations("login");

  return (
    <div className="grid h-screen grid-cols-1 p-2 font-nunito md:grid-cols-2">
      {/* Mensaje a la izquierda (oculto en pantallas pequeñas) */}
      <div className="relative hidden h-full items-start justify-start overflow-hidden rounded-3xl bg-primary p-6 [view-transition-name:_signin] md:flex">
        <Image
          src={Bg}
          alt="chaqchao factory"
          fill
          className="absolute inset-0 z-[-1] object-cover object-center opacity-50"
        />
        <div className="inline-flex w-full items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/">
              <ChaqchaoLogo className="w-32" fill="white" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              href="/register"
              className="rounded-full border border-white bg-transparent px-10 py-2 font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-secondary"
            >
              {t("registerButton")}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Formulario a la derecha */}
      <div className="flex flex-col items-end justify-end p-0 sm:p-10">
        <LanguageSelector />
        <FormLogin />
      </div>
    </div>
  );
}
