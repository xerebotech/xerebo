import { ReactNode } from 'react';

export const metadata = {
    title: 'About | Xerebo Technologies',
    description: 'Learn more about Xerebo Technologies and our mission.',
};

export default function AboutLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
