export interface ReviewPayload {
  transactionId: string;
  restaurantId: number;
  star: number;
  comment: string;
  menuIds: number[];
}
