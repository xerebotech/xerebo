import Header from '@/components/Header';
import ContactFormLight from '@/components/ContactFormLight';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata = {
    title: 'Contact Xerebo | Book Your Strategy Call in Dubai',
    description: 'Speak with Xerebo. Discover how to generate qualified leads and scale your revenue with a clear, data-driven 90-day plan',
};

export default function ContactPage() {
    return (
        <main className="bg-dark-deepest">
            <Header />
            <Breadcrumbs items={[{ label: 'Contact Us' }]} />
            <div className="bg-[#FFF4E6] pb-24">
                <ContactFormLight />
            </div>
            <Footer />
        </main>
    );
}
