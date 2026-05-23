import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getCurrentUserWithSubscription } from "@/lib/access";

export default async function TouristLayout({ children }: { children: React.ReactNode }) {
  const { user } = await getCurrentUserWithSubscription();
  if (!user) redirect("/login?callbackUrl=/dashboard");
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] bg-sand">{children}</main>
      <Footer />
    </>
  );
}
