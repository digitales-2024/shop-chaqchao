import { Manager } from "socket.io-client";

const manager = new Manager(
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000",
  {
    reconnectionAttempts: 3,
    reconnectionDelay: 1000,
  },
);

export const socket = manager.socket("/");
