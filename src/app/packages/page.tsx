import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import PricingPage from '@/components/site/pricing/PricingPage';
import CtaBand from '@/components/site/home/CtaBand';

export const metadata = {
    title: 'Xerebo Pricing | Growth Retainers and XEO Platform Plans',
    description:
        'Transparent Xerebo pricing in AED. Growth service retainers from AED 5,699 a month and XEO platform plans starting free, with a full feature comparison.',
    alternates: {
        canonical: 'https://www.xerebo.com/packages',
    },
};

export default function PackagesPage() {
    return (
        <>
            <SiteHeader />
            <PricingPage />
            <CtaBand
                title="Still deciding which plan fits?"
                body="Tell us the goal and the timeline. We will point you at the smallest plan that can actually get you there."
            />
            <SiteFooter />
        </>
    );
}
