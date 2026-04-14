'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { captureUTMParams } from '@/lib/utm';

interface ContactModalContextType {
    isOpen: boolean;
    meta: string | null;
    openModal: (meta?: string) => void;
    closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function ContactModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [meta, setMeta] = useState<string | null>(null);

    useEffect(() => {
        captureUTMParams();
    }, []);

    const openModal = (metadata?: string) => {
        setMeta(metadata || null);
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
        setMeta(null);
    };

    return (
        <ContactModalContext.Provider value={{ isOpen, meta, openModal, closeModal }}>
            {children}
        </ContactModalContext.Provider>
    );
}

export function useContactModal() {
    const context = useContext(ContactModalContext);
    if (context === undefined) {
        throw new Error('useContactModal must be used within a ContactModalProvider');
    }
    return context;
}
