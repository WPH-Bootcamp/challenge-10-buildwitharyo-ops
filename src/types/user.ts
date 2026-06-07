export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokenResponse {
  token: string;
}
