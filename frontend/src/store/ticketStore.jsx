import { create } from "zustand";

export const useTicketStore = create((set) => ({
    isUpdated: false,
    setIsUpdated: (value) => set({ isUpdated: value }),
}));