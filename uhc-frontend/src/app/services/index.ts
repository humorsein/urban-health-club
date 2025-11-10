// src/app/services/index.ts

// Re-export the API client
export { fetchFromAPIM } from "./apiClient";

// Billings
export type { Billing } from "./billingService";
export { getBillings } from "./billingService";

// Payments
export type { Payment } from "./paymentService";
export { getPayments, createPayment } from "./paymentService";

// (Future) Memberships / Bookings / Check-ins can be added here:
// export * from "./membershipService";
// export * from "./bookingService";
// export * from "./checkinService";