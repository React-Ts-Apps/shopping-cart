import type { RootState } from "../../store";


export const cartCountSelector = (state: RootState) => {
    const count = state.cart.items.reduce((count, item) => count + item.quantity, 0)
    return count
}

export const cartSumSelector = (state: RootState) => {
    const sum = state.cart.items.reduce((sum, item) => (item.price * item.quantity) + sum, 0)
    return sum
}