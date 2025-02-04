import { LayoutShop as LayoutOnlyShop } from "@/components/templates/LayoutShop";
export default async function LayoutShop({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <LayoutOnlyShop>{children}</LayoutOnlyShop>;
}
