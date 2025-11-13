import { create } from "zustand";
import type { OrderInfo } from "../pages/cart";

export interface Item {
    id: string
    quantity: number
}

export interface Order extends OrderInfo {
    id: number
    items: Item[]
}

interface CartStore {
    items: { id: string; quantity: number }[]
    addItem: (item: { id: string; quantity: number }) => void
    checkout: (data: OrderInfo) => void
    orders: Order[]
    removeItem: (itemId: string) => void
    incrementItemQuantity: (itemId: string) => void
    decrementItemQuantity: (itemId: string) => void
    itemQuantity: (itemId: string, increment?: boolean) => void
}

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],
    orders: [],

    addItem: (item) => {
        set((state) => ({
            items: [...state.items, item]
        }))
    },

    checkout: (order) => {
        set({
            orders: [...get().orders, {
                id: new Date().getTime(),
                ...order,
                items: get().items
            }]
        })
    },

    removeItem: (itemId) => {
        set(state => ({
            items: state.items.filter(item => item.id !== itemId)
        }))
    },

    itemQuantity: (itemId, increment = false) => {
        set(state => ({
            items: state.items.map(item => {
                if (itemId === item.id) {
                    if (increment) {
                        item.quantity -= 1
                    }
                    else {
                        item.quantity += 1
                    }
                }
                return item
            })
        }))
    },

    incrementItemQuantity: (itemId) => {
        get().itemQuantity(itemId, true)
    },

    decrementItemQuantity: (itemId) => {
        get().itemQuantity(itemId)
    },
}))