// src/auth.ts
import NextAuth from "next-auth";
import Auth0 from "next-auth/providers/auth0";

export const {
  auth,                            // used by middleware
  handlers: { GET, POST },         // re-export for /api/auth
  signIn, signOut,
} = NextAuth({
  providers: [
    Auth0({
      // IMPORTANT: issuer MUST end with a trailing slash
      issuer: process.env.AUTH0_ISSUER!, // e.g. https://dev-xxxxx.eu.auth0.com/
      // Prefer auto-discovery; if you want to be explicit, do this safely:
      // wellKnown: new URL(".well-known/openid-configuration", process.env.AUTH0_ISSUER!).toString(),
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Optional: protect routes (middleware also does this)
    authorized({ auth, request }) {
      const p = request.nextUrl.pathname;
      const protectedPaths = ["/bookings","/memberships","/checkins","/billings","/payments","/settings"];
      const needsLogin = protectedPaths.some((x) => p.startsWith(x));
      return !needsLogin || !!auth?.user;
    },
  },
});