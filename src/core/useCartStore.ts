import { create } from 'zustand';
import { Product } from '../components/ProductCardView';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],

  addToCart: (product) => {
    const items = get().cartItems;
    const existing = items.find((item) => item.id === product.id);

    if (existing) {
        console.log("existing", {items})
      set({
        cartItems: items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
        console.log("not existing in item list")
      set({
        cartItems: [...items, { ...product, quantity: 1 }],
      });
      console.log({items})
    }
  },

  removeFromCart: (id) => {
    set({
      cartItems: get().cartItems.filter((item) => item.id !== id),
    });
  },

  updateQuantity: (id, quantity) => {
    set({
      cartItems: get().cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      ),
    });
  },

  clearCart: () => {
    set({ cartItems: [] });
  },

  total: () =>
    get().cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
}));

export const cartActions = {
  addToCart: (product: Product) => useCartStore.getState().addToCart(product),
  removeFromCart: (id: number) => useCartStore.getState().removeFromCart(id),
  updateQuantity: (id: number, quantity: number) =>
    useCartStore.getState().updateQuantity(id, quantity),
  clearCart: () => useCartStore.getState().clearCart(),
  total: () => useCartStore.getState().total(),
};
