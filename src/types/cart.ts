import type { Menu } from "./resto";

export interface CartRestaurant {
  id: number;
  name: string;
  logo: string;
}

export interface CartItem {
  id: number;
  menu: Menu;
  quantity: number;
  itemTotal: number;
}

export interface CartGroup {
  restaurant: CartRestaurant;
  items: CartItem[];
  subtotal: number;
}

export interface CartSummary {
  totalItems: number;
  totalPrice: number;
  restaurantCount: number;
}

export interface CartResult {
  cart: CartGroup[];
  summary: CartSummary;
}
