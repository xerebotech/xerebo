import type { Metadata } from 'next';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import CtaBand from '@/components/site/home/CtaBand';
import { FaqBlock, FeatureGrid, PageHero, SplitBlock, Steps } from '@/components/site/PageSections';
import type { Feature } from '@/components/site/PageSections';

export const metadata: Metadata = {
  title: 'SEO Services in Dubai | Technical, Content and Authority | Xerebo',
  description:
    'Xerebo runs SEO as one programme: technical fixes, topical authority, digital PR and AI answer visibility, measured against pipeline rather than rankings alone.',
  alternates: { canonical: 'https://www.xerebo.com/services/seo' },
};

const FEATURES: Feature[] = [
  {
    icon: 'FileSearch',
    title: 'Technical audit and fix queue',
    body: 'Crawl, log-file and Core Web Vitals analysis turned into a ranked ticket list your developers can actually close.',
    tone: 'bg-tint-amber',
  },
  {
    icon: 'PenLine',
    title: 'Topical authority content',
    body: 'Entity-led topic maps, briefs written for intent, and editing that keeps a real subject-matter voice on the page.',
    tone: 'bg-tint-sky',
  },
  {
    icon: 'Link2',
    title: 'Digital PR and links',
    body: 'Earned coverage and placements from publications your buyers already read, never from a link farm.',
    tone: 'bg-tint-mint',
  },
  {
    icon: 'Bot',
    title: 'AI answer visibility',
    body: 'Structured data, entity coverage and citation-friendly formatting so assistants quote you, not your competitor.',
    tone: 'bg-tint-violet',
  },
  {
    icon: 'MapPin',
    title: 'Local and multi-location SEO',
    body: 'Profile management, location pages and review velocity for teams selling across the UAE and India.',
    tone: 'bg-tint-sand',
  },
  {
    icon: 'Gauge',
    title: 'Reporting on pipeline',
    body: 'Live dashboards in XEO that tie sessions to enquiries to closed revenue, refreshed daily instead of monthly.',
    tone: 'bg-tint-amber',
  },
];

const STEPS = [
  { phase: 'Week 1', title: 'Diagnose', body: 'Full technical crawl, content inventory, backlink and competitor gap analysis on your live data.' },
  { phase: 'Week 2', title: 'Plan', body: 'A ranked roadmap: what gets fixed, what gets written, what gets earned, with owners and dates.' },
  { phase: 'Week 3+', title: 'Execute', body: 'Our team ships fixes and content weekly, working inside your stack and your ticketing system.' },
  { phase: 'Monthly', title: 'Compound', body: 'Review against pipeline, retire what underperforms, double down on the clusters that move revenue.' },
];

const FAQS = [
  {
    q: 'How long before we see movement?',
    a: 'Technical and on-page fixes usually show inside 4 to 8 weeks. Authority and competitive head terms take 4 to 6 months. We report leading indicators weekly so you are never waiting in the dark.',
  },
  {
    q: 'Do you work with our existing developers?',
    a: 'Yes. We hand over ranked tickets with reproduction steps and acceptance criteria. If your team is at capacity, our web development arm can implement instead.',
  },
  {
    q: 'What does the reporting look like?',
    a: 'You get a live XEO workspace: rankings, crawl health, AI citations, traffic and lead attribution in one place, plus a monthly review call with the strategist who owns your account.',
  },
  {
    q: 'Is there a lock-in contract?',
    a: 'Programmes run on a three-month minimum because that is the honest floor for meaningful work. After that it is month to month.',
  },
];

export default function SeoServicePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Services"
          title="SEO that is measured in"
          accent="pipeline"
          body="Technical, content and authority run as a single programme by one senior team, on the same platform we sell. No handoffs between agencies, no reports nobody reads."
          primaryLabel="Request an SEO proposal"
          secondary={{ label: 'See client results', href: '/results' }}
        />

        <FeatureGrid
          heading="What the programme"
          accent="covers"
          intro="Every engagement includes all six workstreams. The mix shifts with your diagnosis, not with a package tier."
          features={FEATURES}
        />

        <SplitBlock
          id="sprint"
          eyebrow="Technical SEO sprint"
          heading="Six weeks to a"
          accent="clean foundation"
          body="For sites carrying years of debt. A fixed-scope sprint that clears the blockers stopping everything else from working."
          bullets={[
            'Full crawl, index bloat analysis and canonical strategy',
            'Core Web Vitals work with before and after field data',
            'Internal linking rebuild across hubs and spokes',
            'Schema and entity markup across all template types',
            'Redirect and status-code cleanup with a signed-off map',
            'Handover doc so the fixes stay fixed after we leave',
          ]}
          cta={{ label: 'Scope a sprint', href: '/contact' }}
        />

        <Steps heading="How an engagement" accent="runs" steps={STEPS} />

        <FaqBlock heading="Questions we get before signing" faqs={FAQS} />

        <CtaBand
          title="Put a senior team on your search problem"
          body="Send us the domain. You get a diagnosis and a scoped proposal within two working days, free."
        />
      </main>
      <SiteFooter />
    </>
  );
}
