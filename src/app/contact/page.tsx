import Header from '@/components/Header';
import ContactForm from '@/components/ContactForm';
import FAQ from '@/components/FAQ';
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
            <div>
                <ContactForm />
                <FAQ />
            </div>
            <Footer />
        </main>
    );
}
