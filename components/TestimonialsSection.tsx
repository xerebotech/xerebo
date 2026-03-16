'use client';
import { useEffect, useRef, useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'TechFlow Inc',
    content: 'Xerebo transformed our lead generation. We saw a 3x increase in qualified leads within the first month.',
    rating: 5,
    avatar: '👩‍💼',
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'CEO',
    company: 'Growth Labs',
    content: 'The ROI has been exceptional. This is exactly what we needed to scale our business.',
    rating: 5,
    avatar: '👨‍💼',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Sales Lead',
    company: 'Digital Solutions',
    content: 'Best investment we made this year. The team support is incredible and results speak for themselves.',
    rating: 5,
    avatar: '👩‍🔬',
  },
];

export default function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAutoPlay) return;

    autoPlayRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlay]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setActiveIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const testimonial = TESTIMONIALS[activeIdx];

  return (
    <section className="testimonials-section reveal">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">Join 500+ businesses that transformed their lead generation with Xerebo</p>
        </div>

        <div className="testimonial-carousel">
          <div className="testimonial-card fade-in">
            <div className="testimonial-stars">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="star">★</span>
              ))}
            </div>

            <p className="testimonial-content">"{testimonial.content}"</p>

            <div className="testimonial-author">
              <div className="author-avatar">{testimonial.avatar}</div>
              <div className="author-info">
                <div className="author-name">{testimonial.name}</div>
                <div className="author-role">{testimonial.role} at {testimonial.company}</div>
              </div>
            </div>
          </div>

          <div className="carousel-controls">
            <button
              className="carousel-btn"
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              ←
            </button>

            <div className="carousel-indicators">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  className={`indicator ${idx === activeIdx ? 'active' : ''}`}
                  onClick={() => {
                    setIsAutoPlay(false);
                    setActiveIdx(idx);
                  }}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              className="carousel-btn"
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>

        <style jsx>{`
          .testimonials-section {
            padding: 80px 20px;
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          }

          .testimonials-container {
            max-width: 900px;
            margin: 0 auto;
          }

          .testimonials-header {
            text-align: center;
            margin-bottom: 60px;
          }

          .section-title {
            font-size: 42px;
            font-weight: 700;
            color: #1a1a1a;
            margin-bottom: 16px;
          }

          .section-subtitle {
            font-size: 18px;
            color: #666;
            max-width: 500px;
            margin: 0 auto;
          }

          .testimonial-carousel {
            display: flex;
            flex-direction: column;
            gap: 40px;
          }

          .testimonial-card {
            background: white;
            border: 1px solid #e5e5e5;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            transition: all 0.3s ease;
          }

          .testimonial-card:hover {
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
            border-color: #ff8c42;
          }

          .testimonial-stars {
            display: flex;
            gap: 4px;
            margin-bottom: 20px;
          }

          .star {
            color: #ff8c42;
            font-size: 18px;
          }

          .testimonial-content {
            font-size: 18px;
            line-height: 1.6;
            color: #333;
            margin-bottom: 30px;
            font-style: italic;
          }

          .testimonial-author {
            display: flex;
            align-items: center;
            gap: 16px;
          }

          .author-avatar {
            font-size: 48px;
            width: 56px;
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f0f0f0;
            border-radius: 50%;
          }

          .author-name {
            font-weight: 600;
            color: #1a1a1a;
            font-size: 16px;
          }

          .author-role {
            font-size: 14px;
            color: #666;
          }

          .carousel-controls {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 24px;
          }

          .carousel-btn {
            background: white;
            border: 2px solid #ff8c42;
            color: #ff8c42;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 20px;
            font-weight: bold;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .carousel-btn:hover {
            background: #ff8c42;
            color: white;
          }

          .carousel-indicators {
            display: flex;
            gap: 12px;
          }

          .indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #e5e5e5;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .indicator.active {
            background: #ff8c42;
            width: 32px;
            border-radius: 6px;
          }

          .fade-in {
            animation: fadeIn 0.6s ease;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
