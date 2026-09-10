export type NavItem = {
  name: string;
  href: string;
  blurb?: string;
  badge?: string;
  external?: boolean;
};

export type NavColumn = {
  heading: string;
  items: NavItem[];
};

export type NavMenu = {
  label: string;
  columns: NavColumn[];
  featured?: NavItem[];
};

export const PRODUCTS: NavColumn[] = [
  {
    heading: 'Platform',
    items: [
      {
        name: 'XEO',
        href: 'https://xeo.xerebo.com',
        blurb: 'AI search intelligence and SEO execution platform',
        external: true,
      },
      {
        name: 'Xconnect',
        href: 'https://xconnect.xerebo.com',
        blurb: 'Unified customer messaging and connection hub',
        external: true,
      },
      {
        name: 'Xpace',
        href: '/products/xpace',
        blurb: 'ERP built for operations teams',
        badge: 'Coming soon',
      },
      {
        name: 'Xocials',
        href: '/products/xocials',
        blurb: 'Social publishing, listening and reporting',
        badge: 'Coming soon',
      },
    ],
  },
  {
    heading: 'Inside the products',
    items: [
      { name: 'Rank tracking and SERP data', href: '/products/xeo#tracking' },
      { name: 'Technical site audits', href: '/products/xeo#audits' },
      { name: 'AI visibility monitoring', href: '/products/xeo#visibility' },
      { name: 'Product roadmap', href: '/products/xpace#roadmap' },
    ],
  },
];

export const SERVICES: NavColumn[] = [
  {
    heading: 'Services',
    items: [
      {
        name: 'Search engine optimisation',
        href: '/services/seo',
        blurb: 'Technical, content and authority programmes',
      },
      {
        name: 'Web development',
        href: '/services/web-development',
        blurb: 'Next.js sites, storefronts and web apps',
      },
    ],
  },
  {
    heading: 'Engagements',
    items: [
      { name: 'Growth retainers', href: '/packages' },
      { name: 'Technical SEO sprint', href: '/services/seo#sprint' },
      { name: 'Site rebuild and migration', href: '/services/web-development#migration' },
      { name: 'CRO and analytics', href: '/services/web-development#analytics' },
    ],
  },
  {
    heading: 'Industries',
    items: [
      { name: 'Real estate', href: '/results' },
      { name: 'Healthcare', href: '/results' },
      { name: 'B2B and SaaS', href: '/results' },
      { name: 'Retail and ecommerce', href: '/results' },
    ],
  },
];

export const RESOURCES: NavColumn[] = [
  {
    heading: 'Learn',
    items: [
      { name: 'Case studies', href: '/results' },
      { name: 'About Xerebo', href: '/about' },
      { name: 'How we work', href: '/about#process' },
    ],
  },
  {
    heading: 'Support',
    items: [
      { name: 'Contact the team', href: '/contact' },
      { name: 'Packages and pricing', href: '/packages' },
      { name: 'Privacy policy', href: '/privacy-policy' },
      { name: 'Terms of service', href: '/terms-service' },
    ],
  },
];

export const MENUS: NavMenu[] = [
  {
    label: 'Products',
    columns: PRODUCTS,
    featured: [
      { name: 'Launch XEO', href: 'https://xeo.xerebo.com', blurb: 'Open the platform', external: true },
      { name: 'Book a product walkthrough', href: '/contact', blurb: 'See it on your own data' },
    ],
  },
  {
    label: 'Services',
    columns: SERVICES,
    featured: [
      { name: 'See client results', href: '/results', blurb: 'Programmes and outcomes' },
      { name: 'Request a proposal', href: '/contact', blurb: 'Scoped in two working days' },
    ],
  },
  {
    label: 'Resources',
    columns: RESOURCES,
  },
];
