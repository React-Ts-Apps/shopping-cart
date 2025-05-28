import type { RootState } from "../store";


export const cartCountSelector = (state: RootState) => {
    const count = state.cart.items.reduce((count, item) => count + item.quantity, 0)
    return count
}