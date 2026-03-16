'use client';

import React, { useState } from 'react';
import { CheckCircle2, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import PhoneInput from './PhoneInput';
import { useContactModal } from '@/context/ContactModalContext';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    budget: string;
}

export default function ContactFormFields({ className, hideExtras = false }: { className?: string, hideExtras?: boolean }) {
    const { meta } = useContactModal();
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        budget: '',
    });
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [lastAutoSaved, setLastAutoSaved] = useState('');

    // Use ref to track status for bulletproof closure checks in setTimeout
    const statusRef = React.useRef(status);
    React.useEffect(() => {
        statusRef.current = status;
    }, [status]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Auto-save logic
    React.useEffect(() => {
        if (status === 'success' || status === 'loading') return;

        const hasData = formData.firstName || formData.email || phone;
        if (!hasData) return;

        const currentDataString = JSON.stringify({ ...formData, phone });
        if (currentDataString === lastAutoSaved) return;

        const timer = setTimeout(async () => {
            // Re-check absolute latest status via ref to bypass closure staleness
            if (statusRef.current === 'success' || statusRef.current === 'loading') return;

            try {
                await fetch('/api/submit-form', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        formType: 'CTA Form (Partial)',
                        selectedPackage: meta,
                        ...formData,
                        phone
                    }),
                });
                setLastAutoSaved(currentDataString);
            } catch (err) {
                console.error('Auto-save error:', err);
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [formData, phone, status, lastAutoSaved]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        try {
            const res = await fetch('/api/submit-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    formType: 'CTA Form',
                    selectedPackage: meta,
                    ...formData,
                    phone
                }),
            });

            if (!res.ok) throw new Error('Submission failed');

            localStorage.setItem('xerebo_converted', 'true');
            setStatus('success');
        } catch (err) {
            console.error(err);
            setErrorMsg('Something went wrong. Please try again.');
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">You&apos;re Booked In!</h3>
                <p className="text-gray-400 max-w-xs font-medium">
                    We&apos;ve received your details and will reach out within 24 hours.
                </p>
            </div>
        );
    }

    return (
        <div className={`space-y-6 ${className}`}>
            {!hideExtras && (
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-1">Book a Strategy Call</h3>
                    <p className="text-white/40 text-sm font-bold uppercase tracking-widest">30 minutes. Free. We'll call you within 24 hours.</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 px-1">First Name *</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="John"
                            required
                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange/30 transition-all font-bold"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 px-1">Last Name *</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Smith"
                            required
                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange/30 transition-all font-bold"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 px-1">Email *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        required
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange/30 transition-all font-bold"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 px-1">Phone / WhatsApp *</label>
                    <PhoneInput
                        value={phone}
                        onChange={setPhone}
                        placeholder="+971 50 000 0000"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 px-1">Monthly Ad Budget *</label>
                    <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange/30 transition-all appearance-none font-bold"
                    >
                        <option value="" className="bg-dark-deepest">Select range</option>
                        <option value="AED 11,000 – 25,000" className="bg-dark-deepest">AED 11,000 – 25,000</option>
                        <option value="AED 25,000 – 45,000" className="bg-dark-deepest">AED 25,000 – 45,000</option>
                        <option value="AED 45,000+" className="bg-dark-deepest">AED 45,000+</option>
                        <option value="Not sure yet — help me figure it out" className="bg-dark-deepest">Not sure yet — help me figure it out</option>
                    </select>
                </div>

                {status === 'error' && (
                    <div className="flex items-start gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{errorMsg}</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full px-8 py-5 bg-orange text-white font-black uppercase tracking-widest rounded-xl transition-all hover:bg-[#e56b00] hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed text-lg shadow-[0_15px_30px_rgba(254,119,0,0.3)]"
                >
                    {status === 'loading' ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            Book My Strategy Call
                            <ArrowRight size={20} />
                        </>
                    )}
                </button>

                <p className="text-white/30 text-[10px] font-black uppercase tracking-widest text-center">
                    No obligation · No follow-up spam · 24-hour response
                </p>
            </form>

            {/* Proof Section */}
            {!hideExtras && (
                <div className="pt-8 border-t border-white/5">
                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 flex gap-4 items-center">
                        <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-orange/20 text-orange flex items-center justify-center font-black text-sm border border-orange/20">
                            KA
                        </div>
                        <div>
                            <p className="text-sm text-white/70 italic font-medium leading-relaxed mb-1">
                                &quot;I cancelled all three agencies after 90 days with Xerebo. 127 qualified leads.&quot;
                            </p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/30">
                                Khalid Al-Rashid, CEO · Gulf Properties
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
