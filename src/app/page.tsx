import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import Hero from '@/components/site/home/Hero';
import LogoMarquee from '@/components/site/home/LogoMarquee';
import Capabilities from '@/components/site/home/Capabilities';
import OfferingCarousel from '@/components/site/home/OfferingCarousel';
import ProductSwitcher from '@/components/site/home/ProductSwitcher';
import Quote from '@/components/site/home/Quote';
import GetStarted from '@/components/site/home/GetStarted';
import Recognition from '@/components/site/home/Recognition';
import CtaBand from '@/components/site/home/CtaBand';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <LogoMarquee />
        <Capabilities />
        <OfferingCarousel />
        <ProductSwitcher />
        <Quote />
        <GetStarted />
        <Recognition />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
