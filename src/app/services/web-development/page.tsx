import type { Metadata } from 'next';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import CtaBand from '@/components/site/home/CtaBand';
import { FaqBlock, FeatureGrid, PageHero, SplitBlock, Steps } from '@/components/site/PageSections';
import type { Feature } from '@/components/site/PageSections';

export const metadata: Metadata = {
  title: 'Web Development in Dubai | Next.js Sites and Web Apps | Xerebo',
  description:
    'Xerebo builds Next.js websites, storefronts and internal tools engineered for speed, search visibility and conversion, with analytics and CRO wired in from day one.',
  alternates: { canonical: 'https://www.xerebo.com/services/web-development' },
};

const FEATURES: Feature[] = [
  {
    icon: 'Zap',
    title: 'Next.js by default',
    body: 'App Router, server components and edge caching. Sites that hit green Core Web Vitals on real devices, not just in the lab.',
    tone: 'bg-tint-amber',
  },
  {
    icon: 'Layers',
    title: 'Design systems, not one-off pages',
    body: 'A typed component library your team can extend for years without calling an agency for every new section.',
    tone: 'bg-tint-sky',
  },
  {
    icon: 'Boxes',
    title: 'Headless CMS',
    body: 'Editors get structured, preview-safe content models. Developers get clean, versioned data. Nobody edits raw HTML.',
    tone: 'bg-tint-mint',
  },
  {
    icon: 'ShoppingBag',
    title: 'Commerce builds',
    body: 'Storefronts with fast filtered navigation, indexable facets and a checkout that survives peak traffic.',
    tone: 'bg-tint-violet',
  },
  {
    icon: 'MonitorSmartphone',
    title: 'Internal tools and portals',
    body: 'Client portals, dashboards and admin apps built on the same stack, with auth and permissions done properly.',
    tone: 'bg-tint-sand',
  },
  {
    icon: 'BarChart3',
    title: 'Analytics wired at launch',
    body: 'GA4, GTM, server-side events and CRM handoff configured before go-live, so week one data is trustworthy.',
    tone: 'bg-tint-amber',
  },
];

const STEPS = [
  { phase: 'Sprint 0', title: 'Scope', body: 'Technical discovery, content inventory, integration list and a fixed sprint plan with a launch date.' },
  { phase: 'Sprint 1', title: 'System', body: 'Design system, component library and CMS models built and reviewed before any page assembly begins.' },
  { phase: 'Sprint 2–4', title: 'Build', body: 'Pages and templates assembled in the open. You review on a live preview URL after every sprint.' },
  { phase: 'Launch', title: 'Migrate', body: 'Redirect mapping, staged cutover, monitoring for two weeks, then full handover with documentation.' },
];

const FAQS = [
  {
    q: 'Will a rebuild hurt our rankings?',
    a: 'Not when the migration is planned. We map every URL, preserve or improve internal linking, keep parity on indexable content and monitor logs and coverage daily for the first two weeks after cutover.',
  },
  {
    q: 'Can you work with our existing design?',
    a: 'Yes. We can build against your Figma files, or run the design ourselves. Either way you end up owning a component library, not a set of static pages.',
  },
  {
    q: 'What stack do you hand over?',
    a: 'Next.js on Vercel or your own infrastructure, TypeScript throughout, your choice of headless CMS, plus repo access, environment docs and a walkthrough session for your team.',
  },
  {
    q: 'Do you maintain the site after launch?',
    a: 'Optional. Some clients take a monthly retainer for features and performance work, others take the repo and run it in house. Both are fine.',
  },
];

export default function WebDevelopmentPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Services"
          title="Websites built to rank, load and"
          accent="convert"
          body="We build on Next.js with search and analytics designed in from the first commit, so the site you launch does not need a rescue project six months later."
          primaryLabel="Request a build proposal"
          secondary={{ label: 'See our work', href: '/results' }}
        />

        <FeatureGrid
          heading="What we"
          accent="build"
          intro="One team covering architecture, design system, build and measurement. No handoff gaps between the people who design and the people who ship."
          features={FEATURES}
        />

        <SplitBlock
          id="migration"
          eyebrow="Replatform and migration"
          heading="Move platforms without losing"
          accent="traffic"
          body="Most traffic losses at launch are avoidable. We treat migration as its own workstream with its own checklist and its own owner."
          bullets={[
            'URL inventory and one-to-one redirect map, signed off before cutover',
            'Parity checks on titles, headings, schema and internal links',
            'Staged deploy with crawl and log monitoring on both environments',
            'Search Console and analytics continuity across the switch',
            'Rollback plan documented before launch day, not during it',
            'Two weeks of daily monitoring after go-live',
          ]}
          cta={{ label: 'Plan a migration', href: '/contact' }}
          reverse
        />

        <Steps heading="How a build" accent="runs" steps={STEPS} />

        <SplitBlock
          id="analytics"
          eyebrow="Analytics and CRO"
          heading="Measure what the traffic"
          accent="actually does"
          body="Traffic that does not convert is a cost. We instrument the site properly, then run a testing programme against the pages that carry revenue."
          bullets={[
            'GA4 and GTM built to a documented measurement plan',
            'Server-side events and CRM handoff for clean attribution',
            'Heatmaps and session review on high-intent templates',
            'A/B testing on forms, pricing and landing pages',
            'Live dashboards shared with your sales team',
            'Quarterly CRO review with prioritised next tests',
          ]}
          cta={{ label: 'Talk about CRO', href: '/contact' }}
        />

        <FaqBlock heading="Questions we get before a build" faqs={FAQS} />

        <CtaBand
          title="Get a build plan with a real launch date"
          body="Share the current site and what it needs to do. You get scope, timeline and cost within two working days."
        />
      </main>
      <SiteFooter />
    </>
  );
}
