const loadCartFromLocalStorage = () => {
    try {
        const cartData = localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : [];
    } catch (e) {
        console.error("Failed to load cart from localStorage", e);
        return [];
    }
};

export default loadCartFromLocalStorage
