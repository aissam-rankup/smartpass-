import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const results: Record<string, unknown> = {};

  try {
    results.step1_auth = "starting";
    const session = await auth();
    results.step1_auth = session ? { id: session.user?.id, role: session.user?.role } : "no session";
  } catch (e) {
    results.step1_auth = { error: (e as Error).message };
  }

  try {
    results.step2_user_lookup = "starting";
    const session = await auth();
    if (session?.user?.id) {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { id: true, role: true, partnerId: true, email: true, name: true },
      });
      results.step2_user_lookup = user;
    }
  } catch (e) {
    results.step2_user_lookup = { error: (e as Error).message };
  }

  try {
    results.step3_partners = "starting";
    const partners = await prisma.partner.findMany({
      take: 2,
      select: { id: true, name: true, slug: true },
    });
    results.step3_partners = partners;
  } catch (e) {
    results.step3_partners = { error: (e as Error).message };
  }

  try {
    results.step4_import_labels = "starting";
    const { CATEGORY_LABEL, CITIES } = await import("@/lib/labels");
    results.step4_import_labels = {
      categories: Object.keys(CATEGORY_LABEL),
      cities: CITIES,
    };
  } catch (e) {
    results.step4_import_labels = { error: (e as Error).message, stack: (e as Error).stack?.slice(0, 500) };
  }

  try {
    results.step5_import_enums = "starting";
    const { PartnerCategory, Role } = await import("@/lib/enums");
    results.step5_import_enums = {
      categories: Object.keys(PartnerCategory),
      roles: Object.keys(Role),
    };
  } catch (e) {
    results.step5_import_enums = { error: (e as Error).message, stack: (e as Error).stack?.slice(0, 500) };
  }

  return NextResponse.json(results, { status: 200 });
}
