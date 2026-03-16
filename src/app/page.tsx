import Header from '@/components/Header';
import Hero from "@/components/Hero";
import SocialProofTicker from '@/components/ui/SocialProofTicker';
import HowItWorks from "@/components/HowItWorks";
import Footer from '@/components/Footer';
import AgencyProblem from '@/components/AgencyProblem';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import CostComparison from '@/components/CostComparison';

export default function Home() {
  return (
    <main>
      <SocialProofTicker />
      <Header />
      <Hero />
      <AgencyProblem />
      <HowItWorks />
      <Pricing />      <CostComparison />

      <Testimonials />
      <Footer />
    </main>
  );
}
