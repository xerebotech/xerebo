import Header from '@/components/Header';
import ResultsHero from '@/components/ResultsHero';
import CaseStudyGrids from '@/components/CaseStudyGrids';
import ResultsCTA from '@/components/ResultsCTA';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata = {
    title: 'Results & Success Stories | Xerebo Technologies',
    description: 'See the impact Xerebo Technologies has delivered for our clients.',
};

export default function ResultsPage() {
    return (
        <main className="bg-[#fefefe]">
            <Header />
            <Breadcrumbs items={[{ label: 'Results' }]} />

            <ResultsHero />
            <CaseStudyGrids />
            <ResultsCTA />

            <div className="bg-[#fefefe] pt-24">
                <Testimonials />
            </div>

            <Footer />
        </main>
    );
}
