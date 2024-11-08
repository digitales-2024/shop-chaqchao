import { ClientData } from "./client";

export type OrderClient = {
  id: string;
  pickupCode: string;
  orderStatus: string;
  totalAmount: null;
  pickupTime: Date;
  client: ClientData;
};
