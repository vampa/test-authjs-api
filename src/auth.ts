import NextAuth, { User } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "../auth.config";

import { prisma } from "./core/database/prismaClient";

export const {
  auth,
  handlers: { GET, POST },
  unstable_update: update,
} = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: user.email || "",
          },
          select: {
            id: true,
            email: true,
          },
        });

        if (user && dbUser) {
          token.id = dbUser.id;
          token.email = dbUser.email;
        }
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.settings = token.settings as User["settings"];
      }
      return session;
    },
  },
  ...authConfig,
});
