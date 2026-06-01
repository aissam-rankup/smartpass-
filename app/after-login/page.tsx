import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AfterLogin() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true, partnerId: true },
  });

  if (!user) redirect("/login");

  switch (user.role) {
    case "ADMIN":
      redirect("/admin/dashboard");
    case "PARTNER":
      redirect("/partner/scan");
    case "TOURIST":
    default:
      redirect("/dashboard");
  }
}
