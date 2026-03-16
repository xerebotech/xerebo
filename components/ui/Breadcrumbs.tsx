'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    const textClass = 'text-dark/60 hover:text-orange';
    const activeClass = 'text-orange font-black pointer-events-none';
    const separatorClass = 'text-dark/20';

    return (
        <div className="w-full bg-[#fefefe] pt-40 md:pt-48 pb-6 px-6 md:px-10 border-b border-dark/5 relative z-10">
            {/* Removed max-w-7xl to allow the nav to span the entire screen width */}
            <nav className="w-full text-[10px] md:text-sm font-bold font-heading tracking-widest uppercase">
                <ol className="flex items-center justify-center flex-wrap gap-2 md:gap-4">
                    <li>
                        <Link href="/" className={`flex items-center gap-1.5 transition-colors ${textClass}`}>
                            <Home size={14} className="mb-0.5" />
                            <span>Home</span>
                        </Link>
                    </li>
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 md:gap-4">
                            <ChevronRight size={14} className={separatorClass} />
                            {item.href ? (
                                <Link href={item.href} className={`transition-colors flex items-center gap-1.5 ${textClass}`}>
                                    {item.label}
                                </Link>
                            ) : (
                                <span className={`flex items-center gap-1.5 ${activeClass}`}>
                                    {item.label}
                                </span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
}