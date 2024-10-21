import { ClientLogin } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type ClientState = {
  client: ClientLogin | null;
  setClient: (client: ClientLogin) => void;
  clearClient: () => void;
};

export const useAuth = create<ClientState>()(
  persist(
    immer((set) => ({
      client: null,
      setClient: (client: ClientLogin) => {
        set((state) => {
          state.client = client;
        });
      },
      clearClient: () => {
        set((state) => {
          state.client = null;
        });
      },
    })),
    {
      name: "client",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage() {
        return (state, error) => {
          if (error) {
            (state as ClientState).clearClient();
          }
        };
      },
    },
  ),
);
