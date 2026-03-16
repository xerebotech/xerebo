'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, Lock, CheckCircle2, Globe, Zap, ArrowRight } from 'lucide-react';
import PhoneInput from './PhoneInput';

export default function CompetitorAnalysis() {
    const [url, setUrl] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [scanStep, setScanStep] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [lastAutoSaved, setLastAutoSaved] = useState('');

    const isUnlockedRef = useEffectRef(isUnlocked);
    function useEffectRef<T>(value: T) {
        const ref = useRef(value);
        useEffect(() => { ref.current = value; }, [value]);
        return ref;
    }
    const isSubmittingRef = useRef(false);

    useEffect(() => {
        // Don't auto-save if form is already successfully submitted or not in results view
        if (isUnlocked || !showResults) return;

        // Don't auto-save if all main fields are empty
        const hasData = name || email || mobile;
        if (!hasData) return;

        // Don't auto-save if data hasn't changed since last auto-save
        const currentDataString = JSON.stringify({ name, email, mobile, competitorUrl: url });
        if (currentDataString === lastAutoSaved) return;

        const timer = setTimeout(async () => {
            // Re-verify absolute latest status via refs
            if (isUnlockedRef.current || isSubmittingRef.current) return;

            try {
                // Normalize URL — add https:// if user didn't type it
                const normalizedUrl = url.startsWith('http://') || url.startsWith('https://')
                    ? url
                    : `https://${url}`;

                await fetch('/api/submit-form', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        formType: 'Competitor Unlock (Partial)',
                        name,
                        email,
                        mobile,
                        competitorUrl: normalizedUrl
                    }),
                });
                setLastAutoSaved(currentDataString);
            } catch (err) {
                console.error('Auto-save error:', err);
            }
        }, 2000); // 2 second debounce

        return () => clearTimeout(timer);
    }, [name, email, mobile, url, isUnlocked, showResults, lastAutoSaved]);

    const steps = [
        "Resolving DNS...",
        "Analyzing Traffic Sources...",
        "Decrypting Ad Spend Data...",
        "Identifying Top Keywords...",
        "Calculating Market Share...",
        "Finalizing Report..."
    ];

    const handleScan = (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        // Normalize URL — add https:// if user didn't type it
        const normalizedUrl = url.startsWith('http://') || url.startsWith('https://')
            ? url
            : `https://${url}`;

        setIsScanning(true);
        setScanProgress(0);
        setShowResults(false);

        fetch('/api/submit-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ formType: 'Competitor Scan', competitorUrl: normalizedUrl }),
        }).catch(() => { });

        let stepIndex = 0;
        const interval = setInterval(() => {
            setScanProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsScanning(false);
                    setShowResults(true);
                    return 100;
                }
                return prev + 1;
            });
            if (stepIndex < steps.length && Math.random() > 0.7) {
                setScanStep(steps[stepIndex]);
                stepIndex++;
            }
        }, 50);
    };

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        isSubmittingRef.current = true;
        fetch('/api/submit-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ formType: 'Competitor Unlock', name, email, mobile, competitorUrl: url }),
        }).then(() => {
            isSubmittingRef.current = false;
        }).catch(() => {
            isSubmittingRef.current = false;
        });
        setIsUnlocked(true);
    };

    return (
        <section className="py-16 md:py-24 bg-dark-deepest relative overflow-hidden text-white font-sans">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(254,119,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(254,119,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-sm font-heading"
                        >
                            <span className="w-2 h-2 rounded-full bg-orange animate-pulse shadow-[0_0_10px_rgba(254,119,0,0.5)]" />
                            Market Intelligence
                        </motion.div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tighter font-heading leading-[1.1] md:leading-[0.9] text-balance">
                            Reveal Your Untapped <br />
                            <span className="bg-gradient-to-r from-white to-orange bg-clip-text text-transparent">
                                Growth Potential.
                            </span>
                        </h2>


                        <p className="text-gray-400 text-base md:text-lg mb-6 leading-relaxed">
                            Stop guessing. Our AI engine analyzes your current strategy against market leaders to uncover hidden revenue opportunities in seconds.
                        </p>

                        <ul className="space-y-3 mb-6">
                            {[
                                "Identify Wasted Ad Spend",
                                "Uncover High-Converting Keywords",
                                "Benchmark Against Industry Leaders",
                                "Get a Step-by-Step Roadmap to Scale"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-300 text-sm md:text-base">
                                    <CheckCircle2 className="w-5 h-5 text-orange flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Right: Terminal Tool */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="bg-[#1A1817] border border-gray-800 rounded-xl overflow-hidden shadow-2xl shadow-orange/10">

                            {/* Terminal Header Bar */}
                            <div className="bg-gray-900 px-4 py-3 border-b border-gray-800 flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                </div>
                                <div className="ml-4 text-xs text-gray-500 font-mono truncate">xerebo-intel-cli — -bash</div>
                            </div>

                            {/* Tool Content */}
                            <div className="p-4 md:p-8">

                                {/* Step 1: URL Input */}
                                {!showResults && !isScanning && (
                                    <form onSubmit={handleScan} className="space-y-5">
                                        <div className="text-center mb-6">
                                            <Globe className="w-10 h-10 md:w-12 md:h-12 text-orange mx-auto mb-3 opacity-80" />
                                            <h3 className="text-lg md:text-xl font-bold font-heading">Enter Website URL</h3>
                                            <p className="text-gray-500 text-sm mt-1">We&apos;ll scan for public marketing data.</p>
                                        </div>

                                        <div className="relative">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                            <input
                                                type="text"
                                                placeholder="yourwebsite.com"
                                                value={url}
                                                onChange={(e) => setUrl(e.target.value)}
                                                className="w-full bg-dark bg-opacity-50 border border-gray-700 rounded-lg py-3 md:py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-orange transition-colors font-mono"
                                                required
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-orange hover:bg-orange-600 text-white font-bold py-3 md:py-4 rounded-lg transition-all flex items-center justify-center gap-2 group"
                                        >
                                            <span>Initiate Scan</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </form>
                                )}

                                {/* Step 2: Scanning Animation */}
                                {isScanning && (
                                    <div className="text-center py-6 md:py-8">
                                        <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-6">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-0 border-4 border-gray-800 border-t-orange rounded-full"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-orange text-lg md:text-xl">
                                                {scanProgress}%
                                            </div>
                                        </div>
                                        <div className="font-mono text-green-500 text-xs md:text-sm h-6">
                                            {'>'} {scanStep}
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Blurred Results + Unlock Form */}
                                {showResults && !isUnlocked && (
                                    <div className="relative min-h-[420px] md:min-h-[380px]">
                                        {/* Blurred preview */}
                                        <div className="filter blur-md opacity-50 pointer-events-none select-none space-y-4">
                                            <div className="flex justify-between items-center bg-gray-800/50 p-3 md:p-4 rounded-lg border border-gray-700">
                                                <span className="text-gray-400 font-mono text-sm">EST_AD_SPEND</span>
                                                <span className="text-green-400 font-mono font-bold text-sm">AED 45,200</span>
                                            </div>
                                            <div className="flex justify-between items-center bg-gray-800/50 p-3 md:p-4 rounded-lg border border-gray-700">
                                                <span className="text-gray-400 font-mono text-sm">TOP_SOURCE</span>
                                                <span className="text-blue-400 font-mono font-bold text-sm">LinkedIn Ads</span>
                                            </div>
                                            <div className="h-28 md:h-36 bg-gray-800/50 rounded-lg border border-gray-700 flex items-end p-3 gap-2">
                                                {[40, 70, 45, 90, 60].map((h, i) => (
                                                    <div key={i} className="flex-1 bg-gray-600" style={{ height: `${h}%` }} />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Unlock overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center z-10 px-2">
                                            <div className="bg-[#1A1817] p-5 md:p-8 rounded-2xl border border-orange/30 shadow-2xl text-center w-full max-w-sm">
                                                <div className="w-10 h-10 md:w-12 md:h-12 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                                    <Lock className="w-5 h-5 md:w-6 md:h-6 text-orange" />
                                                </div>
                                                <h4 className="text-lg md:text-xl font-bold mb-2">Unlock Full Report</h4>
                                                <p className="text-gray-400 text-xs md:text-sm mb-4">
                                                    Enter your details to view decrypted data for{' '}
                                                    <span className="text-white font-semibold">
                                                        {url.replace('https://', '').replace('http://', '').split('/')[0]}
                                                    </span>.
                                                </p>

                                                <form onSubmit={handleUnlock} className="space-y-2.5 text-left">
                                                    <input
                                                        type="text"
                                                        placeholder="Your Name *"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="w-full bg-dark border border-gray-700 rounded-lg py-2.5 md:py-3 px-4 text-white text-sm focus:outline-none focus:border-orange"
                                                        required
                                                    />
                                                    <input
                                                        type="email"
                                                        placeholder="Work Email *"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="w-full bg-dark border border-gray-700 rounded-lg py-2.5 md:py-3 px-4 text-white text-sm focus:outline-none focus:border-orange"
                                                        required
                                                    />
                                                    <PhoneInput
                                                        value={mobile}
                                                        onChange={setMobile}
                                                        placeholder="Mobile Number *"
                                                        required
                                                        className="xerebo-phone-input-dark"
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="w-full bg-white text-dark font-bold py-2.5 md:py-3 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                                                    >
                                                        Unlock Data
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Success State */}
                                {isUnlocked && (
                                    <div className="text-center py-8 md:py-10">
                                        <div className="w-14 h-14 md:w-16 md:h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
                                            <CheckCircle2 className="w-7 h-7 md:w-8 md:h-8 text-green-500" />
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold mb-2">Audit Requested!</h3>
                                        <p className="text-gray-400 text-sm md:text-base max-w-xs md:max-w-md mx-auto">
                                            Our intelligence team is now verifying the data for{' '}
                                            <span className="text-white font-semibold">
                                                {url.replace('https://', '').replace('http://', '').split('/')[0]}
                                            </span>.
                                        </p>
                                        <div className="bg-dark/50 border border-gray-800 rounded-lg p-4 mt-5 text-left max-w-xs md:max-w-sm mx-auto">
                                            <div className="flex items-start gap-3">
                                                <div className="w-2 h-2 rounded-full bg-orange mt-2 animate-pulse flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs text-gray-500 font-mono mb-1">STATUS: PROCESSING</p>
                                                    <p className="text-xs md:text-sm text-gray-300">
                                                        You will receive the full <span className="text-white font-bold">PDF Competitor Report</span> at{' '}
                                                        <span className="text-orange">{email}</span> within 4 hours.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setIsUnlocked(false);
                                                setShowResults(false);
                                                setUrl('');
                                                setEmail('');
                                                setName('');
                                                setMobile('');
                                            }}
                                            className="mt-6 text-orange text-sm hover:underline"
                                        >
                                            Scan another competitor
                                        </button>
                                    </div>
                                )}

                            </div>
                        </div>

                        {/* Glow */}
                        <div className="absolute -inset-4 bg-orange/20 blur-3xl -z-10 rounded-full opacity-50" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
