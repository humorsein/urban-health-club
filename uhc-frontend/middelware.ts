export { auth as middleware } from "@/auth";
export const config = {
  matcher: [
    "/bookings","/memberships","/checkins","/billings","/payments","/settings"
  ],
};