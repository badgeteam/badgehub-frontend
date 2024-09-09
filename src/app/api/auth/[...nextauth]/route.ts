import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: "Ov23liee9e0NlA0MrTis",
            clientSecret: "xxxxxxxxxxxxxxxx77511c935739cffdd6be094a",
        })
    ]// ...add more providers here
})

export {handler as GET, handler as POST}