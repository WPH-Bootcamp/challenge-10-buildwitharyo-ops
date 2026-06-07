export interface PaymentMethod {
  value: string;
  name: string;
  short: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  { value: "BNI", name: "Bank Negara Indonesia", short: "BNI" },
  { value: "BRI", name: "Bank Rakyat Indonesia", short: "BRI" },
  { value: "BCA", name: "Bank Central Asia", short: "BCA" },
  { value: "Mandiri", name: "Mandiri", short: "MDR" },
];
