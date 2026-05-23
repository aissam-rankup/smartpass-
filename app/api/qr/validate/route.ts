import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/role";
import { rateLimit } from "@/lib/rate-limit";
import { QRStatus, Role } from "@/lib/enums";

const Body = z.object({ token: z.string().min(1) });

export async function POST(req: Request) {
  const role = await requireRole(Role.PARTNER, Role.ADMIN);
  if (!role.ok) return NextResponse.json({ error: "Forbidden" }, { status: role.status });

  const rl = rateLimit(`qr-validate:${role.user.id}`, 100, 60 * 60 * 1000);
  if (!rl.ok) return NextResponse.json({ error: "Trop de scans" }, { status: 429 });

  const parsed = Body.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const qr = await prisma.qRCode.findUnique({
    where: { token: parsed.data.token },
    include: {
      offer: { select: { id: true, name: true, normalPrice: true, reducedPrice: true, currency: true } },
      partner: { select: { id: true, name: true } },
      user: { select: { name: true, email: true } },
    },
  });

  if (!qr) return NextResponse.json({ status: "INVALID", error: "QR inconnu" }, { status: 404 });

  // Partner can only validate their own QRs (admin: any)
  if (role.user.role === Role.PARTNER && role.user.partnerId !== qr.partnerId) {
    return NextResponse.json(
      { status: "INVALID", error: "Ce QR ne concerne pas votre établissement" },
      { status: 403 }
    );
  }

  if (qr.status === QRStatus.USED) {
    return NextResponse.json({
      status: "USED",
      usedAt: qr.usedAt,
      offer: qr.offer,
      partner: qr.partner,
    });
  }
  if (qr.status === QRStatus.EXPIRED || qr.status === QRStatus.REVOKED) {
    return NextResponse.json({ status: qr.status, offer: qr.offer });
  }

  // Mark as USED
  const updated = await prisma.qRCode.update({
    where: { id: qr.id },
    data: { status: QRStatus.USED, usedAt: new Date(), scannedBy: role.user.id },
  });

  // Counters
  await prisma.$transaction([
    prisma.offer.update({ where: { id: qr.offerId }, data: { totalScans: { increment: 1 } } }),
    prisma.partner.update({ where: { id: qr.partnerId }, data: { totalScans: { increment: 1 } } }),
  ]);

  const firstName = (qr.user.name ?? qr.user.email).split(" ")[0];

  return NextResponse.json({
    status: "OK",
    touristName: firstName,
    offer: qr.offer,
    partner: qr.partner,
    validatedAt: updated.usedAt,
  });
}
