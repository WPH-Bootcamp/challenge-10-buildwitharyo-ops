import type { Pagination, PriceRange } from "./api";

export type MenuType = "food" | "drink";

export interface Menu {
  id: number;
  foodName: string;
  price: number;
  type: MenuType;
  image: string;
}

export interface RestaurantSummary {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  category: string;
  reviewCount: number;
  menuCount: number;
  priceRange: PriceRange;
  distance?: number;
}

export interface RestaurantReview {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    avatar: string | null;
  };
}

export interface RestaurantDetail {
  id: number;
  name: string;
  star: number;
  averageRating: number;
  place: string;
  coordinates: {
    lat: number;
    long: number;
  };
  logo: string;
  images: string[];
  category: string;
  totalMenus: number;
  totalReviews: number;
  menus: Menu[];
  reviews: RestaurantReview[];
}

export interface RestaurantListResult {
  restaurants: RestaurantSummary[];
  pagination: Pagination;
}

/** Shape shared by every component that renders a restaurant card. */
export interface RestaurantCardData {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  distance?: number;
}
