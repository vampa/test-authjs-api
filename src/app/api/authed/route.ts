import { auth } from "@/auth";

export const GET = auth(async function GET(req) {
  const session = await auth();

  if (req.auth) {
    console.log("API TEST success => session =>", req.auth);
    return Response.json(req.auth);
  } else {
    console.log('API TEST unauthorized "session" value =>', req, session);
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
});
