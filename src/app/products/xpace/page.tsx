import type { Metadata } from 'next';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import CtaBand from '@/components/site/home/CtaBand';
import { FaqBlock, FeatureGrid, PageHero, SplitBlock, Steps, Waitlist } from '@/components/site/PageSections';
import type { Feature } from '@/components/site/PageSections';

export const metadata: Metadata = {
  title: 'Xpace | ERP for Service Businesses | Coming Soon from Xerebo',
  description:
    'Xpace is the ERP Xerebo is building for service businesses: projects, resourcing, invoicing and margin in one system. Join the early access waitlist.',
  alternates: { canonical: 'https://www.xerebo.com/products/xpace' },
};

const FEATURES: Feature[] = [
  {
    icon: 'FolderKanban',
    title: 'Projects and delivery',
    body: 'Scopes, milestones and tasks that stay tied to the contract they came from, so scope creep is visible the week it starts.',
    tone: 'bg-tint-mint',
  },
  {
    icon: 'Users',
    title: 'Resourcing and capacity',
    body: 'See who is over-booked before the month starts. Plan hiring against committed work, not against a hunch.',
    tone: 'bg-tint-sky',
  },
  {
    icon: 'CalendarClock',
    title: 'Time and approvals',
    body: 'Lightweight timesheets people actually fill in, with approval flows that match how your delivery leads already work.',
    tone: 'bg-tint-amber',
  },
  {
    icon: 'Receipt',
    title: 'Quotes, invoices, payments',
    body: 'Quote to invoice without retyping anything, with VAT handling and reminders for the invoices that go quiet.',
    tone: 'bg-tint-sand',
  },
  {
    icon: 'PieChart',
    title: 'Margin by project and client',
    body: 'Revenue against delivered cost, live. Find the account that looks big and earns nothing before renewal, not after.',
    tone: 'bg-tint-violet',
  },
  {
    icon: 'ShieldCheck',
    title: 'Roles and audit trail',
    body: 'Scoped permissions per role and a complete change history, so finance and ops can both trust the same numbers.',
    tone: 'bg-tint-mint',
  },
];

const STEPS = [
  { phase: 'Now', title: 'Private build', body: 'Core project, resourcing and timesheet modules running internally on Xerebo delivery work.' },
  { phase: 'Next', title: 'Design partners', body: 'A small cohort of service businesses shaping billing, approvals and reporting against real workflows.' },
  { phase: 'Then', title: 'Early access', body: 'Waitlist cohorts onboarded in order, with migration help from spreadsheets and legacy tools.' },
  { phase: 'Later', title: 'General release', body: 'Public availability with integrations into XEO, accounting platforms and the wider Xerebo stack.' },
];

const FAQS = [
  {
    q: 'When does Xpace launch?',
    a: 'Design partners come first, then waitlist cohorts. We are not publishing a public date until the billing module has run a full quarter on real client work, including ours.',
  },
  {
    q: 'Who is it for?',
    a: 'Service businesses between roughly 10 and 200 people: agencies, consultancies, engineering studios and clinics. Anyone whose margin lives in the gap between sold hours and delivered hours.',
  },
  {
    q: 'Will it replace our accounting software?',
    a: 'No. Xpace owns delivery, resourcing and billing, then pushes clean data into your accounting platform. We are building integrations rather than a ledger.',
  },
  {
    q: 'Does it connect to XEO?',
    a: 'Yes. For teams running both, campaign work in XEO and delivery cost in Xpace report against the same client record.',
  },
];

export default function XpacePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Products"
          badge="Coming soon"
          title="Xpace: the ERP shaped around how service teams"
          accent="actually run"
          body="Projects, people, invoices and margin in one system instead of four spreadsheets and a group chat. Currently in private build, running on our own delivery work first."
          primaryLabel="Join the waitlist"
          secondary={{ label: 'Talk to the product team', href: '/contact' }}
        />

        <FeatureGrid
          heading="What Xpace"
          accent="handles"
          intro="One record per client, from the signed scope through to the margin it returned."
          features={FEATURES}
        />

        <SplitBlock
          eyebrow="Why we are building it"
          heading="Because we were the"
          accent="worst case"
          body="Xerebo ran delivery across a project tool, a timesheet, three spreadsheets and an accounting package. Every month-end was archaeology. Xpace started as the internal fix."
          bullets={[
            'One source of truth from scope to invoice to margin',
            'Numbers finance and delivery both recognise, without reconciliation',
            'Utilisation visible weekly instead of discovered at quarter end',
            'Approvals that match real delivery, not a generic workflow builder',
            'Built and stress-tested on live agency work before it ships to anyone',
            'Priced for teams that cannot justify enterprise ERP implementations',
          ]}
        />

        <Steps id="roadmap" heading="Where Xpace is" accent="today" steps={STEPS} />

        <Waitlist
          product="Xpace"
          note="Design partners get direct input into the roadmap, migration support and locked founding pricing. Tell us how your team runs delivery today and we will tell you honestly whether Xpace fits."
        />

        <FaqBlock heading="Questions about Xpace" faqs={FAQS} />

        <CtaBand
          title="Help shape Xpace before it ships"
          body="We are taking a small group of design partners this cohort. If delivery margin is your problem, this is the useful conversation."
        />
      </main>
      <SiteFooter />
    </>
  );
}
