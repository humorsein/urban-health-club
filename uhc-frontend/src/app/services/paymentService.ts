import { fetchFromAPIM } from "./apiClient";

export type Payment = {
  id: string;
  memberId: string;
  amount: number;
  currency: string;
  method: string;
  status: string;
  createdAt?: string;
};

export async function getPayments(): Promise<Payment[]> {
  return fetchFromAPIM<Payment[]>("/payments");
}

export async function createPayment(payload: Partial<Payment>): Promise<Payment> {
  return fetchFromAPIM<Payment>("/payments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}