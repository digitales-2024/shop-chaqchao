import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const CartSkeleton = () => {
  return (
    <Card className="h-[40rem] w-[22rem] overflow-hidden border-secondary/10 bg-transparent">
      <div className="group/product bg-transparento grid h-full w-full grid-rows-[1fr_200px] gap-10 p-4">
        <Skeleton className="size-full rounded"></Skeleton>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-20 w-full rounded"></Skeleton>
          <Skeleton className="h-10 w-full rounded"></Skeleton>
        </div>
      </div>
    </Card>
  );
};
