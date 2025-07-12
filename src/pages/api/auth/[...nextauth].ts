// pages/api/auth/[...nextauth].ts
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
// Extend Session and User types to include custom properties
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

// 🟦 Perlu supaya kita bisa pakai di server (API)
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
  }),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account && profile) {
        token.accessToken = account.access_token;
        token.name = profile.name;
      }
      if (user?.name) token.name = user.name;
      if (!token.name && token.email) token.name = token.email;
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token?.accessToken as string | undefined;
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = session.user.name ?? session.user.email ?? "Guest";
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      if (url === "/") return baseUrl + "/";
      return baseUrl + "/admin/dashboard";
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    signOut: "/",
  },
};

// 🟩 NextAuth handler
export default NextAuth(authOptions);
