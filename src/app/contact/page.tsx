import SiteHeader from '@/components/site/SiteHeader';
import ContactFormLight from '@/components/ContactFormLight';
import SiteFooter from '@/components/site/SiteFooter';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata = {
    title: 'Contact Xerebo | Book Your Strategy Call in Dubai',
    description: 'Speak with Xerebo. Discover how to generate qualified leads and scale your revenue with a clear, data-driven 90-day plan',
    alternates: {
        canonical: 'https://www.xerebo.com/contact',
    },
};

export default function ContactPage() {
    return (
        <main className="bg-dark-deepest">
            <SiteHeader />
            <Breadcrumbs items={[{ label: 'Contact Us' }]} />
            <div className="bg-[#FFF4E6] pb-24">
                <ContactFormLight />
            </div>
            <SiteFooter />
        </main>
    );
}
