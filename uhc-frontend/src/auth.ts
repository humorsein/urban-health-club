// src/auth.ts
import NextAuth from "next-auth";
import Auth0 from "next-auth/providers/auth0";

export const {
  auth,                            // for middleware.ts (export { auth as middleware } from "@/auth")
  handlers: { GET, POST },         // re-export in /api/auth route
  signIn, signOut,                 // optional: use in server actions/components
} = NextAuth({
  providers: [
    Auth0({
      // MUST end with a trailing slash, e.g. https://dev-xxxxx.eu.auth0.com/
      issuer: process.env.AUTH0_ISSUER!,
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      // optional: ensure OIDC scopes
      authorization: { params: { scope: "openid profile email" } },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  // Optional: decorate the session with id token if you need to call APIs
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) token.accessToken = account.access_token as string;
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
});