import { useState, useEffect } from 'react';

const STORAGE_KEY = 'smiles-shop:cart';

const readCart = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

export const useCart = () => {
    const [cart, setCart] = useState(readCart);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        } catch {
        }
    }, [cart]);

    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (!existing) {
                return [...prev, { ...product, amount: 1 }];
            }
            return prev.map((item) =>
                item.id === product.id ? { ...item, amount: item.amount + 1 } : item
            );
        });
    };

    const plusCart = (itemId) => {
        setCart((prev) =>
            prev.map((item) => (item.id === itemId ? { ...item, amount: item.amount + 1 } : item))
        );
    };

    const minusCart = (itemId) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === itemId && item.amount > 1 ? { ...item, amount: item.amount - 1 } : item
            )
        );
    };

    /** Полностью убрать товар из корзины. */
    const deleteCart = (itemId) => {
        setCart((prev) => prev.filter((item) => item.id !== itemId));
    };

    /** Очистить корзину полностью. */
    const clearCart = () => setCart([]);

    /** Проверить, лежит ли товар в корзине. */
    const isInCart = (itemId) => cart.some((item) => item.id === itemId);

    /** Суммарное количество товаров в корзине (с учётом amount). */
    const cartCount = cart.reduce((sum, item) => sum + item.amount, 0);

    /** Суммарная стоимость корзины. */
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.amount, 0);

    return {
        cart,
        setCart,
        addToCart,
        plusCart,
        minusCart,
        deleteCart,
        clearCart,
        isInCart,
        cartCount,
        cartTotal,
    };
};
