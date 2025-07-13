const loadCartFromLocalStorage = (title: string) => {
    try {
        const cartData = localStorage.getItem(title);
        return cartData ? JSON.parse(cartData) : undefined;
    } catch (e) {
        console.error("Failed to load cart from localStorage", e);
        return undefined;
    }
};

export default loadCartFromLocalStorage
