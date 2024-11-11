import { auth } from "@/auth";
import { APIRoute } from "@/core/enums/routes";

export default async function DashPage() {
  const session = await auth();

  const response = await fetch(
    `${process.env.NEXT_BASE_URL}${APIRoute.Authed}`,
    {
      next: {
        revalidate: 0,
      },
    }
  );
  console.log("AUTHED ENDPOINT RESPONSE TO SERVER COMPONENT =>", response);

  return (
    <div>
      <h2>DASHBOARD</h2>
      {session ? <p>{JSON.stringify(session)}</p> : <p>no session</p>}
    </div>
  );
}
