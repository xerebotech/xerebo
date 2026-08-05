import type { Metadata } from 'next';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import CtaBand from '@/components/site/home/CtaBand';
import { FaqBlock, FeatureGrid, PageHero, SplitBlock, Steps, Waitlist } from '@/components/site/PageSections';
import type { Feature } from '@/components/site/PageSections';

export const metadata: Metadata = {
  title: 'Xocials | Social Publishing and Listening | Coming Soon from Xerebo',
  description:
    'Xocials is Xerebo social software in build: multi-channel scheduling, approvals, listening and reporting that shares a spine with your search and web performance data.',
  alternates: { canonical: 'https://www.xerebo.com/products/xocials' },
};

const FEATURES: Feature[] = [
  {
    icon: 'CalendarDays',
    title: 'One calendar, every channel',
    body: 'Plan, draft and schedule across networks from a single view, with per-channel formatting handled for you.',
    tone: 'bg-tint-sand',
  },
  {
    icon: 'ShieldCheck',
    title: 'Approvals and brand controls',
    body: 'Route drafts to the people who must sign off, with locked brand rules so nothing off-message reaches publish.',
    tone: 'bg-tint-sky',
  },
  {
    icon: 'Images',
    title: 'Asset library',
    body: 'Creative, captions and variants stored against the campaign they belong to, reusable without hunting through drives.',
    tone: 'bg-tint-amber',
  },
  {
    icon: 'Ear',
    title: 'Listening',
    body: 'Track mentions of your brand, your competitors and the topics your buyers care about, filtered to signal.',
    tone: 'bg-tint-violet',
  },
  {
    icon: 'MessagesSquare',
    title: 'Unified inbox',
    body: 'Comments and messages from every channel in one queue, assignable to the person who should answer.',
    tone: 'bg-tint-mint',
  },
  {
    icon: 'TrendingUp',
    title: 'Reporting that connects',
    body: 'Social performance reported next to search and site data, so the channel argument gets settled with numbers.',
    tone: 'bg-tint-sand',
  },
];

const STEPS = [
  { phase: 'Now', title: 'Private build', body: 'Scheduling, approvals and the asset library running on Xerebo client accounts internally.' },
  { phase: 'Next', title: 'Design partners', body: 'Brands and agencies testing listening and the unified inbox against live volumes.' },
  { phase: 'Then', title: 'Early access', body: 'Waitlist cohorts onboarded with migration from existing scheduling tools.' },
  { phase: 'Later', title: 'General release', body: 'Public availability with shared reporting across XEO, Xpace and Xocials.' },
];

const FAQS = [
  {
    q: 'How is this different from the scheduler we already pay for?',
    a: 'Scheduling is table stakes. The difference is the reporting spine: Xocials reports into the same client record as your search and site performance, so you can compare channels honestly instead of per-tool.',
  },
  {
    q: 'Which networks will be supported at launch?',
    a: 'The major business networks first, driven by what design partners actually publish to. The channel list is being set by demand from the cohort, not by a checklist.',
  },
  {
    q: 'Can agencies manage multiple brands?',
    a: 'Yes. Multi-workspace with per-client permissions and white-labelled reporting is part of the core design, not a later add-on.',
  },
  {
    q: 'Is there a launch date?',
    a: 'Not published yet. Xocials ships after the design partner cohort has run a full quarter of live publishing through it.',
  },
];

export default function XocialsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Products"
          badge="Coming soon"
          title="Xocials: social that reports into the same"
          accent="growth graph"
          body="Publishing, approvals, listening and analytics in one workspace, wired to the same client record as your search and web performance. In private build now."
          primaryLabel="Join the waitlist"
          secondary={{ label: 'Talk to the product team', href: '/contact' }}
        />

        <FeatureGrid
          heading="What Xocials"
          accent="covers"
          intro="Everything a brand or agency team needs to plan, ship and defend social work."
          features={FEATURES}
        />

        <SplitBlock
          eyebrow="Why it exists"
          heading="Social keeps getting judged on the"
          accent="wrong numbers"
          body="Impressions and follower counts do not survive a board meeting. Xocials is built so social performance can be argued next to pipeline, using the same definitions as every other channel."
          bullets={[
            'One client record shared across social, search and site data',
            'Consistent attribution rules instead of per-platform maths',
            'Campaign-level cost and outcome in the same table',
            'Reporting your finance team can reconcile',
            'Approvals that keep regulated industries safe to publish',
            'Built alongside XEO so the reporting layer is already proven',
          ]}
          reverse
        />

        <Steps heading="Where Xocials is" accent="today" steps={STEPS} />

        <Waitlist
          product="Xocials"
          note="Design partners shape the channel roadmap, get migration support from their current scheduler and keep founding pricing. Tell us what you publish and where, and we will say honestly whether the current build fits."
        />

        <FaqBlock heading="Questions about Xocials" faqs={FAQS} />

        <CtaBand
          title="Get on the Xocials early access list"
          body="Cohorts are small and onboarded in order. Existing Xerebo clients go first."
        />
      </main>
      <SiteFooter />
    </>
  );
}
