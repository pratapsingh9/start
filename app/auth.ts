import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { Session } from "next-auth";
import type { TokenSet } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = { id: "1", name: "cjhon", email: credentials?.email };
        return user || null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name; // Add name to token
        token.email = user.email; // Add email to token
      }
      return token;
    },

    async session({ session, token }: {
      session: any,
      token: any  
    }) {
      if (session.user) {
        session.user = {
          ...session.user,
          id: token.id as string,    
          name: token.name as string,
          email: token.email as string,
        };
      }
      return session;
    },

  },
  pages: {
    signIn: "/signin", // Custom sign-in page
  },
};
