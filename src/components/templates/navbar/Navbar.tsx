import { ChaqchaoCharacter } from "@/assets/images/ChaqchaoCharacter";
import { ChaqchaoName } from "@/assets/images/ChaqchaoName";
import { useLocale } from "next-intl";
import Link from "next/link";

import { CartSheet } from "@/components/cart/CartSheet";

import { LanguageSelector } from "./LanguageSelector";
import { MenuList } from "./MenuList";
import { SearchBar } from "./SearchBar";
import { UserLogin } from "./UserLogin";

export function Navbar() {
  const locale = useLocale();
  return (
    <nav className="fixed z-50 flex w-full items-center justify-between bg-white p-4 lg:px-6">
      <div className="container mx-auto grid w-full grid-cols-3 items-center justify-center">
        <div className="flex w-full">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <ChaqchaoCharacter className="h-24" />
            <ChaqchaoName className="w-48" />
          </Link>
        </div>
        <div className="inline-flex justify-center">
          <MenuList />
        </div>
        <div className="flex items-center justify-end gap-6">
          <SearchBar />
          <CartSheet />
          <UserLogin />
          <LanguageSelector defaultValue={locale} />
        </div>
      </div>
    </nav>
  );
}
