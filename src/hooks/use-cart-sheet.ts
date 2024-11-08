import { create } from "zustand";

interface CartSheetState {
  open: boolean;
  onOpenChange: () => void;
}

const useCartSheet = create<CartSheetState>((set) => ({
  open: false,
  onOpenChange: () => set((state) => ({ open: !state.open })),
}));

export default useCartSheet;
