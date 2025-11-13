import { create } from "zustand";
import type { Coffee } from "../@types/coffee";

interface CoffeeStore {
    coffees: Coffee[]
    setCoffees: (coffees: Coffee[]) => void
}

export const useCoffeeStore = create<CoffeeStore>((set) => ({
    coffees: [],

    setCoffees: (coffees) => {
        set({ coffees })
    }
}))