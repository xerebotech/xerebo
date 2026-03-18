import Header from '@/components/Header';
import Pricing from '@/components/Pricing';
import Qualifier from '@/components/Qualifier';
import PackagesFAQ from '@/components/PackagesFAQ';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata = {
    title: 'Packages | Xerebo Technologies',
    description: 'View our pricing packages for your business needs.',
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
