import { Hero } from "@/components/landing/Hero";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { WhySmartPass } from "@/components/landing/WhySmartPass";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { AgadirExperience } from "@/components/landing/AgadirExperience";
import { Categories } from "@/components/landing/Categories";
import { Cities } from "@/components/landing/Cities";
import { FeaturedPartners } from "@/components/landing/FeaturedPartners";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { HomeJsonLd } from "@/components/landing/JsonLd";

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <Hero />
      <ProblemSolution />
      <WhySmartPass />
      <HowItWorks />
      <AgadirExperience />
      <Categories />
      <Cities />
      <FeaturedPartners />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
