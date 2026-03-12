'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FEATURES = [
  {
    title: 'Restore Energy Levels',
    desc: 'Revives mitochondrial function for sustained daily energy without stimulants.',
  },
  {
    title: 'Supports Insulin Function',
    desc: 'Enhances cellular insulin sensitivity to balance blood sugar naturally.',
  },
  {
    title: 'Reduces Sugar Cravings',
    desc: 'Botanical neuropeptides signal satiety, reducing addictive sugar compulsion.',
  },
];

export default function ZeroSugarSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ── Text side ── */
      gsap.fromTo(
        '.zs-text-col',
        { x: -55, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        },
      );

      /* ── Feature cards animate in stagger ── */
      gsap.fromTo(
        '.zs-feature',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.14,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.zs-features', start: 'top 80%' },
        },
      );

      /* ── Bottle/image side ── */
      gsap.fromTo(
        imageRef.current,
        { x: 60, opacity: 0, scale: 0.94 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        },
      );

      /* ── Subtle parallax on image ── */
      gsap.to(imageRef.current, {
        y: '-8%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="zero-sugar"
      className="py-24 px-6"
      style={{
        background:
          'linear-gradient(to bottom, #040404 0%, #060606 50%, #040404 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* ── Left: Content ── */}
        <div className="zs-text-col">
          <p className="section-tag mb-3">Botanical Formula 2</p>
          <h2 className="heading-lg text-cream mb-2">
            Zero <span className="text-gold-400 italic">Sugar</span>
          </h2>
          <p className="text-cream/55 font-sans text-sm leading-relaxed max-w-md mb-8">
            Harness the elder wisdom of forest botanicals to regulate your
            body&apos;s energy cycle naturally — without synthetic additives,
            without side effects.
          </p>

          {/* Feature list */}
          <div className="zs-features space-y-4 mb-8">
            {FEATURES.map((f) => (
              <div key={f.title} className="zs-feature">
                <div className="glass-card rounded-xl p-4 border-l-2 border-gold-500/40 hover:border-gold-500/70 transition-colors">
                  <h4 className="text-cream/90 font-sans text-sm font-semibold mb-1">{f.title}</h4>
                  <p className="text-cream/45 font-sans text-xs leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <a href="#shop" className="btn-gold">
            Shop Zero Sugar
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* ── Right: Bottle on wooden platform ── */}
        <div
          ref={imageRef}
          className="will-change-transform"
        >
          <div
            className="relative mx-auto max-w-xs rounded-3xl overflow-hidden"
            style={{ aspectRatio: '3/4' }}
          >
            {/* Dark rich background */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(160deg, #0f0f0f 0%, #0a0a0a 50%, #060606 100%)',
              }}
            />

            {/* Wooden platform */}
            <div
              className="absolute bottom-12 left-1/2 -translate-x-1/2 rounded-full"
              style={{
                width: '70%',
                height: '18px',
                background:
                  'linear-gradient(to bottom, #1a1a1a 0%, #121212 100%)',
                boxShadow:
                  '0 8px 30px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.4)',
              }}
            />
            {/* Platform edge highlight */}
            <div
              className="absolute bottom-[58px] left-1/2 -translate-x-1/2"
              style={{
                width: '72%',
                height: '2px',
                background:
                  'linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)',
              }}
            />

            {/* Bottle SVG */}
            <div className="absolute bottom-[44px] left-1/2 -translate-x-1/2">
              <svg viewBox="0 0 100 240" width="90" height="216" fill="none">
                <defs>
                  <linearGradient id="zsBottleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2a2a2a" />
                    <stop offset="60%" stopColor="#1a1a1a" />
                    <stop offset="100%" stopColor="#111111" />
                  </linearGradient>
                  <linearGradient id="zsShine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                    <stop offset="40%" stopColor="rgba(255,255,255,0.06)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>
                {/* Bottle body */}
                <path
                  d="M30 225 Q20 215 20 185 L20 90 Q20 75 30 70 L33 58 L33 44 Q33 36 42 36 Q50 32 50 32 Q50 32 58 36 Q67 36 67 44 L67 58 L70 70 Q80 75 80 90 L80 185 Q80 215 70 225 Z"
                  fill="url(#zsBottleGrad)"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="0.8"
                />

                {/* Shine */}
                <path
                  d="M30 225 Q20 215 20 185 L20 90 Q20 75 30 70 L33 58 L33 44 Q33 36 42 36 Q50 32 50 32 Q50 32 58 36 Q67 36 67 44 L67 58 L70 70 Q80 75 80 90 L80 185 Q80 215 70 225 Z"
                  fill="url(#zsShine)"
                />

                {/* Cap */}
                <rect x="38" y="22" width="24" height="16" rx="3" fill="#111111" />
                {/* Pump stem */}
                <rect x="46" y="6" width="8" height="20" rx="2" fill="#1a1a1a" />
                {/* Pump head */}
                <rect x="38" y="2" width="24" height="8" rx="2" fill="#111111" />

                {/* Label */}
                <rect x="25" y="110" width="50" height="60" rx="4" fill="rgba(30,30,30,0.6)" />
                <text x="37" y="135" fill="rgba(220,220,220,0.8)" fontSize="7" fontFamily="serif">
                  Zero
                </text>
                <text x="34" y="147" fill="rgba(220,220,220,0.8)" fontSize="7" fontFamily="serif">
                  Sugar
                </text>
                <line x1="30" y1="155" x2="70" y2="155" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
                <text x="33" y="163" fill="rgba(245,240,232,0.5)" fontSize="5" fontFamily="sans-serif">
                  Ashokvati
                </text>

                {/* Gold ring */}
                <ellipse cx="50" cy="68" rx="17" ry="3" stroke="#c0c0c0" strokeWidth="0.8" fill="none" />
              </svg>
            </div>

            {/* Warm ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(200,200,200,0.05) 0%, transparent 70%)',
              }}
            />

            {/* Leaf decoration */}
            <div className="absolute top-8 right-6 opacity-30 animate-float-slow">
              <svg viewBox="0 0 40 40" width="36" fill="#c0c0c0">
                <path d="M20 2C20 2 2 14 2 26C2 34.28 10.27 40 20 40C29.73 40 38 34.28 38 26C38 14 20 2 20 2Z" />
              </svg>
            </div>
            <div className="absolute top-16 left-5 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
              <svg viewBox="0 0 30 30" width="26" fill="#a0a0a0">
                <path d="M15 2C15 2 2 9 2 18C2 24.63 7.37 30 15 30C22.63 30 28 24.63 28 18C28 9 15 2 15 2Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
