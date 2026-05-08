import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  restaurantId: null,
  platforms: null,
  items: [], // Array of { id, name, price, quantity }
  
  setRestaurant: (restaurantId, platforms) => {
    // If adding from a new restaurant, clear the cart
    if (get().restaurantId !== restaurantId) {
      set({ restaurantId, platforms, items: [] });
    }
  },

  addItem: (item) => set((state) => {
    const existingItem = state.items.find((i) => i.id === item.id);
    if (existingItem) {
      return {
        items: state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    }
    return { items: [...state.items, { ...item, quantity: 1 }] };
  }),

  removeItem: (itemId) => set((state) => {
    const existingItem = state.items.find((i) => i.id === itemId);
    if (existingItem.quantity > 1) {
      return {
        items: state.items.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        ),
      };
    }
    return { items: state.items.filter((i) => i.id !== itemId) };
  }),

  clearCart: () => set({ items: [], restaurantId: null, platforms: null }),

  getCartTotal: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
