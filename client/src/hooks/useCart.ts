import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItem,
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
} from "../store/slices/cartSlice";

import type { CartItem } from "../store/slices/cartSlice";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const itemCount = useAppSelector(selectCartItemCount);

  const addItemToCart = useCallback(
    (item: CartItem) => {
      dispatch(addToCart(item));
    },
    [dispatch]
  );

  const removeItemFromCart = useCallback(
    (id: string) => {
      dispatch(removeFromCart(id));
    },
    [dispatch]
  );

  const clearAllCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const updateItemInCart = useCallback(
    (id: string, updates: Partial<CartItem>) => {
      dispatch(updateCartItem({ id, updates }));
    },
    [dispatch]
  );

  return {
    cartItems: items,
    addToCart: addItemToCart,
    removeFromCart: removeItemFromCart,
    clearCart: clearAllCart,
    updateCartItem: updateItemInCart,
    getTotalPrice: () => total,
    getItemCount: () => itemCount,
  };
};
