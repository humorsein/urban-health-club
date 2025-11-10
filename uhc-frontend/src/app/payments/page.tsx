import { getPayments } from "../services/paymentService";

export default async function PaymentsPage() {
  const payments = await getPayments();
  return (
    <main>
      <h1>Payments</h1>
      <pre>{JSON.stringify(payments, null, 2)}</pre>
    </main>
  );
}