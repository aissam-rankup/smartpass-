import { Hero } from "@/components/landing/Hero";
import { WhyExists } from "@/components/landing/WhyExists";
import { SavingsDemo } from "@/components/landing/SavingsDemo";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { WhyLowPrices } from "@/components/landing/WhyLowPrices";
import { Guarantees } from "@/components/landing/Guarantees";
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
      {/* 1. Hero — Voyagez sans payer le prix touriste */}
      <Hero />
      {/* 2. Pourquoi Morocco Pass existe — explication du problème AVANT la promesse */}
      <WhyExists />
      {/* 3. Démonstration des économies — ROI immédiat */}
      <SavingsDemo />
      {/* 4. Comment ça marche — 3 étapes */}
      <HowItWorks />
      {/* 5. Partenaires vedettes — preuve sociale concrète */}
      <FeaturedPartners />
      {/* 6. Pourquoi les prix sont si bas — transparence */}
      <WhyLowPrices />
      {/* 7. Nos garanties — vérifié, garanti, transparent */}
      <Guarantees />
      {/* 8. Catégories — toutes les catégories couvertes */}
      <Categories />
      {/* 9. Témoignages voyageurs */}
      <Testimonials />
      {/* 10. Tableau comparatif — combien économiser */}
      <ComparisonTable />
      {/* 11. Villes couvertes */}
      <Cities />
      {/* 12. FAQ */}
      <FAQ />
      {/* 13. CTA final */}
      <FinalCTA />
      {/* Mobile sticky CTA bar */}
      <StickyMobileCTA />
    </>
  );
}
