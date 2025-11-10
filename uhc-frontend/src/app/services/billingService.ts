import { fetchFromAPIM } from "./apiClient";

export type Billing = {
  id: string;
  memberId: string;
  amount: number;
  currency: string;
  status: string;
  issuedAt?: string;
};

export async function getBillings(): Promise<Billing[]> {
  return fetchFromAPIM<Billing[]>("/billings");
}