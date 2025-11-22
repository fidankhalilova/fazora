import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface CartItem {
  id: string;
  houseId: number;
  houseName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  children: number;
  totalPrice: number;
  status: string;
  imageUrl?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("userCart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
