import type { Metadata } from 'next';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import CtaBand from '@/components/site/home/CtaBand';
import { FaqBlock, FeatureGrid, PageHero, SplitBlock, Steps } from '@/components/site/PageSections';
import type { Feature } from '@/components/site/PageSections';

export const metadata: Metadata = {
  title: 'XEO | SEO and AI Search Intelligence Platform by Xerebo',
  description:
    'XEO is the platform Xerebo strategists run on: site audits, rank tracking, backlink data, AI answer visibility and client reporting in a single workspace.',
  alternates: { canonical: 'https://www.xerebo.com/products/xeo' },
};

const FEATURES: Feature[] = [
  {
    icon: 'FileSearch',
    title: 'Site audit engine',
    body: 'Scheduled crawls that flag indexation, speed, schema and internal linking problems, grouped by template so fixes scale.',
    tone: 'bg-tint-amber',
  },
  {
    icon: 'LineChart',
    title: 'Rank and SERP tracking',
    body: 'Daily positions by device and location, with SERP feature ownership and share-of-voice against your real competitors.',
    tone: 'bg-tint-sky',
  },
  {
    icon: 'Bot',
    title: 'AI visibility monitor',
    body: 'Track whether assistants cite your brand for the prompts your buyers use, and which source they pull from when they do not.',
    tone: 'bg-tint-violet',
  },
  {
    icon: 'Radar',
    title: 'Backlink intelligence',
    body: 'New, lost and toxic links surfaced with context, plus prospect lists built from competitor gaps rather than scraped dumps.',
    tone: 'bg-tint-mint',
  },
  {
    icon: 'Activity',
    title: 'Content and cannibalisation',
    body: 'Cluster mapping that shows which pages compete with each other and which brief is missing from the topic entirely.',
    tone: 'bg-tint-sand',
  },
  {
    icon: 'Users',
    title: 'Client reporting workspace',
    body: 'Shareable live dashboards with commentary. Agencies can white-label them per client without exporting a single slide.',
    tone: 'bg-tint-amber',
  },
];

const STEPS = [
  { phase: 'Step 1', title: 'Connect', body: 'Add a domain, link Search Console and analytics. The first crawl completes in minutes, not overnight.' },
  { phase: 'Step 2', title: 'Diagnose', body: 'XEO ranks every issue by traffic at risk, so the first ticket you open is the one worth opening.' },
  { phase: 'Step 3', title: 'Act', body: 'Assign fixes, generate briefs and push tasks to your existing tracker. Progress updates as work lands.' },
  { phase: 'Step 4', title: 'Report', body: 'Live dashboards tie rankings and AI citations to sessions, enquiries and revenue for every stakeholder.' },
];

const FAQS = [
  {
    q: 'Who is XEO built for?',
    a: 'In-house marketing teams that own a domain, and agencies managing many. It is the same workspace our own strategists use on client programmes every day.',
  },
  {
    q: 'How is AI visibility measured?',
    a: 'You define the prompts that matter to your category. XEO runs them on a schedule, records whether your brand appears and which sources were cited, then tracks that share over time.',
  },
  {
    q: 'Can we export the data?',
    a: 'Yes. CSV export on every table and an API for the metrics that feed your own warehouse or client dashboards.',
  },
  {
    q: 'Do we need a Xerebo service contract to use it?',
    a: 'No. XEO is sold on its own. Service clients get it included with their programme.',
  },
];

export default function XeoPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Products"
          badge="Live"
          title="XEO: the search intelligence platform we"
          accent="run on"
          body="Crawling, rank tracking, backlinks, AI answer visibility and client reporting in one workspace. Built inside an agency, so it optimises for shipped work rather than for screenshots."
          primaryLabel="Request a walkthrough"
          secondary={{ label: 'Open xeo.xerebo.com', href: 'https://xeo.xerebo.com' }}
        />

        <FeatureGrid id="tracking" heading="What is inside" accent="XEO" features={FEATURES} />

        <SplitBlock
          id="audits"
          eyebrow="Audits that end in fixes"
          heading="From crawl to closed"
          accent="ticket"
          body="Most tools stop at a list of problems. XEO carries each finding through to the person who can close it, and tracks whether the fix held."
          bullets={[
            'Findings grouped by template, so one fix clears hundreds of URLs',
            'Every issue ranked by sessions and revenue at risk',
            'Reproduction steps and acceptance criteria written for developers',
            'Push to Jira, Linear or Asana without leaving the workspace',
            'Automatic re-crawl to confirm the fix actually shipped',
            'Regression alerts when a deploy reintroduces an old issue',
          ]}
          cta={{ label: 'See it on your domain', href: '/contact' }}
        />

        <Steps heading="Getting started takes" accent="an afternoon" steps={STEPS} />

        <SplitBlock
          id="visibility"
          eyebrow="AI visibility"
          heading="Rankings are only half the"
          accent="surface now"
          body="Buyers ask assistants before they open a results page. XEO tracks that layer with the same rigour as classic rank tracking."
          bullets={[
            'Prompt sets defined per product, market and buying stage',
            'Citation tracking across the assistants your buyers actually use',
            'Source analysis showing who gets quoted when you do not',
            'Entity and schema coverage scoring for your key pages',
            'Alerts when a competitor takes over a prompt you owned',
            'Share-of-answer trend reported next to organic share-of-voice',
          ]}
          reverse
        />

        <FaqBlock heading="Common questions about XEO" faqs={FAQS} />

        <CtaBand
          title="See XEO running on your own domain"
          body="Book a walkthrough and we will connect your site live on the call. No slide deck, no sandbox data."
        />
      </main>
      <SiteFooter />
    </>
  );
}
