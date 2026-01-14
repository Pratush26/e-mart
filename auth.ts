import bcrypt from "bcrypt"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { connectDB } from "./lib/dbConnect";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
      try {
        const { db } = await connectDB();
        const { email, password } = credentials;
        const user = await db.collection("users").findOne({ email });
        if (!user) throw new Error("No user found");

        const isPasswordValid = bcrypt.compare(password as string, user?.password);
        if (!isPasswordValid) throw new Error("Invalid password");

        return {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.photo,
        };
      } catch (err) {
        console.error("authentication error", err)
        return null;
      }
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
        const { db } = await connectDB();
        const dbUser = await db.collection("users").findOne({ email: profile?.email });
        if (!dbUser) return "/register";

        user.id = dbUser._id.toString();
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