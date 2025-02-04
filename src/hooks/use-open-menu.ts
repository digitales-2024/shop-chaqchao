import { create } from "zustand";

interface OpenMenuState {
  open: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}
export const useOpenMenu = create<OpenMenuState>((set) => ({
  open: false,
  onOpenChange: () => set((state) => ({ open: !state.open })),
  onClose: () => set({ open: false }),
}));
