'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const REVIEWS = [
  {
    name: 'Anjana Singh',
    location: 'New Delhi',
    rating: 5,
    product: 'Orthofix Care',
    quote:
      'I had been struggling with knee pain for years. After just 3 weeks of Orthofix Care I finally went on a morning walk without that nagging pain. Truly work as good as the promises.',
  },
  {
    name: 'Suresh M.',
    location: 'Bangalore',
    rating: 5,
    product: 'Zero Sugar',
    quote:
      "The Zero Sugar formula helped me get off my blood sugar medication after 2 months — my doctor was shocked. My energy is stable throughout the day and the cravings are gone.",
  },
  {
    name: 'Nisha T.',
    location: 'Mumbai',
    rating: 5,
    product: 'Orthofix Care',
    quote:
      'The quality of Ashokvati is unmatched. I have tried many herbal brands but none come close. Excellent packaging and the results speak for themselves after just 4 weeks.',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < count ? 'text-gold-400' : 'text-forest-700'}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-heading',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        },
      );

      gsap.fromTo(
        '.testimonial-card',
        { y: 55, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.testimonials-grid', start: 'top 82%' },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6"
      style={{
        background: 'linear-gradient(to bottom, #040404 0%, #060606 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="testimonials-heading text-center mb-14">
          <p className="section-tag mb-3">Real Results</p>
          <h2 className="heading-lg text-cream">
            Voices of <span className="text-gold-400 italic">Healing</span>
          </h2>
          <div className="section-divider mt-5" />
        </div>

        {/* Cards */}
        <div className="testimonials-grid grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <div key={r.name} className="testimonial-card">
              <div className="flex items-start justify-between mb-3">
                <StarRating count={r.rating} />
                <span className="text-gold-500/50 text-[10px] font-sans tracking-wider">
                  {r.product}
                </span>
              </div>

              <p className="text-cream/72 font-serif italic text-sm leading-relaxed mb-5">
                &ldquo;{r.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                {/* Avatar placeholder */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-cream/60 flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #202020 0%, #161616 100%)',
                  }}
                >
                  {r.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <p className="text-cream/85 text-sm font-sans font-medium">{r.name}</p>
                  <p className="text-cream/40 text-xs font-sans">{r.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-14 grid grid-cols-3 gap-6 max-w-xl mx-auto text-center">
          {[
            { val: '50,000+', label: 'Happy Customers' },
            { val: '4.9★', label: 'Average Rating' },
            { val: '98%', label: 'Recommend Us' },
          ].map((b) => (
            <div key={b.label}>
              <div className="text-gold-400 font-serif text-2xl">{b.val}</div>
              <p className="text-cream/40 text-xs font-sans mt-1">{b.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
