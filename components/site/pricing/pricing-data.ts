export type Feature = { label: string; info?: string };

export type Plan = {
  id: string;
  name: string;
  /**
   * Platform plans price per seat per month in AED. Service plans price the
   * whole retainer. `null` renders the custom-quote card.
   */
  price: number | null;
  /** Unit shown beside the figure, split across two lines like the reference. */
  unitTop: string;
  unitBottom: string;
  blurb?: string;
  seatNote?: string;
  /** One-off engagements are not recurring, so no billing cycle or commitment discount applies. */
  oneOff?: boolean;
  popular?: boolean;
  ctaLabel: string;
  /** Discount applied to the computed total, in AED per month. */
  specialOffer?: number;
  inheritsFrom?: string;
  addon?: { title: string; detail: string; tone: string; locked?: boolean };
  featureHeading: string;
  features: Feature[];
};

export type PlanSet = {
  id: string;
  label: string;
  note: string;
  /** Left-hand control: seat count for the platform, commitment for services. */
  selector: { label: string; options: { value: number; label: string }[]; kind: 'seats' | 'commitment' };
  plans: Plan[];
  comparison: { group: string; rows: { label: string; info?: string; values: (string | boolean)[] }[] }[];
};

export const PLATFORM_PLANS: PlanSet = {
  id: 'platform',
  label: 'XEO platform',
  note: 'Per seat, per month. Included free with any Growth services retainer.',
  selector: {
    kind: 'seats',
    label: 'Choose team size:',
    options: [
      { value: 3, label: '3 seats' },
      { value: 5, label: '5 seats' },
      { value: 10, label: '10 seats' },
      { value: 25, label: '25 seats' },
      { value: 50, label: '50 seats' },
    ],
  },
  plans: [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      unitTop: 'free',
      unitBottom: 'forever',
      seatNote: 'Up to 2 seats',
      ctaLabel: 'Try for free',
      addon: { title: 'AI visibility', detail: 'Available from Starter', tone: 'bg-surface-alt', locked: true },
      featureHeading: 'Free includes:',
      features: [
        { label: '1 domain', info: 'One property, verified through Search Console.' },
        { label: '100 tracked keywords', info: 'Refreshed weekly on desktop and mobile.' },
        { label: 'Crawl up to 500 URLs', info: 'Manual crawls, one scheduled run per week.' },
        { label: 'Core Web Vitals monitoring', info: 'Field data pulled from CrUX where available.' },
        { label: 'Community support', info: 'Docs and the public forum.' },
      ],
    },
    {
      id: 'starter',
      name: 'Starter',
      price: 79,
      unitTop: 'seat /',
      unitBottom: 'month',
      ctaLabel: 'Try for free',
      inheritsFrom: 'Free',
      addon: { title: 'Basic AI', detail: '2 tools · 500 prompts / month', tone: 'bg-tint-sand' },
      featureHeading: 'Includes Free, plus:',
      features: [
        { label: 'Unlimited viewers', info: 'Read-only seats never count toward your plan.' },
        { label: '1,000 tracked keywords', info: 'Daily refresh with location targeting.' },
        { label: 'Crawl up to 10,000 URLs', info: 'Scheduled daily crawls per domain.' },
        { label: 'Scheduled email reports', info: 'Weekly or monthly, per recipient list.' },
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 129,
      unitTop: 'seat /',
      unitBottom: 'month',
      popular: true,
      specialOffer: 200,
      ctaLabel: 'Try for free',
      inheritsFrom: 'Starter',
      addon: { title: 'AI essentials', detail: '5 tools · 2,000 prompts / month', tone: 'bg-tint-amber' },
      featureHeading: 'Includes Starter, plus:',
      features: [
        { label: '3 domains · 5,000 keywords', info: 'Each domain gets its own crawl schedule.' },
        { label: 'AI answer visibility', info: 'Tracks whether assistants cite you, and who they cite instead.' },
        { label: 'Backlink monitoring', info: 'New, lost and toxic links with alerting.' },
        { label: 'Cannibalisation mapping', info: 'Flags pages competing for the same intent.' },
        { label: 'Issue tracker push', info: 'Send findings to Jira, Linear or Asana.' },
      ],
    },
    {
      id: 'agency',
      name: 'Agency',
      price: 249,
      unitTop: 'seat /',
      unitBottom: 'month',
      specialOffer: 400,
      ctaLabel: 'Try for free',
      inheritsFrom: 'Pro',
      addon: { title: 'Premium AI', detail: '8 tools · 10,000 prompts / month', tone: 'bg-tint-violet' },
      featureHeading: 'Includes Pro, plus:',
      features: [
        { label: '10 domains · 25,000 keywords', info: 'Grouped into client workspaces.' },
        { label: 'White-label dashboards', info: 'Your logo, your domain, your colours.' },
        { label: 'Per-client permissions', info: 'Clients see only their own workspace.' },
        { label: 'API access', info: 'Read endpoints for every metric in the product.' },
        { label: 'Priority support', info: 'Four-hour first response during business hours.' },
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: null,
      unitTop: 'custom',
      unitBottom: 'price',
      blurb: 'Fully matched to your security and volume requirements',
      ctaLabel: 'Get a quote',
      inheritsFrom: 'Agency',
      addon: { title: 'Enterprise AI', detail: 'Custom prompt volumes and model routing', tone: 'bg-tint-sky' },
      featureHeading: 'Includes Agency, plus:',
      features: [
        { label: 'Unlimited domains and keywords', info: 'Quotas set to your actual footprint.' },
        { label: 'SSO and SCIM provisioning', info: 'Okta, Entra ID and Google Workspace.' },
        { label: 'Security review and custom DPA', info: 'Our team completes your vendor assessment.' },
        { label: 'Dedicated success manager', info: 'Named contact with a quarterly business review.' },
        { label: 'Uptime SLA', info: 'Contractual availability with service credits.' },
      ],
    },
  ],
  comparison: [
    {
      group: 'Coverage',
      rows: [
        { label: 'Domains', values: ['1', '1', '3', '10', 'Unlimited'] },
        { label: 'Tracked keywords', values: ['100', '1,000', '5,000', '25,000', 'Custom'] },
        { label: 'Crawl budget', values: ['500', '10,000', '50,000', '250,000', 'Custom'] },
        { label: 'Crawl frequency', values: ['Weekly', 'Daily', 'Daily', 'Daily', 'On demand'] },
      ],
    },
    {
      group: 'Intelligence',
      rows: [
        { label: 'AI answer visibility', info: 'Prompt-level citation tracking.', values: [false, false, true, true, true] },
        { label: 'Backlink monitoring', values: [false, false, true, true, true] },
        { label: 'Cannibalisation mapping', values: [false, false, true, true, true] },
        { label: 'Competitors tracked', values: ['1', '3', '5', '20', 'Custom'] },
      ],
    },
    {
      group: 'Team and workflow',
      rows: [
        { label: 'Seats included', values: ['2', 'Per seat', 'Per seat', 'Per seat', 'Custom'] },
        { label: 'Unlimited viewers', values: [false, true, true, true, true] },
        { label: 'White-label reporting', values: [false, false, false, true, true] },
        { label: 'Issue tracker push', values: [false, false, true, true, true] },
        { label: 'API access', values: [false, false, false, true, true] },
      ],
    },
    {
      group: 'Support and security',
      rows: [
        { label: 'Support', values: ['Community', 'Email', 'Email', 'Priority', 'Dedicated CSM'] },
        { label: 'SSO and SCIM', values: [false, false, false, false, true] },
        { label: 'Custom DPA', values: [false, false, false, false, true] },
        { label: 'Uptime SLA', values: [false, false, false, false, true] },
      ],
    },
  ],
};

export const SERVICE_PLANS: PlanSet = {
  id: 'services',
  label: 'Growth services',
  note: 'Retainers billed per month in AED. Ad spend is paid directly to the platforms and is not included.',
  selector: {
    kind: 'commitment',
    label: 'Choose commitment:',
    options: [
      { value: 3, label: '3 months' },
      { value: 6, label: '6 months' },
      { value: 12, label: '12 months' },
    ],
  },
  plans: [
    {
      id: 'audit',
      name: 'Audit',
      price: 2400,
      unitTop: 'one-off',
      unitBottom: 'project',
      oneOff: true,
      seatNote: 'Delivered in 10 working days',
      ctaLabel: 'Book an audit',
      addon: { title: 'XEO Free', detail: '1 domain · 100 keywords', tone: 'bg-surface-alt', locked: true },
      featureHeading: 'Audit includes:',
      features: [
        { label: 'Full technical crawl', info: 'Indexation, speed, schema and internal linking.' },
        { label: 'Content and keyword gap', info: 'Where competitors rank and you do not.' },
        { label: 'Backlink profile review', info: 'Authority, toxicity and realistic targets.' },
        { label: 'Ranked 90-day roadmap', info: 'Prioritised by traffic and revenue at risk.' },
        { label: 'Walkthrough call', info: 'Ninety minutes with the strategist who wrote it.' },
      ],
    },
    {
      id: 'foundation',
      name: 'Foundation',
      price: 5699,
      unitTop: 'per',
      unitBottom: 'month',
      seatNote: 'Min. ad spend AED 11,000 / month',
      ctaLabel: 'Start with Foundation',
      addon: { title: 'XEO Starter', detail: '1 domain · 1,000 keywords', tone: 'bg-tint-sand' },
      featureHeading: 'Foundation includes:',
      features: [
        { label: 'Paid ads, content, social and email', info: 'One roadmap across all four channels.' },
        { label: 'Landing page build and CRM setup', info: 'Built on your stack, handed over documented.' },
        { label: 'Bi-weekly optimisation cycle', info: 'Every two weeks against the agreed metric.' },
        { label: '48-hour response time', info: 'Business days, tracked in the shared workspace.' },
        { label: 'Monthly performance review', info: 'Live call with the account strategist.' },
      ],
    },
    {
      id: 'growth',
      name: 'Growth',
      price: 11699,
      unitTop: 'per',
      unitBottom: 'month',
      seatNote: 'Min. ad spend AED 25,000 / month',
      popular: true,
      specialOffer: 1200,
      ctaLabel: 'Start with Growth',
      inheritsFrom: 'Foundation',
      addon: { title: 'XEO Pro', detail: '3 domains · AI visibility', tone: 'bg-tint-amber' },
      featureHeading: 'Includes Foundation, plus:',
      features: [
        { label: 'Technical SEO and full website build', info: 'Next.js build with search designed in.' },
        { label: 'Weekly optimisation cycle', info: 'Faster iteration on creative and targeting.' },
        { label: '24-hour response time', info: 'Business days, with escalation path.' },
        { label: 'Full CRM automation', info: 'Routing, scoring and lifecycle triggers.' },
        { label: 'Dedicated strategist', info: 'One named owner, not a rotating pool.' },
      ],
    },
    {
      id: 'dominance',
      name: 'Dominance',
      price: 21699,
      unitTop: 'per',
      unitBottom: 'month',
      seatNote: 'Min. ad spend AED 45,000 / month',
      specialOffer: 2400,
      ctaLabel: 'Start with Dominance',
      inheritsFrom: 'Growth',
      addon: { title: 'XEO Agency', detail: '10 domains · white-label', tone: 'bg-tint-violet' },
      featureHeading: 'Includes Growth, plus:',
      features: [
        { label: 'Full SEO, funnel and testing programme', info: 'Digital PR and a running A/B backlog.' },
        { label: 'Daily optimisation cycle', info: 'Budget and creative reviewed every weekday.' },
        { label: 'Same-day priority support', info: 'Direct channel to the delivery pod.' },
        { label: 'Creative studio access', info: 'Design and video capacity inside the retainer.' },
        { label: 'Quarterly leadership session', info: 'Strategy review with your exec team.' },
      ],
    },
    {
      id: 'enterprise-services',
      name: 'Enterprise',
      price: null,
      unitTop: 'custom',
      unitBottom: 'price',
      blurb: 'Multi-market programmes with procurement in the room',
      ctaLabel: 'Get a quote',
      inheritsFrom: 'Dominance',
      addon: { title: 'XEO Enterprise', detail: 'Unlimited domains · SSO', tone: 'bg-tint-sky' },
      featureHeading: 'Includes Dominance, plus:',
      features: [
        { label: 'Multi-market rollout', info: 'Per-market roadmaps and local language teams.' },
        { label: 'Named delivery pod with an SLA', info: 'Contractual response and delivery times.' },
        { label: 'Security review and custom DPA', info: 'We complete your vendor assessment.' },
        { label: 'Warehouse and BI integration', info: 'Data piped into your own reporting stack.' },
        { label: 'Executive reporting cadence', info: 'Board-ready reporting on your schedule.' },
      ],
    },
  ],
  comparison: [
    {
      group: 'Strategy and delivery',
      rows: [
        { label: 'Dedicated strategist', values: [false, false, true, true, true] },
        { label: 'Optimisation cycle', values: ['One-off', 'Bi-weekly', 'Weekly', 'Daily', 'Daily'] },
        { label: 'Response time', values: ['n/a', '48 hours', '24 hours', 'Same day', 'SLA-backed'] },
        { label: 'Strategy sessions', values: ['One call', 'Monthly', 'Monthly', 'Quarterly + monthly', 'Custom'] },
      ],
    },
    {
      group: 'Search',
      rows: [
        { label: 'Technical SEO', values: ['Audit only', false, true, true, true] },
        { label: 'Content programme', values: [false, 'Light', 'Standard', 'Full', 'Full'] },
        { label: 'Digital PR and links', values: [false, false, false, true, true] },
        { label: 'AI answer visibility', info: 'Tuning entities and schema for assistant citations.', values: [false, false, true, true, true] },
      ],
    },
    {
      group: 'Web and conversion',
      rows: [
        { label: 'Landing pages', values: [false, '1 page', 'Up to 5', 'Unlimited', 'Unlimited'] },
        { label: 'Full website build', values: [false, false, true, true, true] },
        { label: 'A/B testing programme', values: [false, false, false, true, true] },
        { label: 'CRO review', values: [false, false, 'Quarterly', 'Monthly', 'Monthly'] },
      ],
    },
    {
      group: 'Data and reporting',
      rows: [
        { label: 'Live XEO workspace', values: [true, true, true, true, true] },
        { label: 'CRM automation', values: [false, 'Setup only', 'Full', 'Full', 'Full'] },
        { label: 'Attribution model', values: [false, 'Last click', 'Multi-touch', 'Multi-touch', 'Custom'] },
        { label: 'Warehouse export', values: [false, false, false, true, true] },
      ],
    },
  ],
};

export const PLAN_SETS: PlanSet[] = [PLATFORM_PLANS, SERVICE_PLANS];

export const RELATED_PRICING = [
  {
    name: 'Web development pricing',
    tone: 'bg-tint-sky',
    body: 'Fixed-scope builds quoted per sprint. A marketing site typically runs four to six sprints; commerce and portals run longer. Every quote covers the design system, CMS models, migration plan and handover.',
    href: '/services/web-development',
  },
  {
    name: 'Xpace pricing',
    tone: 'bg-tint-mint',
    body: 'Not published yet. Design partners in the current cohort keep founding pricing at general release. Expect per-seat pricing with delivery and finance modules included.',
    href: '/products/xpace',
  },
  {
    name: 'Xocials pricing',
    tone: 'bg-tint-sand',
    body: 'Not published yet. Expect channel-based tiers with unlimited drafts and approvals on every plan. Existing Xerebo clients reach early access first.',
    href: '/products/xocials',
  },
];

export const CLIENT_RESULTS = [
  { metric: '3.4x', label: 'organic pipeline in 12 months', client: 'Aurora Realty' },
  { metric: '-62%', label: 'cost per qualified lead', client: 'Medcore Clinics' },
  { metric: '218%', label: 'lift in AI answer citations', client: 'Solvent Labs' },
];

export const PRICING_FAQS = [
  {
    q: 'Is there a minimum commitment?',
    a: 'Service retainers run on a three-month minimum, because that is the honest floor for work that compounds. After that it is month to month with 30 days notice. XEO platform plans are monthly with no lock-in.',
  },
  {
    q: 'Is ad spend included in the retainer?',
    a: 'No. You pay the platforms directly so you own the accounts and the data. Each service plan lists the minimum monthly spend its strategy assumes.',
  },
  {
    q: 'How does per-seat pricing work on XEO?',
    a: 'You pay for editor seats only. Viewers are unlimited from Starter upward, so stakeholders can read dashboards without consuming a seat. Change seat count at any time; billing prorates from that day.',
  },
  {
    q: 'Can we move between plans later?',
    a: 'Yes, in both directions. Upgrades prorate immediately. Downgrades take effect at the start of the next billing cycle so you keep what you paid for.',
  },
  {
    q: 'Do services clients pay for XEO separately?',
    a: 'No. Every retainer includes an XEO workspace sized to the plan, shown on each card.',
  },
  {
    q: 'Which currencies do you bill in?',
    a: 'AED by default, with USD, EUR and INR available on annual agreements. Prices exclude VAT, which is applied according to your billing country.',
  },
];
