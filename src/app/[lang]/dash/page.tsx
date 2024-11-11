import { headers } from "next/headers";
import { auth } from "@/auth";
import { APIRoute } from "@/core/enums/routes";

export default async function DashPage() {
  const session = await auth();
  const headersList = await headers();

  const response = await fetch(
    `${process.env.NEXT_BASE_URL}${APIRoute.Authed}`,
    {
      headers: {
        cookie: headersList.get("cookie") || "",
      },
      next: {
        revalidate: 0,
      },
    }
  );
  const resp = await response.json();
  console.log("AUTHED ENDPOINT RESPONSE TO SERVER COMPONENT =>", resp);

  return (
    <div>
      <h2>DASHBOARD</h2>
      <p>{session ? JSON.stringify(session) : "no session"}</p>
    </div>
  );
}
