import { Facebook, Instagram, TripAdvisor } from "@/assets/icons";
import { ChaqchaoLogo } from "@/assets/images/ChaqchaoLogo";
import { LibroReclamaciones } from "@/assets/images/LibroReclamaciones";
import { useTranslations } from "next-intl";
import Link from "next/link";

const SOCIAL_MEDIA = [
  {
    label: "Tripadvisor",
    url: "https://www.tripadvisor.com.pe/Restaurant_Review-g294313-d4975010-Reviews-Chaqchao_Organic_Chocolates-Arequipa_Arequipa_Region.html",
    icon: TripAdvisor,
  },
  {
    label: "Facebook",
    url: "https://www.facebook.com/Chaqchao.Organic.Chocolates",
    icon: Facebook,
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/chaqchao/",
    icon: Instagram,
  },
];

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="w-full bg-secondary-foreground py-12">
      <div className="mx-auto grid max-w-[1025px] grid-cols-1 justify-items-center sm:grid-cols-3">
        <div className="space-y-6">
          <h3 className="font-riddle text-4xl">CHAQCHAO CHOCOLATE FACTORY</h3>
          <div className="space-y-6">
            <p>Calle Santa Catalina 204, Arequipa, Perú</p>
            <div>
              <a
                href="mailto:info@chaqchao-chocolates.com?subject=Hello!"
                className="block font-semibold underline"
              >
                info@chaqchao-chocolates.com
              </a>
              <a
                href={`tel:+51 54234572`}
                className="block font-semibold underline"
              >
                +51 54234572
              </a>
            </div>
            <ul className="font-semibold">
              <li>
                {t("monday")} - {t("sunday")} 10am - 10:30pm
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 pt-10">
          {SOCIAL_MEDIA.map((item) => (
            <a key={item.label} href={item.url} target="_blank">
              <item.icon className="w-10" />
            </a>
          ))}
        </div>
        <div className="flex flex-col items-end justify-around">
          <div className="relative">
            <div className="absolute inset-0 -left-10 -top-10 z-0 size-48 rounded-full bg-secondary/10"></div>
            <ChaqchaoLogo className="z-[1] w-48" />
          </div>
          <Link href="/complaints-book">
            <LibroReclamaciones className="h-16" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
