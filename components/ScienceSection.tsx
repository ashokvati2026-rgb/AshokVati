'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const STATS = [
  { value: '100%', label: 'Plant Based', sub: 'No synthetic compounds' },
  { value: 'Zero', label: 'Synthetic Additives', sub: 'Pure botanical extracts' },
  { value: 'Vedic', label: 'Extraction Method', sub: 'Ancient purification rites' },
];

export default function ScienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.science-heading',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        },
      );

      gsap.fromTo(
        '.science-body',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          delay: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        },
      );

      gsap.fromTo(
        '.science-stat',
        { y: 45, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.75,
          stagger: 0.16,
          ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '.science-stats-row', start: 'top 82%' },
        },
      );

      /* ── Decorative orb parallax ── */
      gsap.to('.science-orb', {
        y: '-30%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="science"
      className="py-28 px-6 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(to bottom, #040404 0%, #050505 50%, #040404 100%)',
      }}
    >
      {/* Background glow orb */}
      <div
        className="science-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
        style={{
          width: '600px',
          height: '600px',
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 65%)',
          filter: 'blur(20px)',
        }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Decorative icon */}
        <div className="flex justify-center mb-6">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <svg className="w-6 h-6 text-gold-400" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="science-heading">
          <p className="section-tag mb-3">Our Philosophy</p>
          <h2 className="heading-lg text-cream">
            The Science of <span className="text-gold-400 italic">Balance</span>
          </h2>
          <div className="section-divider mt-4 mb-8" />
        </div>

        <p className="science-body text-cream/55 font-sans text-sm leading-relaxed max-w-2xl mx-auto mb-16">
          Our formulations follow the{' '}
          <span className="text-gold-400 italic">&ldquo;Samyoga&rdquo;</span>{' '}
          principle — the precise combination of herbs that creates a synergistic
          effect greater than the sum of its parts. Every leaf is harvested at the
          peak of its potency, following the solar cycles of traditional Ayurveda.
        </p>

        {/* Stats */}
        <div className="science-stats-row grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((s) => (
            <div
              key={s.value}
              className="science-stat glass-card rounded-2xl py-8 px-6 group hover:border-gold-500/35 transition-colors"
            >
              <div className="stat-number mb-1">{s.value}</div>
              <h4 className="text-cream/85 font-serif text-lg mb-1">{s.label}</h4>
              <p className="text-cream/40 text-xs font-sans">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
