'use client';
import { useState } from 'react';

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  details: string[];
}

const FEATURES: Feature[] = [
  {
    id: 1,
    title: 'AI-Powered Lead Scoring',
    description: 'Automatically identify your best prospects with machine learning',
    icon: '🎯',
    color: '#ff8c42',
    details: ['Real-time scoring', 'Behavior tracking', 'Predictive analytics'],
  },
  {
    id: 2,
    title: 'Multi-Channel Integration',
    description: 'Capture leads from email, social, website, and more',
    icon: '🔗',
    color: '#4CAF50',
    details: ['Email sync', 'Social integration', 'Form builders'],
  },
  {
    id: 3,
    title: 'Smart Automation',
    description: 'Set up workflows that work while you sleep',
    icon: '⚡',
    color: '#2196F3',
    details: ['Auto follow-ups', 'Task automation', 'Workflow builder'],
  },
  {
    id: 4,
    title: 'Advanced Analytics',
    description: 'Get insights that drive real business decisions',
    icon: '📊',
    color: '#9C27B0',
    details: ['Custom dashboards', 'ROI tracking', 'Performance metrics'],
  },
  {
    id: 5,
    title: 'Team Collaboration',
    description: 'Keep your entire team aligned on leads',
    icon: '👥',
    color: '#FF6B6B',
    details: ['Shared pipelines', 'Real-time updates', 'Team messaging'],
  },
  {
    id: 6,
    title: '24/7 AI Support',
    description: 'Get help whenever you need it',
    icon: '🤖',
    color: '#00BCD4',
    details: ['Instant responses', 'Expert tips', 'Video tutorials'],
  },
];

export default function FeaturesShowcase() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="features-section reveal">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">Powerful Features Built for Growth</h2>
          <p className="features-subtitle">Everything you need to attract, qualify, and convert more leads</p>
        </div>

        <div className="features-grid">
          {FEATURES.map((feature, idx) => (
            <div
              key={feature.id}
              className={`feature-card ${activeFeature === idx ? 'active' : ''}`}
              onClick={() => setActiveFeature(idx)}
              style={{
                '--feature-color': feature.color,
              } as React.CSSProperties}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              
              <div className="feature-details">
                {feature.details.map((detail, i) => (
                  <div key={i} className="detail-item">
                    <span className="detail-check">✓</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          .features-section {
            padding: 80px 20px;
            background: #ffffff;
          }

          .features-container {
            max-width: 1200px;
            margin: 0 auto;
          }

          .features-header {
            text-align: center;
            margin-bottom: 70px;
          }

          .features-title {
            font-size: 42px;
            font-weight: 700;
            color: #1a1a1a;
            margin-bottom: 16px;
          }

          .features-subtitle {
            font-size: 18px;
            color: #666;
            max-width: 500px;
            margin: 0 auto;
          }

          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 24px;
          }

          .feature-card {
            background: #f8f9fa;
            border: 2px solid #e5e5e5;
            border-radius: 12px;
            padding: 32px 24px;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
            overflow: hidden;
          }

          .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--feature-color);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.4s ease;
          }

          .feature-card:hover,
          .feature-card.active {
            border-color: var(--feature-color);
            background: white;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
            transform: translateY(-4px);
          }

          .feature-card:hover::before,
          .feature-card.active::before {
            transform: scaleX(1);
          }

          .feature-icon {
            font-size: 48px;
            margin-bottom: 16px;
            display: inline-block;
            animation: float 3s ease-in-out infinite;
          }

          .feature-title {
            font-size: 20px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 12px;
          }

          .feature-description {
            font-size: 14px;
            color: #666;
            margin-bottom: 24px;
            line-height: 1.5;
          }

          .feature-details {
            display: flex;
            flex-direction: column;
            gap: 12px;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease;
          }

          .feature-card.active .feature-details,
          .feature-card:hover .feature-details {
            max-height: 200px;
          }

          .detail-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            color: #666;
          }

          .detail-check {
            color: var(--feature-color);
            font-weight: bold;
            flex-shrink: 0;
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }

          @media (max-width: 768px) {
            .features-title {
              font-size: 32px;
            }

            .features-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
