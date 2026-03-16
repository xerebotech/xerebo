'use client';
import { useState } from 'react';

export default function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
      <button className="faq-question" aria-expanded={open}>
        {question}
        <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      <div className="faq-answer" role="region">
        <div className="faq-answer-inner">{answer}</div>
      </div>
    </div>
  );
}
