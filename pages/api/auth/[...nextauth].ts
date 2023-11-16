import NextAuth, {
  Account,
  DefaultSession,
  User,
  Session,
  Profile,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/config/firebase";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials): Promise<any> {
        return await signInWithEmailAndPassword(
          auth,
          (credentials as any).email || "",
          (credentials as any).password || ""
        )
          .then((userCredential) => {
            if (userCredential.user) {
              
              return userCredential.user;
            }
            return userCredential;
          })
          .catch((error) => console.log(error))
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
          });
      },
      
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // callbacks: {
  //   async redirect({ url, baseUrl }) {
  //     // Allows relative callback URLs
  //     if (url.startsWith("/")) return `${baseUrl}${url}`
  //     // Allows callback URLs on the same origin
  //     else if (new URL(url).origin === baseUrl) return url
  //     return baseUrl
  //   }
  // }
  // callBacks: {
  //   async jwt({ token, account, profile }: {token: JWT,
  //     account: Account, profile: Profile}): Promise<JWT> {
  //       if (account) {
  //         token.accessToken = account.access_token
  //         token.id = profile.email
  //       }
  //       return token
  //     },
  // async session({ session, token, user }: {session: Session, token: JWT, user: User}): Promise<Session>{
  //   session.accessToken = token.accessToken
  //   const userEmail = auth.currentUser?.email;
  //   session.user.id = userEmail ? userEmail.toString() : "ss";

  //   return session
  // }
  // }
  // callbacks: {
  //   async session({
  //     session,
  //     token,
  //     user,
  //   }: {
  //     session: Session;
  //     token: JWT;
  //     user: User;
  //   }): Promise<Session> {
  //     session.accessToken = token.accessToken;
  //     const userEmail = auth.currentUser?.email;
  //     session.user.id = userEmail ? userEmail.toString() : "ss";

  //     return session;
  //   },
  // },
  callbacks: {
    async redirect({ url, baseUrl } : {url:string, baseUrl:string} ) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  }
};
export default NextAuth(authOptions);

// import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';
// import { firebaseClient, firebaseAdminClient } from '@/lib/firebase';

// export default NextAuth({
//  providers: [
//     Providers.Google({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//  ],
//  callbacks: {
//     async signIn(user, account, profile) {
//       const firebaseToken = await firebaseAdminClient.auth().createCustomToken(user.id);
//       user.firebaseToken = firebaseToken;
//       return true;
//     },
//     async session(session, user) {
//       session.user.firebaseToken = user.firebaseToken;
//       return session;
//     },
//  },
//  pages: {
//     signIn: '/auth/signin',
//     signOut: '/auth/signout',
//     error: '/auth/error',
//     verifyRequest: '/auth/verify-request',
//  },
//  adapter: firebaseClient,
// });
