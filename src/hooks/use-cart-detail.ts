import { InvoiceData, InvoiceType, ReceiptData } from "@/types";
import { create } from "zustand";

import { steps } from "@/components/cart/CheckoutSteps";

interface Contact {
  name: string;
  lastName: string;
  email: string;
  phone: string;
}

interface DateOrder {
  date: Date | undefined;
  hour: string | undefined;
  fullDate: Date | undefined;
}

interface CartDetailState {
  contact: Contact;
  setContact: (data: Contact) => void;
  dateOrder: DateOrder;
  setDateOrder: (data: DateOrder) => void;
  invoice: InvoiceData | ReceiptData;
  someonePickup: boolean;
  setSomeonePickup: (data: boolean) => void;
  setInvoice: (data: InvoiceData) => void;
  activeStep: number;
  setActiveStep: (step: number) => void;
  editMode: number | null;
  setEditMode: (step: number | null) => void;
  completedSteps: number[];
  setCompletedSteps: (steps: number[]) => void;
  handleStepComplete: (stepIndex: number) => void;
  handleEdit: (stepIndex: number) => void;
  toggleStep: (stepIndex: number) => void;
}

const useCartDetail = create<CartDetailState>((set) => ({
  contact: {
    name: "",
    lastName: "",
    email: "",
    phone: "",
  },
  setContact: (contact: Contact) => set(() => ({ contact })),
  dateOrder: {
    date: undefined,
    hour: undefined,
    fullDate: undefined, //agregar nuevos atributos
  },
  setDateOrder: (dateOrder: DateOrder) => set(() => ({ dateOrder })),
  invoice: {
    documentType: "",
    number: "",
    typeInvoice: InvoiceType.RECEIPT,
    nameBusiness: "",
    address: "",
    country: "",
    state: "",
    city: "",
  } as InvoiceData,
  someonePickup: false,
  setSomeonePickup: (someonePickup: boolean) => set(() => ({ someonePickup })),
  setInvoice: (invoice: InvoiceData) => set(() => ({ invoice })),
  activeStep: 0,
  setActiveStep: (activeStep: number) => set(() => ({ activeStep })),
  editMode: null,
  setEditMode: (editMode: number | null) => set(() => ({ editMode })),
  completedSteps: [],
  setCompletedSteps: (completedSteps: number[]) =>
    set(() => ({ completedSteps })),
  handleStepComplete: (stepIndex: number) => {
    set((state) => ({
      completedSteps: [...state.completedSteps, stepIndex],
      editMode: null,
    }));
    if (stepIndex < steps.length - 1) {
      set(() => ({ activeStep: stepIndex + 1 }));
    }
  },
  handleEdit: (stepIndex: number) => {
    set(() => ({ editMode: stepIndex }));
    set(() => ({ activeStep: stepIndex }));
  },
  toggleStep: (stepIndex: number) => {
    set((state) => {
      if (
        state.completedSteps.includes(stepIndex) &&
        state.editMode !== stepIndex
      ) {
        return state;
      }
      return { activeStep: state.activeStep === stepIndex ? -1 : stepIndex };
    });
  },
}));

export default useCartDetail;
