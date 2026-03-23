import Header from '@/components/Header';
import Pricing from '@/components/Pricing';
import Qualifier from '@/components/Qualifier';
import PackagesFAQ from '@/components/PackagesFAQ';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata = {
    title: 'Xerebo Digital Marketing Packages in Dubai for Qualified Leads',
    description: 'Not for everyone. Our digital marketing packages in Dubai, built for businesses ready to scale with industry-specific systems, qualified leads, and real revenue.',
    alternates: {
        canonical: 'https://www.xerebo.com/packages',
    },
};

export default function PackagesPage() {
    return (
        <main className="bg-dark-deepest">
            <Header />
            <Breadcrumbs items={[{ label: 'Packages' }]} />
            <div>
                <Qualifier />
                <Pricing />
                <PackagesFAQ />
            </div>
            <Footer />
        </main>
    );
}
