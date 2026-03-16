'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Plus, Minus, MessageCircle, Send, Sparkles, X } from 'lucide-react';

const faqs = [
  {
    question: "Is there a setup or onboarding fee?",
    answer: "No. Zero setup fees. Your tier fee covers everything from day one — brand audit, CRM, tracking, campaigns, and launch."
  },
  {
    question: "What happens after the first 90 days?",
    answer: "Your fee switches to 20% of your monthly ad budget — or your tier fee, whichever is higher. If you're on Foundation (AED 5,699) and 20% of your budget is AED 4,000, you'd still pay AED 5,699. If 20% becomes AED 8,000, your fee becomes AED 8,000."
  },
  {
    question: "What if the leads aren't good enough?",
    answer: "We define \"qualified lead\" together before onboarding — demographic fit, intent signals, channel attribution. At 90 days, CRM data is the judge. If we didn't deliver, you walk. No penalties."
  },
  {
    question: "Why can't I buy just SEO or ads separately?",
    answer: "Isolated channels underperform. Ads without landing pages waste clicks. Content without retargeting loses awareness. Our system is built so each channel feeds the next. SEO is tiered: basic at Growth, full at Dominance."
  },
  {
    question: "Is the ad budget included in the price?",
    answer: "No. Tier fee covers our team, strategy, content, management, and tools. Ad budget is paid directly to platforms (Google, Meta, LinkedIn) and is completely separate."
  }
];

function FAQButton({ faq, index }: {
  faq: typeof faqs[0],
  index: number
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative group"
    >
      {/* Glow effect on hover */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FE7700]/10 to-orange-600/10 blur-xl transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
        }`} />

      <motion.div
        whileHover={{ y: -2 }}
        className={`relative rounded-2xl overflow-hidden border transition-all duration-300 ${isExpanded
          ? 'bg-gradient-to-br from-[#F6F4F4] to-white border-orange/40 shadow-xl shadow-orange/10'
          : 'bg-white border-dark/10 hover:border-orange/30 shadow-md'
          }`}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-5 md:p-6 text-left group/button"
        >
          <span className={`font-bold text-base md:text-lg pr-6 transition-colors ${isExpanded ? 'text-orange' : 'text-dark group-hover/button:text-orange'
            }`}>
            {faq.question}
          </span>

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${isExpanded
              ? 'bg-gradient-to-br from-[#FE7700] to-orange-600 shadow-lg shadow-orange/30'
              : 'bg-dark/5 group-hover/button:bg-orange/10'
              }`}
          >
            {isExpanded ? (
              <Minus className="w-5 h-5 text-white" strokeWidth={2.5} />
            ) : (
              <Plus className="w-5 h-5 text-dark group-hover/button:text-orange" strokeWidth={2.5} />
            )}
          </motion.div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-5 md:px-6 pb-6">
                <div className="pt-4 border-t border-dark/10 space-y-4">
                  <p className="text-dark/80 leading-relaxed text-sm md:text-base">
                    {faq.answer}
                  </p>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom accent line */}
        {isExpanded && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
            className="h-1 bg-gradient-to-r from-[#FE7700] to-orange-600 origin-left"
          />
        )}
      </motion.div>
    </motion.div>
  );
}

