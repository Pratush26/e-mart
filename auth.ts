import bcrypt from "bcrypt"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
      if (!credentials?.email || !credentials?.password) return null;
      const res = await fetch(`${process.env.Backend}/user?email=${credentials.email}`);
      if (!res.ok) return null;
      
      const user = await res.json();
      if (!user) return null;

      const isPasswordValid = await bcrypt.compare(credentials.password as string, user.password);
      if (!isPasswordValid) return null;

      return {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.photo,
        role: user.role,
      };
    },
  }),
  ],

  pages: {
    signIn: "/login",
  },

  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        if (!profile?.email) return false;

        const res = await fetch(`${process.env.Backend}/user?email=${profile.email}`);
        if (!res.ok) return false;

        const dbUser = await res.json();
        if (!dbUser) return "/register";

        user.id = dbUser._id;
        user.name = dbUser.name;
        user.email = dbUser.email;
        user.image = dbUser.photo;
        user.role = dbUser.role;
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.image = token.image as string;
      session.user.role = token.role as "employee" | "seller" | "user" | "admin";
      return session;
    },
  },
});