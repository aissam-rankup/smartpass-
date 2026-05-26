import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await auth();
    const userCount = await prisma.user.count();
    const partnerCount = await prisma.partner.count();

    return NextResponse.json({
      ok: true,
      session: session
        ? { id: session.user?.id, email: session.user?.email, role: session.user?.role }
        : null,
      db: { users: userCount, partners: partnerCount },
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message, stack: (e as Error).stack },
      { status: 500 }
    );
  }
}
