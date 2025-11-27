import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Model } from '../data/models';

interface CartItem extends Model {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (model: Model) => void;
  removeItem: (modelId: string) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (model) => {
        const items = get().items;
        const existingItem = items.find((i) => i.id === model.id);
        
        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === model.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...items, { ...model, quantity: 1 }] });
        }
      },
      removeItem: (modelId) => {
        set({
          items: get().items.filter((i) => i.id !== modelId),
        });
      },
      clearCart: () => set({ items: [] }),
      total: () => {
        return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
