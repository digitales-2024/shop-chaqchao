import { Facebook, Instagram, TripAdvisor } from "@/assets/icons";
import { ChaqchaoLogo } from "@/assets/images/ChaqchaoLogo";
import { LibroReclamaciones } from "@/assets/images/LibroReclamaciones";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { cloneElement } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Info {
  label: string;
  icon: JSX.Element;
}

interface SocialMedia {
  label: string;
  url: string;
  icon: JSX.Element;
}

const INFO: Info[] = [
  {
    label: "Calle sanca catalina 204, Arequipa, Perú",
    icon: <MapPin />,
  },
  {
    label: "958 086 581",
    icon: <Phone />,
  },
  {
    label: "caja@chaqchao-chocolates.com",
    icon: <Mail />,
  },
];

const SOCIAL_MEDIA: SocialMedia[] = [
  {
    label: "Facebook",
    url: "https://www.facebook.com/chaqchao",
    icon: <Facebook />,
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/chaqchao",
    icon: <Instagram />,
  },
  {
    label: "Tripadvisor",
    url: "https://www.tripadvisor.com.pe/Restaurant_Review-g294313-d14145903-Reviews-Chaqchao_Chocolates-Arequipa_Arequipa_Region.html",
    icon: <TripAdvisor />,
  },
];

export function Footer() {
  return (
    <div className="flex flex-col gap-y-10 bg-slate-50 p-10 text-center">
      <div className="grid grid-cols-1 items-center justify-items-center gap-y-10 sm:grid-cols-2">
        <ChaqchaoLogo className="size-40" />
        <div className="flex justify-end">
          <div className="flex w-fit flex-col gap-2">
            <p className="font-commingSoon text-lg">Información de la tienda</p>
            <div className="mb-4 flex flex-col items-start gap-2">
              {INFO.map((info, index) => (
                <div
                  key={index}
                  className="group/info inline-flex gap-3 text-start text-sm font-bold"
                >
                  {cloneElement(info.icon, {
                    size: 20,
                    className:
                      "flex-shrink-0 text-primary group-hover/info:scale-105 group-hover/info:animate-pulse",
                  })}
                  <span>{info.label}</span>
                </div>
              ))}
            </div>
            <div className="mx-auto inline-flex w-full gap-4">
              {SOCIAL_MEDIA.map((socialMedia, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <a href={socialMedia.url} target="_blank">
                      {cloneElement(socialMedia.icon, {
                        className: "size-6",
                      })}
                      <span className="sr-only">{`chaqchao - ${socialMedia.label}`}</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>{socialMedia.label}</span>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p>
        © {new Date().getFullYear()}
        <span className="px-2 font-commingSoon">CHAQCHAO CHOCOLATES</span>
        E.I.R.L. / 20558285550 - Todos los Derechos Reservados
      </p>
      <div className="inline-flex w-full justify-end">
        <Link href="">
          <span className="sr-only">Libro de reclamaciones</span>
          <LibroReclamaciones className="w-16" />
        </Link>
      </div>
    </div>
  );
}
