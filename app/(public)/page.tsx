import { Hero } from "@/components/landing/Hero";
import { FeaturedPartners } from "@/components/landing/FeaturedPartners";
import { Categories } from "@/components/landing/Categories";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Cities } from "@/components/landing/Cities";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { HomeJsonLd } from "@/components/landing/JsonLd";

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      {/* 1. Hero */}
      <Hero />
      {/* 2. Vérifiés un par un. Aimés de tous. */}
      <FeaturedPartners />
      {/* 3. 9 catégories. 47 partenaires. */}
      <Categories />
      {/* 4. 3 étapes simples pour voyager au vrai prix. */}
      <HowItWorks />
      {/* 5. 6 villes. Un seul Pass. */}
      <Cities />
      {/* 6. Reviews */}
      <Testimonials />
      {/* 7. FAQ */}
      <FAQ />
      {/* 8. Final CTA */}
      <FinalCTA />
    </>
  );
}
