import NextAuth from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak";

const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_ID!,
            clientSecret: process.env.KEYCLOAK_SECRET!,
            issuer: process.env.KEYCLOAK_ISSUER,
        })
    ], // ...add more providers here
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            (session as any).accessToken = token.accessToken
            return session
        },
        async signIn({ account, profile }) {
            if (account?.provider === "keycloak") {
                return true;
            }
            return false;
        },
    },
    pages: {
        signIn: "/signin",
    },
})

export {handler as GET, handler as POST}