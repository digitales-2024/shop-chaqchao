"use client";
import { OrderClient } from "@/types/order";
import { MoreVertical } from "lucide-react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";

interface OrderDisplayProps {
  order: OrderClient | null;
}

export const OrderDetail = ({ order }: OrderDisplayProps) => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex w-full items-center justify-end p-2">
        <Separator orientation="vertical" className="mx-2 h-6" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={!order}>
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
            <DropdownMenuItem>Star thread</DropdownMenuItem>
            <DropdownMenuItem>Add label</DropdownMenuItem>
            <DropdownMenuItem>Mute thread</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
      {order ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <div className="grid gap-1">
                <div className="font-semibold">asdasd</div>
                <div className="line-clamp-1 text-xs">asdasd</div>
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">Reply-To:</span>
                </div>
              </div>
            </div>
            {/* {order.date && (
              <div className="ml-auto text-xs text-muted-foreground">
                {format(new Date(order.date), "PPpp")}
              </div>
            )} */}
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">asdasd</div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  );
};
