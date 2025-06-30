import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

export default NextAuth({
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
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),

  session: {
    strategy: "jwt", // ← tambahkan ini!
  },

  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account && profile) {
        token.accessToken = account.access_token;
        token.name = profile.name;
      }
      if (user && user.name) {
        token.name = user.name;
      }
      // fallback: jika masih belum ada, ambil dari token.email
      if (!token.name && token.email) {
        token.name = token.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token?.accessToken as string | undefined;
      if (session.user) {
        session.user.name = session.user.name ?? session.user.email ?? "Guest";
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Hanya override jika url bukan external
      if (url.startsWith(baseUrl)) {
        return url;
      }

      // Jika logout (kembali ke "/")
      if (url === "/") return baseUrl + "/";

      // Default ke dashboard
      return baseUrl + "/admin/dashboard";
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    signOut: "/",
  },
});
