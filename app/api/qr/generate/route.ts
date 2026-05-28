import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getActiveSubscription } from "@/lib/access";
import { rateLimit } from "@/lib/rate-limit";
import { QRStatus } from "@/lib/enums";

const Body = z.object({ offerId: z.string().min(1) });

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sub = await getActiveSubscription(session.user.id);
  if (!sub) return NextResponse.json({ error: "Smart Pass requis" }, { status: 402 });

  const rl = rateLimit(`qr-gen:${session.user.id}`, 20, 60 * 60 * 1000);
  if (!rl.ok) return NextResponse.json({ error: "Trop de demandes" }, { status: 429 });

  const parsed = Body.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const offer = await prisma.offer.findFirst({
    where: { id: parsed.data.offerId, isActive: true, isPaused: false },
    include: { partner: { select: { id: true, isActive: true } } },
  });
  if (!offer || !offer.partner.isActive) {
    return NextResponse.json({ error: "Offre indisponible" }, { status: 404 });
  }

  // Revoke any prior active QR for the same offer+user (one active code per pair)
  await prisma.qRCode.updateMany({
    where: { userId: session.user.id, offerId: offer.id, status: QRStatus.ACTIVE },
    data: { status: QRStatus.REVOKED },
  });

  const qr = await prisma.qRCode.create({
    data: {
      userId: session.user.id,
      offerId: offer.id,
      partnerId: offer.partner.id,
      status: QRStatus.ACTIVE,
    },
  });

  return NextResponse.json({ token: qr.token, id: qr.id, generatedAt: qr.generatedAt });
}
