'use client';
import { useState } from 'react';

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }, 1200);
  };

  return (
    <section className="cta-section reveal">
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Transform Your Lead Generation?</h2>
          <p className="cta-subtitle">
            Join hundreds of B2B companies that are already seeing 3-5x ROI improvements
          </p>

          <form className="cta-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="your@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitted || isLoading}
                className="cta-input"
              />
              <button
                type="submit"
                disabled={isSubmitted || isLoading || !email}
                className="cta-button"
              >
                {isLoading && <span className="loading-spinner" />}
                {isSubmitted ? '✓ Welcome aboard!' : isLoading ? 'Starting...' : 'Start Free Trial'}
              </button>
            </div>
            
            {isSubmitted && (
              <div className="success-message fade-in">
                Check your email for next steps
              </div>
            )}
          </form>

          <p className="cta-disclaimer">
            ✓ 14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>

        <div className="cta-features">
          <div className="feature-item">
            <div className="feature-icon">🚀</div>
            <div className="feature-text">
              <strong>Get Started in Minutes</strong>
              <span>Setup takes less than 5 minutes</span>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📈</div>
            <div className="feature-text">
              <strong>See Results Fast</strong>
              <span>Most clients see improvements in week 1</span>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🤝</div>
            <div className="feature-text">
              <strong>Dedicated Support</strong>
              <span>Personal onboarding specialist included</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cta-section {
          padding: 80px 20px;
          background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
          color: white;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          border-radius: 50%;
        }

        .cta-section::after {
          content: '';
          position: absolute;
          bottom: -30%;
          left: -5%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
          border-radius: 50%;
        }

        .cta-container {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .cta-content {
          text-align: center;
          margin-bottom: 60px;
        }

        .cta-title {
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 16px;
          line-height: 1.2;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .cta-subtitle {
          font-size: 18px;
          margin-bottom: 40px;
          opacity: 0.95;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-form {
          margin-bottom: 24px;
        }

        .form-group {
          display: flex;
          gap: 12px;
          max-width: 500px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.95);
          padding: 6px;
          border-radius: 50px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .cta-input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          padding: 14px 24px;
          font-size: 16px;
          color: #1a1a1a;
        }

        .cta-input::placeholder {
          color: #999;
        }

        .cta-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .cta-button {
          background: #1a1a1a;
          color: white;
          border: none;
          padding: 14px 32px;
          border-radius: 50px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }

        .cta-button:hover:not(:disabled) {
          background: #333;
          transform: translateY(-2px);
        }

        .cta-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loading-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        .success-message {
          color: white;
          text-align: center;
          font-size: 14px;
          margin-top: 16px;
          opacity: 0.9;
        }

        .cta-disclaimer {
          font-size: 14px;
          opacity: 0.9;
          margin: 0;
        }

        .cta-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 32px;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          text-align: left;
          background: rgba(255, 255, 255, 0.08);
          padding: 24px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
        }

        .feature-icon {
          font-size: 32px;
          flex-shrink: 0;
        }

        .feature-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .feature-text strong {
          font-size: 16px;
          font-weight: 600;
        }

        .feature-text span {
          font-size: 14px;
          opacity: 0.9;
        }

        .fade-in {
          animation: fadeIn 0.6s ease;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .cta-title {
            font-size: 36px;
          }

          .form-group {
            flex-direction: column;
            border-radius: 12px;
          }

          .cta-button {
            width: 100%;
            justify-content: center;
          }

          .cta-features {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
