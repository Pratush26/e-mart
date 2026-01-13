import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    name?: string;
    email?: string;
    image?: string;
    role?: "employee" | "seller" | "user" | "admin";
  }

  interface Session {
    user: {
      id?: string;
      name?: string;
      email?: string;
      image?: string;
      role?: "employee" | "seller" | "user" | "admin";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string;
    email?: string;
    image?: string;
    role?: "employee" | "seller" | "user" | "admin";
  }
}