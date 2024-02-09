import { auth, currentUser } from "@clerk/nextjs";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_H847NIC2C4ZGHv7ZwYSNAuKvx1zc4we_R4K9GkFva4kbm1zd_bDgkDkL5ZzEVj_0",
});

export async function POST(request: Request) {
  const authorization = await auth();
  const user = await currentUser();

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await request.json();
  const canvas = await convex.query(api.canvas.get, {
    id: room,
  });

  if (canvas?.orgId !== authorization?.orgId) {
    return new Response("Unauthorized", { status: 403 });
  }

  const userInfo = {
    name: user?.firstName || "Teammate",
    picture: user?.imageUrl,
  };

  const session = liveblocks.prepareSession(user?.id, {
    userInfo,
  });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();

  return new Response(body, { status });
}
