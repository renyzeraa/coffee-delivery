import { create } from "zustand";

interface CartStore {
    items: { id: string; quantity: number }[]
    addItem: (item: { id: string; quantity: number }) => void
}

export const useCartStore = create<CartStore>((set) => ({
    items: [],

    addItem: (item) => set((state) => ({
        items: [...state.items, item]
    }))
}))