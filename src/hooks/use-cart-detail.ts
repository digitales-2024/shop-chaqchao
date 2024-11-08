import { create } from "zustand";

interface CartDetailState {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  hour: string | undefined;
  setHour: (hour: string) => void;
  invoice: string | undefined;
  setInvoice: (invoice: string) => void;
  fullDate: Date | undefined;
  setFullDate: (date: Date) => void;
  step: number;
  totalSteps: number;
  setStep: (step: number) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  handleConfirmDate: () => void;
}

const useCartDetail = create<CartDetailState>((set) => ({
  date: undefined,
  setDate: (date: Date | undefined) => set(() => ({ date })),
  hour: undefined,
  setHour: (hour: string) => set(() => ({ hour })),
  invoice: "RECEIPT",
  setInvoice: (invoice: string) => set(() => ({ invoice })),
  fullDate: undefined,
  setFullDate: (fullDate: Date) => set(() => ({ fullDate })),
  step: 1,
  totalSteps: 3,
  setStep: (step: number) => set(() => ({ step })),
  handleNext: () =>
    set((state) => ({
      step: state.step < state.totalSteps ? state.step + 1 : state.step,
    })),
  handlePrevious: () =>
    set((state) => ({ step: state.step > 1 ? state.step - 1 : state.step })),
  handleConfirmDate: () =>
    set((state) => ({ step: state.step === 1 ? state.step + 1 : state.step })),
}));

export default useCartDetail;
