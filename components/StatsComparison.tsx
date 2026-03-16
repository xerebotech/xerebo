'use client';
import { useEffect, useRef, useState } from 'react';

interface Stat {
  label: string;
  before: number;
  after: number;
  suffix: string;
}

const STATS: Stat[] = [
  { label: 'Lead Generation', before: 45, after: 320, suffix: '%' },
  { label: 'Conversion Rate', before: 2.1, after: 8.7, suffix: '%' },
  { label: 'Sales Cycle', before: 45, after: 12, suffix: 'days' },
  { label: 'Team Efficiency', before: 58, after: 94, suffix: '%' },
];

function AnimatedStat({ stat, isVisible }: { stat: Stat; isVisible: boolean }) {
  const [displayAfter, setDisplayAfter] = useState(stat.before);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const value = stat.before + (stat.after - stat.before) * easeOut;
      
      if (stat.suffix === 'days') {
        setDisplayAfter(Math.round(value));
      } else {
        setDisplayAfter(Number(value.toFixed(1)));
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [stat, isVisible]);

  const improvement = ((stat.after - stat.before) / stat.before * 100).toFixed(0);

  return (
    <div className="stat-column">
      <div className="stat-label">{stat.label}</div>
      
      <div className="stat-comparison">
        <div className="stat-before">
          <span className="stat-value">{stat.before}</span>
          <span className="stat-unit">{stat.suffix}</span>
          <span className="stat-tag before-tag">Before</span>
        </div>

        <div className="stat-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>

        <div className="stat-after">
          <span className="stat-value orange">{displayAfter}</span>
          <span className="stat-unit">{stat.suffix}</span>
          <span className="stat-tag after-tag">After</span>
        </div>
      </div>

      <div className="stat-improvement">
        <span className="improvement-badge">+{improvement}%</span>
      </div>
    </div>
  );
}

export default function StatsComparison() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-comparison-section reveal" ref={ref}>
      <div className="stats-container">
        <div className="stats-header">
          <h2 className="stats-title">Average Client Results</h2>
          <p className="stats-subtitle">See the measurable impact Xerebo has on businesses like yours</p>
        </div>

        <div className="stats-grid">
          {STATS.map((stat, idx) => (
            <AnimatedStat key={idx} stat={stat} isVisible={isVisible} />
          ))}
        </div>

        <div className="stats-footer">
          <p>Based on data from 500+ active customers over the past 12 months</p>
        </div>

        <style jsx>{`
          .stats-comparison-section {
            padding: 80px 20px;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            color: white;
          }

          .stats-container {
            max-width: 1200px;
            margin: 0 auto;
          }

          .stats-header {
            text-align: center;
            margin-bottom: 60px;
          }

          .stats-title {
            font-size: 42px;
            font-weight: 700;
            margin-bottom: 16px;
          }

          .stats-subtitle {
            font-size: 18px;
            color: #aaa;
            max-width: 500px;
            margin: 0 auto;
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 48px 32px;
            margin-bottom: 60px;
          }

          .stat-column {
            animation: slideUp 0.8s ease;
          }

          .stat-label {
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #ff8c42;
            margin-bottom: 24px;
          }

          .stat-comparison {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            margin-bottom: 20px;
          }

          .stat-before,
          .stat-after {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
          }

          .stat-value {
            font-size: 32px;
            font-weight: 700;
            color: #fff;
          }

          .stat-value.orange {
            color: #ff8c42;
          }

          .stat-unit {
            font-size: 14px;
            color: #aaa;
          }

          .stat-tag {
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 4px 12px;
            border-radius: 12px;
            margin-top: 8px;
          }

          .before-tag {
            background: rgba(255, 255, 255, 0.1);
            color: #ccc;
          }

          .after-tag {
            background: rgba(255, 140, 66, 0.2);
            color: #ff8c42;
          }

          .stat-arrow {
            color: #ff8c42;
            flex-shrink: 0;
            animation: slideRight 0.8s ease;
          }

          .stat-improvement {
            display: flex;
            justify-content: center;
          }

          .improvement-badge {
            background: rgba(76, 175, 80, 0.15);
            color: #4CAF50;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
          }

          .stats-footer {
            text-align: center;
            padding: 40px 0;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            color: #888;
            font-size: 14px;
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideRight {
            from {
              opacity: 0;
              transform: translateX(-10px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @media (max-width: 768px) {
            .stats-title {
              font-size: 32px;
            }

            .stats-grid {
              grid-template-columns: 1fr;
              gap: 40px;
            }

            .stat-comparison {
              flex-direction: column;
            }

            .stat-arrow {
              transform: rotate(90deg);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
