import Credentials from "next-auth/providers/credentials";
import { signin } from "@lib/mongo/auth";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    Credentials({
      name: "Sign in",
      credentials: {
        email: { label: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true },
      },
      async authorize(credentials) {
        return await signin(
          credentials as Record<"email" | "password", string>
        );
      },
    }),
  ],
  callbacks: {
    jwt({ token, trigger, session }) {
      if (trigger === "update") {
        if (session?.email) {
          token.email = session.email;
        }
        if (session?.image || session?.image === "") {
          token.picture = session.image;
        }
      }
      return token;
    },
  },
};
