import NextAuth, { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { NextApiRequest, NextApiResponse } from "next";

// Documentation used:
// https://mi-do.medium.com/integration-of-keycloak-with-applications-af1b0aefd967
// https://next-auth.js.org/configuration/initialization

const options: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID!,
      clientSecret: process.env.KEYCLOAK_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      (session as any).accessToken = token.accessToken;
      return session;
    },
    async signIn({ account, profile }) {
      return account?.provider === "keycloak";
    },
  },
  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };

// export default async function auth(req: NextApiRequest, res: NextApiResponse) {
//   return await NextAuth(req, res, options);
// }
