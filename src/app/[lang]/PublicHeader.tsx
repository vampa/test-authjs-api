"use client";

import Link from "next/link";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

import { Route, PublicRoute } from "@/core/enums/routes";

export default function PublicHeader({ session }: { session: Session | null }) {
  const homeUrl = session ? Route.Dashboard : PublicRoute.Home;

  const right = (
    <div className="header-right">
      {session ? (
        <>
          <Link href={Route.Dashboard} passHref>
            <span className="header-link">Dashboard</span>
          </Link>
          <a onClick={() => signOut()}>
            <span className="header-link">SIGN OUT</span>
          </a>
        </>
      ) : (
        <a onClick={() => signIn()}>
          <span>LOGIN</span>
        </a>
      )}
    </div>
  );

  return <nav className={"header-wrap"}>{right}</nav>;
}
