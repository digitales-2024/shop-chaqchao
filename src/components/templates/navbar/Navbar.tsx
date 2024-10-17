import { ChaqchaoCharacter } from "@/assets/images/ChaqchaoCharacter";
import { ChaqchaoName } from "@/assets/images/ChaqchaoName";
import Link from "next/link";
import { Suspense } from "react";

import { CartSheet } from "@/components/cart/CartSheet";

import { SearchBar } from "./SearchBar";
import { UserLogin } from "./UserLogin";

export async function Navbar() {
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>{/* <MobileMenu menu={menu} /> */}</Suspense>
      </div>
      <div className="grid w-full grid-cols-3 items-center justify-center">
        <div className="flex w-full">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <ChaqchaoCharacter className="h-24" />
            <ChaqchaoName className="w-48" />
          </Link>
          {/* {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null} */}
        </div>
        <div className="flex justify-center">
          <SearchBar />
        </div>
        <div className="flex justify-end gap-4">
          <UserLogin />
          <CartSheet />
        </div>
      </div>
    </nav>
  );
}
