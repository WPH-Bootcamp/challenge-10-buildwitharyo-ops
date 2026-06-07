import type { Pagination } from "./api";
import type { CartRestaurant } from "./cart";

export type OrderStatus =
  | "preparing"
  | "on_the_way"
  | "delivered"
  | "done"
  | "cancelled";

export interface OrderPricing {
  subtotal: number;
  serviceFee: number;
  deliveryFee: number;
  totalPrice: number;
}

export interface OrderItem {
  menuId: number;
  menuName: string;
  price: number;
  image?: string;
  quantity: number;
  itemTotal: number;
}

export interface OrderRestaurant {
  restaurant: CartRestaurant;
  items: OrderItem[];
  subtotal: number;
}

export interface Order {
  id: number;
  transactionId: string;
  status: OrderStatus;
  paymentMethod: string;
  deliveryAddress: string;
  phone?: string | null;
  pricing: OrderPricing;
  restaurants: OrderRestaurant[];
  createdAt: string;
  updatedAt?: string;
}

export interface OrdersResult {
  orders: Order[];
  pagination: Pagination;
}

export interface CheckoutPayload {
  paymentMethod: string;
  deliveryAddress: string;
  phone?: string;
  notes?: string;
  restaurants: {
    restaurantId: number;
    items: { menuId: number; quantity: number }[];
  }[];
}
