import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    name: string;
    email: string;
    emailVerified: Date;
    image: string;
    role: string;
    settings: {
      avatar?: string;
      phoneNumber?: string;
      colorTheme: string;
    };
  }

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      settings: {
        avatar?: string;
        phoneNumber?: string;
        colorTheme: string;
        firstName?: string;
        lastName?: string;
      };
    } & DefaultSession["user"];
  }
}
