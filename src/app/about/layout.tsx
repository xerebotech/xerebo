import { ReactNode } from 'react';

export const metadata = {
    title: 'About Xerebo | Dubai Agency Built on Accountability & Results',
    description: 'Tired of agencies with no accountability? Xerebo, a  Dubai growth partner with a 90-day guarantee, delivering qualified leads through proven systems.',
    alternates: {
        canonical: 'https://www.xerebo.com/about',
    },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
