'use client';
import { useEffect, useRef } from 'react';

export default function RevealWrapper({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay === 1 ? ' reveal-delay-1' : delay === 2 ? ' reveal-delay-2' : delay === 3 ? ' reveal-delay-3' : delay === 4 ? ' reveal-delay-4' : '';

  return (
    <div ref={ref} className={`reveal${delayClass}${className ? ' ' + className : ''}`}>
      {children}
    </div>
  );
}
