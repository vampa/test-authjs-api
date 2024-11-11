import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  if (session) {
    console.log("API TEST success => session =>", session);
    return Response.json(session);
  } else {
    console.log('API TEST unauthorized "session" value =>', session);
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}