export default function FAQ() {
  const [isClient, setIsClient] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: ''
  });
  const [lastAutoSaved, setLastAutoSaved] = useState('');

  // Track submission state via ref to prevent stale closure issues in auto-save
  const isSubmittingRef = useRef(false);
  const showFormRef = useRef(showForm);
  useEffect(() => {
    showFormRef.current = showForm;
  }, [showForm]);

  // Auto-save logic for FAQ
  useEffect(() => {
    // Don't auto-save if modal isn't open or data is empty
    if (!showForm) return;

    const hasData = formData.name || formData.email || formData.question;
    if (!hasData) return;

    // Check if data changed since last auto-save
    const currentDataString = JSON.stringify({ ...formData, relatedTo: selectedQuestion });
    if (currentDataString === lastAutoSaved) return;

    const timer = setTimeout(async () => {
      // Re-verify absolute latest state via refs
      if (!showFormRef.current || isSubmittingRef.current) return;

      try {
        await fetch('/api/submit-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            formType: 'FAQ Question (Partial)',
            name: formData.name,
            email: formData.email,
            question: formData.question,
            relatedTo: selectedQuestion,
          }),
        });
        setLastAutoSaved(currentDataString);
      } catch (err) {
        console.error('FAQ Auto-save error:', err);
      }
    }, 2000); // 2 second debounce

    return () => clearTimeout(timer);
  }, [formData, showForm, selectedQuestion, lastAutoSaved]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAskQuestion = (question: string) => {
    setSelectedQuestion(question);
    setFormData({ ...formData, question: '' });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    isSubmittingRef.current = true;
    try {
      await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'FAQ Question',
          name: formData.name,
          email: formData.email,
          question: formData.question,
          relatedTo: selectedQuestion,
        }),
      });
      isSubmittingRef.current = false;
    } catch {
      isSubmittingRef.current = false;
    }
    setShowForm(false);
    setFormData({ name: '', email: '', question: '' });
  };

  return (
    <section id="faq" className="px-6 py-20 md:py-32 bg-light relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange rounded-full blur-[150px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.02, 0.06, 0.02],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange rounded-full blur-[140px] pointer-events-none"
      />

      {/* Floating particles */}
      {isClient && [...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
          className="absolute w-1 h-1 bg-orange/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-sm font-heading"
          >
            <span className="w-2 h-2 rounded-full bg-orange animate-pulse shadow-[0_0_10px_rgba(254,119,0,0.5)]" />
            FAQ
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-dark mb-8 tracking-tighter font-heading leading-[1.1] md:leading-[0.9] text-balance">
            Common <span className="bg-gradient-to-r from-orange to-dark-deepest bg-clip-text text-transparent">Questions</span>
          </h2>

          <p className="text-dark/70 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Everything you need to know about how we work, our pricing, and what to expect.
          </p>
        </motion.div>

        {/* FAQ Grid - 2 Columns */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {faqs.map((faq, index) => (
            <FAQButton
              key={index}
              faq={faq}
              index={index}
            />
          ))}
        </div>

        {/* General Question Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedQuestion('General Question');
              setShowForm(true);
            }}
            className="px-8 py-4 bg-gradient-to-r from-[#FE7700] to-orange-600 text-white font-bold rounded-full shadow-xl shadow-orange/30 relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Have a Different Question?
              <Send className="w-5 h-5" />
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Question Form Modal */}
      <AnimatePresence>
        {showForm && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-50"
              onClick={() => setShowForm(false)}
            />

            {/* Form Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              onClick={() => setShowForm(false)}
            >
              <div
                className="relative w-full max-w-2xl bg-gradient-to-br from-white to-light rounded-3xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />

                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowForm(false)}
                  className="absolute top-6 right-6 w-10 h-10 bg-dark/5 hover:bg-orange/10 rounded-full flex items-center justify-center transition-colors z-10"
                >
                  <X className="w-5 h-5 text-dark hover:text-orange" strokeWidth={2.5} />
                </motion.button>

                <div className="relative p-8 md:p-12">
                  {/* Header */}
                  <div className="mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.1 }}
                      className="w-16 h-16 bg-gradient-to-br from-[#FE7700] to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange/30"
                    >
                      <MessageCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </motion.div>

                    <h3 className="text-3xl md:text-4xl font-bold text-dark mb-3">
                      Ask Us Anything
                    </h3>
                    <p className="text-dark/60 text-lg">
                      {selectedQuestion !== 'General Question' && (
                        <>Related to: <span className="text-orange font-semibold">{selectedQuestion}</span></>
                      )}
                      {selectedQuestion === 'General Question' && (
                        <>We&apos;re here to help 24/7</>
                      )}
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-dark mb-2">
                        Your Name
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-5 py-4 bg-white border border-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE7700]/30 focus:border-orange transition-all text-dark placeholder:text-dark/40 shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-dark mb-2">
                        Email Address
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full px-5 py-4 bg-white border border-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE7700]/30 focus:border-orange transition-all text-dark placeholder:text-dark/40 shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-dark mb-2">
                        Your Question
                      </label>
                      <motion.textarea
                        whileFocus={{ scale: 1.01 }}
                        required
                        value={formData.question}
                        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                        placeholder="Type your question here..."
                        rows={5}
                        className="w-full px-5 py-4 bg-white border border-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE7700]/30 focus:border-orange transition-all resize-none text-dark placeholder:text-dark/40 shadow-sm"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-[#FE7700] to-orange-600 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-orange/30 hover:shadow-xl hover:shadow-orange/40 relative overflow-hidden group"
                    >
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />
                      <span className="relative z-10 flex items-center gap-3">
                        Send Message
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Send className="w-5 h-5" />
                        </motion.div>
                      </span>
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}