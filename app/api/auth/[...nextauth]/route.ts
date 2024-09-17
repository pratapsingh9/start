import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Credentials Provider (Email/Password login)
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Your email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {

        const user = { id: '1', name: 'John Doe', email: credentials?.email };

        if (user) {
          // If credentials are valid, return the user object
          return user;
        } else {
          // If credentials are invalid, return null
          return null;
        }
      },
    }),
  ],
  // Add callbacks to handle session data
  callbacks: {
    async jwt({ token, user }) {
      // Persist the user info in the JWT
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }:any) {
      // Add custom fields to the session
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  // Optional pages if you want to customize them
  pages: {
    signIn: '/signin',
  },
};

const handler = NextAuth(authOptions);

export {handler as GET , handler as POST};

