'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LucideIcon, ArrowRight, Rocket, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CreativeButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
    variant?: 'shimmer' | 'pulse' | 'magnetic' | 'particles' | 'gradient' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    icon?: LucideIcon;
    width?: 'auto' | 'full';
}

export default function CreativeButton({
    children,
    href,
    onClick,
    className,
    variant = 'shimmer',
    size = 'md',
    icon: Icon,
    width = 'auto',
}: CreativeButtonProps) {

    const baseStyles = cn(
        "relative inline-flex items-center justify-center font-bold overflow-hidden transition-all duration-300 font-heading z-10 group/cb",
        width === 'full' ? 'w-full' : ''
    );

    const sizeStyles = {
        sm: "px-5 py-2.5 text-xs rounded-full",
        md: "px-7 py-3.5 text-xs sm:text-sm rounded-full",
        lg: "px-9 py-4 text-sm sm:text-base rounded-full"
    };

    // Shared animated icon component
    const IconContent = (
        <motion.div
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center"
        >
            {Icon ? <Icon className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
        </motion.div>
    );

    // Rendering logic based on variant
    const renderContent = () => {
        switch (variant) {
            case 'shimmer':
                return (
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(baseStyles, sizeStyles[size], "bg-gradient-to-r from-[#FE7700] to-orange-600 text-white shadow-xl shadow-[#FE7700]/30", className)}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{ x: ['-200%', '200%'] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        />
                        <span className="relative z-10 flex items-center gap-2">
                            {children}
                            {IconContent}
                        </span>
                    </motion.div>
                );

            case 'pulse':
                return (
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(baseStyles, sizeStyles[size], "bg-gradient-to-br from-[#FE7700] to-orange-600 text-white shadow-lg", className)}
                    >
                        {[0, 1].map((i) => (
                            <motion.span
                                key={i}
                                className="absolute inset-0 rounded-full border-2 border-[#FE7700]"
                                animate={{
                                    scale: [1, 1.5, 1.5],
                                    opacity: [0.8, 0, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.6,
                                }}
                            />
                        ))}
                        <span className="relative z-10 flex items-center gap-2">
                            {children}
                            {IconContent}
                        </span>
                    </motion.div>
                );

            case 'magnetic':
                return (
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={cn(baseStyles, sizeStyles[size], "bg-[#323939] text-white overflow-hidden", className)}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-[#FE7700] to-orange-600"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10 flex items-center gap-2">
                            {children}
                            {IconContent}
                        </span>
                    </motion.div>
                );

            case 'particles':
                return (
                    <motion.div
                        whileHover="hover"
                        whileTap={{ scale: 0.95 }}
                        className={cn(baseStyles, sizeStyles[size], "bg-gradient-to-br from-[#FE7700] to-orange-600 text-white", className)}
                    >
                        <motion.div
                            className="absolute inset-0 bg-white/20"
                            initial={{ scale: 0, opacity: 0 }}
                            variants={{ hover: { scale: 1.5, opacity: 0 } }}
                            transition={{ duration: 0.5 }}
                        />
                        <span className="relative z-10 flex items-center gap-2">
                            {children}
                            {IconContent}
                        </span>
                    </motion.div>
                )

            case 'outline':
                return (
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={cn(baseStyles, sizeStyles[size], "bg-transparent border-2 border-[orange] overflow-hidden", className)}
                    >
                        <motion.div
                            className="absolute inset-0 bg-[#FE7700]"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.4 }}
                            style={{ transformOrigin: 'left' }}
                        />
                        <span className="relative z-10 flex items-center gap-2 text-orange group-hover/cb:!text-white transition-colors duration-300">
                            {children}
                            {IconContent}
                        </span>
                    </motion.div>
                );

            default: // gradient
                return (
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(baseStyles, sizeStyles[size], "bg-gradient-to-r from-[#FE7700] to-orange-600 text-white shadow-lg shadow-[#FE7700]/20", className)}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {children}
                            {IconContent}
                        </span>
                    </motion.div>
                );
        }
    };

    const wrapperClasses = cn(
        "inline-block",
        width === 'full' ? 'w-full' : '',
        className?.includes('w-full') ? 'w-full' : '',
        className?.includes('sm:w-auto') ? 'sm:w-auto' : ''
    );

    if (href) {
        return (
            <Link href={href} className={wrapperClasses} onClick={onClick}>
                {renderContent()}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={wrapperClasses}>
            {renderContent()}
        </button>
    );
}