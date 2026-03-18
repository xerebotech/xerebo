import Header from '@/components/Header';
import ContactFormLight from '@/components/ContactFormLight';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata = {
    title: 'Contact Us | Xerebo Technologies',
    description: 'Get in touch with Xerebo Technologies to ignite your lead engine.',
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
