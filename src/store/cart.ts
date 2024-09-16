import create from "zustand";
import { useEffect } from "react";

interface CartItem {
  type_place_id: number;
  nombre: number;
  event_id: number;
}

type CartState = {
  cart: Record<number, number>;
  items: {
    type_place_id: number;
    nombre: number;
    event_id: number;
    nom: string;
    price: number;
    image: string;
    titre: string;
  }[];
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  addItem: (
    id: number,
    eventId: number,
    nom: string,
    price: number,
    image: string,
    titre: string
  ) => void;
  loadCartFromLocalStorage: () => void;
  saveCartToLocalStorage: () => void;
  removeItem: (id: number) => void;
};

const useCartStore = create<CartState>((set, get) => ({
  cart: {}, // Initialiser à un objet vide côté serveur
  items: [], // Initialiser à un tableau vide côté serveur
  incrementQuantity: (id: number) =>
    set((state) => {
      const updatedCart = {
        ...state.cart,
        [id]: (state.cart[id] || 0) + 1,
      };
      return { cart: updatedCart };
    }),
  decrementQuantity: (id: number) =>
    set((state) => {
      const updatedCart = {
        ...state.cart,
        [id]: Math.max((state.cart[id] || 1) - 1, 1),
      };
      return { cart: updatedCart };
    }),
  addItem: (
    id: number,
    eventId: number,
    nom: string,
    price: number,
    image: string,
    titre: string
  ) =>
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.type_place_id === id
      );
      const quantity = state.cart[id] || 1;
      let updatedItems;
      if (existingItemIndex > -1) {
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? {
                ...item,
                nombre: quantity,
                event_id: eventId,
                nom,
                price,
                image,
                titre,
              }
            : item
        );
      } else {
        updatedItems = [
          ...state.items,
          {
            type_place_id: id,
            nombre: quantity,
            event_id: eventId,
            nom,
            price,
            image,
            titre,
          },
        ];
      }
      localStorage.setItem("items", JSON.stringify(updatedItems));
      localStorage.setItem("cart", JSON.stringify(get().cart)); // Update cart in localStorage
      return { items: updatedItems };
    }),
  loadCartFromLocalStorage: () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    const items = JSON.parse(localStorage.getItem("items") || "[]");
    set({ cart, items });
  },
  saveCartToLocalStorage: () => {
    const { cart, items } = get();
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("items", JSON.stringify(items));
  },
  removeItem: (type_place_id) => {
    set((state) => {
      const updatedItems = state.items.filter(
        (item) => item.type_place_id !== type_place_id
      );
      const { [type_place_id]: _, ...updatedCart } = state.cart;

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      localStorage.setItem("items", JSON.stringify(updatedItems));

      return { cart: updatedCart, items: updatedItems };
    });
  },
}));

// Hook pour charger les données depuis le localStorage côté client
export const useInitializeCartStore = () => {
  const loadCartFromLocalStorage = useCartStore(
    (state) => state.loadCartFromLocalStorage
  );

  useEffect(() => {
    // Charger les données depuis le localStorage après le rendu côté client
    if (typeof window !== "undefined") {
      loadCartFromLocalStorage();
    }
  }, [loadCartFromLocalStorage]);
};

export default useCartStore;
