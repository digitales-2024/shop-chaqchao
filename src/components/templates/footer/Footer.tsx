import { Facebook, Instagram, TripAdvisor } from "@/assets/icons";
import { ChaqchaoLogo } from "@/assets/images/ChaqchaoLogo";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { cloneElement } from "react";

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
    url: "https://www.facebook.com/Chaqchao.Organic.Chocolates",
    icon: <Facebook />,
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/chaqchao",
    icon: <Instagram />,
  },
  {
    label: "Tripadvisor",
    url: "https://www.tripadvisor.com.pe/Restaurant_Review-g294313-d4975010-Reviews-Chaqchao_Organic_Chocolates-Arequipa_Arequipa_Region.html",
    icon: <TripAdvisor />,
  },
];

export function Footer() {
  const t = useTranslations("footer");

  return (
    <div className="relative flex flex-col gap-y-10 bg-slate-50 p-10 text-center">
      <div className="hero absolute bottom-0 right-0 top-0 z-[1] h-full w-full opacity-5" />
      <div className="absolute bottom-0 right-0 top-0 z-[2] h-full w-full bg-gradient-to-b from-white to-transparent to-10%" />
      <div className="container z-[2] mx-auto px-2">
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="space-y-8 text-start">
            <ChaqchaoLogo className="size-40" />
            <p className="text-md max-w-xs leading-6">{t("description")}</p>
          </div>
          {/* Navigations */}
          <div className="mt-16 grid grid-cols-2 gap-14 md:grid-cols-[auto_1fr] lg:mt-0 xl:col-span-2">
            <div className="md:mt-0">
              <h3 className="text-sm font-semibold leading-6">{t("social")}</h3>
              <div className="mt-6 space-y-4">
                {SOCIAL_MEDIA.map((item) => (
                  <div
                    key={item.label}
                    className="w-fit text-secondary transition-all duration-300 hover:scale-105"
                  >
                    <a href={item.url} target="_blank" rel="noreferrer">
                      {cloneElement(item.icon, {
                        className: "size-6",
                      })}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div>
                <h3 className="text-sm font-semibold leading-6">
                  {t("title")}
                </h3>
                <div className="mt-6 flex flex-col space-y-4">
                  {INFO.map((item) => (
                    <div
                      key={item.label}
                      className="inline-flex items-start justify-start"
                    >
                      <p className="inline-flex gap-4 text-sm leading-6">
                        {item.icon}
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 dark:border-gray-100/10 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-700 dark:text-gray-300">
            © {new Date().getFullYear()}
            <span className="px-2 font-commingSoon">CHAQCHAO</span>
            E.I.R.L. / 20558285550 - {t("copyrigth")}
          </p>
        </div>
      </div>
    </div>
  );
}
