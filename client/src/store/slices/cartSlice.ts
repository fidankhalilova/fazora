import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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

interface CartState {
  items: CartItem[];
}

const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  const savedCart = localStorage.getItem("userCart");
  if (savedCart) {
    try {
      return JSON.parse(savedCart);
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
    }
  }
  return [];
};

const initialState: CartState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      localStorage.setItem("userCart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("userCart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("userCart", JSON.stringify(state.items));
    },
    updateCartItem: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<CartItem> }>
    ) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload.updates,
        };
        localStorage.setItem("userCart", JSON.stringify(state.items));
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateCartItem } =
  cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.totalPrice, 0);
export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.items.length;

export default cartSlice.reducer;
