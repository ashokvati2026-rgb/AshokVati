'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const BADGES = ['Doctor Recommended', 'Clinically Tested', 'Scientifically Validated'];

export default function FormulaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.formula-text-col',
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        },
      );

      gsap.fromTo(
        '.formula-cards-col',
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        },
      );

      gsap.fromTo(
        '.formula-badge',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.formula-badges', start: 'top 82%' },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="formulas"
      className="py-28 px-6"
      style={{ background: 'linear-gradient(to bottom, #050505 0%, #030303 100%)' }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 lg:gap-24 items-center">
        {/* ── Left: Text ── */}
        <div className="formula-text-col">
          <p className="section-tag mb-3">Precision Formulas</p>
          <h2 className="heading-lg text-cream mb-5">
            Meet the{' '}
            <span className="text-gold-400 italic">Ashokvati</span>
            <br />
            Formulas
          </h2>
          <p className="text-cream/55 leading-relaxed font-sans text-sm max-w-md">
            Our signature formulas blend traditional Ayurvedic herbs with modern
            precision extraction methods, delivering therapeutic benefits that
            work synergistically with your body's natural processes.
          </p>

          {/* Badges */}
          <div className="formula-badges flex flex-wrap gap-3 mt-8">
            {BADGES.map((b) => (
              <span
                key={b}
                className="formula-badge glass-card px-4 py-2 rounded-full flex items-center gap-2 text-xs font-sans text-cream/75"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right: Cards ── */}
        <div className="formula-cards-col space-y-5">
          {/* Orthofix Care */}
          <div className="glass-card rounded-2xl p-6 group hover:border-gold-500/40 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <svg className="w-5 h-5 text-gold-400" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                  <h3 className="text-cream font-serif text-xl">Orthofix Care</h3>
                  <span className="text-gold-500/60 text-[11px] font-sans tracking-wide">
                    Bone &amp; Joint Support
                  </span>
                </div>
                <p className="text-cream/50 text-sm font-sans leading-relaxed">
                  Advanced joint and bone health formula with 4 potent
                  anti-inflammatory Ayurvedic herbs for 24-hour relief.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['4 Roots', '24 Hours', 'Anti-inflammatory'].map((t) => (
                    <span
                      key={t}
                      className="text-[11px] text-gold-500/75 font-sans bg-gold-500/10 px-2.5 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Zero Sugar */}
          <div className="glass-card rounded-2xl p-6 group hover:border-gold-500/40 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <svg className="w-5 h-5 text-gold-400" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 7V12L15.5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                  <h3 className="text-cream font-serif text-xl">Zero Sugar</h3>
                  <span className="text-gold-500/60 text-[11px] font-sans tracking-wide">
                    Blood Balance Support
                  </span>
                </div>
                <p className="text-cream/50 text-sm font-sans leading-relaxed">
                  Harnesses the elder wisdom of forest botanicals to regulate
                  your body's energy cycle and reduce sugar cravings naturally.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['Sugar Balance', 'Energy Levels', 'Insulin Support'].map((t) => (
                    <span
                      key={t}
                      className="text-[11px] text-gold-500/75 font-sans bg-gold-500/10 px-2.5 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
