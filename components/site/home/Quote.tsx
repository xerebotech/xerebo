'use client';

import { motion } from 'framer-motion';

export default function Quote() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="shell">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="display-3 text-ink text-balance">
            &ldquo;We stopped buying reports and started buying outcomes. The audit, the rebuild and the reporting all
            came from the same team, so nothing got lost between them. Organic pipeline is now our{' '}
            <span className="text-orange">largest acquisition channel</span>.&rdquo;
          </p>
          <footer className="mt-8">
            <p className="font-heading text-[1.05rem] font-semibold text-ink">Rania Haddad</p>
            <p className="mt-1 text-[0.95rem] text-ink-muted">Head of Marketing, Aurora Realty</p>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
