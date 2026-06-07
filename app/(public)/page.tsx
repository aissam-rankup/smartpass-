import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SavingsDemo } from "@/components/landing/SavingsDemo";
import { WhyLowPrices } from "@/components/landing/WhyLowPrices";
import { FeaturedPartners } from "@/components/landing/FeaturedPartners";
import { Categories } from "@/components/landing/Categories";
import { Testimonials } from "@/components/landing/Testimonials";
import { ComparisonTable } from "@/components/landing/ComparisonTable";
import { Cities } from "@/components/landing/Cities";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { StickyMobileCTA } from "@/components/landing/StickyMobileCTA";
import { HomeJsonLd } from "@/components/landing/JsonLd";

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      {/* 1. Hero — value prop, prix, CTA, réassurances */}
      <Hero />
      {/* 2. Comment ça marche — 3 étapes */}
      <HowItWorks />
      {/* 3. Démonstration des économies — exemple chiffré */}
      <SavingsDemo />
      {/* 4. Partenaires vedettes — preuve sociale concrète */}
      <FeaturedPartners />
      {/* 5. Pourquoi les prix sont si bas — transparence */}
      <WhyLowPrices />
      {/* 6. Catégories — toutes les catégories couvertes */}
      <Categories />
      {/* 7. Témoignages voyageurs */}
      <Testimonials />
      {/* 8. Tableau comparatif — combien économiser */}
      <ComparisonTable />
      {/* 9. Villes couvertes */}
      <Cities />
      {/* 10. FAQ */}
      <FAQ />
      {/* 11. CTA final */}
      <FinalCTA />
      {/* Mobile sticky CTA bar */}
      <StickyMobileCTA />
    </>
  );
}
