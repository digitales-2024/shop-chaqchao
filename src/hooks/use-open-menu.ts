import { create } from "zustand";

interface OpenMenuState {
  open: boolean;
  onOpenChange: () => void;
}
export const useOpenMenu = create<OpenMenuState>((set) => ({
  open: false,
  onOpenChange: () => set((state) => ({ open: !state.open })),
}));
