import { createContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.sizeId === item.sizeId);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.sizeId === item.sizeId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: item.quantity }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter(item => item.sizeId !== itemId));
  };

  const updateCartItem = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.sizeId === id
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
