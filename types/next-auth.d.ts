import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: Account.accessToken
    user: {
      /** The user's postal address. */
      address: string
      id: string

    } & DefaultSession["user"]
  }
}


declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: Account.accessToken
    }
}