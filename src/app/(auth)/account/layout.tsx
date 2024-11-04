import LayoutShop from "@/app/(shop)/layout";
import { ReactNode } from "react";

import { Sidebar } from "@/components/templates/account/Sidebar";
import { Separator } from "@/components/ui/separator";

interface AccountLayoutProps {
  children: ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <LayoutShop>
      <div className="container mx-auto space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <Sidebar />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </LayoutShop>
  );
}
