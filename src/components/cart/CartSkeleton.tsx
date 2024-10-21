import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const CartSkeleton = () => {
  return (
    <Card className="h-auto w-60 border-secondary/10 bg-transparent">
      <div className="flex flex-col items-center justify-center gap-4 px-2 py-10">
        <Skeleton className="size-32 rounded"></Skeleton>
        <Skeleton className="h-20 w-48 rounded"></Skeleton>
      </div>
      <Skeleton className="m-4 h-10"></Skeleton>
    </Card>
  );
};
