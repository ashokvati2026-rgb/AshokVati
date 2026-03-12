'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const INGREDIENTS = [
  {
    id: 'gurkhalil',
    name: 'Gurkhalil',
    latin: 'Terminalia chebula',
    desc: 'The king of herbs — powerful antioxidant and detoxifier known to support joint health.',
    color1: '#111111',
    color2: '#1a1a1a',
    svgPath: 'M10 20C10 20 6 18 5 14C4.5 11.5 6 8 10 7C14 6 17 9 16 13C15 17 12 20 10 20Z M14 6C14 6 17 4 19 6C20.5 7.5 20 11 17 12',
    accentColor: '#d0d0d0',
  },
  {
    id: 'kali-erai',
    name: 'Kali Erai',
    latin: 'Piper longum',
    desc: 'Long pepper root with bioavailability-enhancing properties that supercharge the formula.',
    color1: '#0d0d0d',
    color2: '#161616',
    svgPath: 'M12 19C9 19 6 16.5 6 13C6 9 9 5 12 4C15 3 18 6 18 10C18 15 15 19 12 19Z M12 19L12 22',
    accentColor: '#c0c0c0',
  },
  {
    id: 'ashwagandha',
    name: 'Ashwagandha',
    latin: 'Withania somnifera',
    desc: 'The adaptogenic root that reduces cortisol, builds resilience, and supports joint tissue.',
    color1: '#131313',
    color2: '#1c1c1c',
    svgPath: 'M12 3C12 3 5 9 5 15C5 18.87 8.13 22 12 22C15.87 22 19 18.87 19 15C19 9 12 3 12 3Z',
    accentColor: '#e0e0e0',
  },
  {
    id: 'rasna',
    name: 'Rasna',
    latin: 'Pluchea lanceolata',
    desc: 'Ancient Vata-balancing herb traditionally used for arthritis and muscular disorders.',
    color1: '#0f0f0f',
    color2: '#181818',
    svgPath: 'M12 21C12 21 4 16 4 10C4 6.69 6.69 4 10 4C11.12 4 12 4.6 12 4.6C12 4.6 12.88 4 14 4C17.31 4 20 6.69 20 10C20 16 12 21 12 21Z',
    accentColor: '#c8c8c8',
  },
];

export default function IngredientsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ── Heading ── */
      gsap.fromTo(
        '.ingredients-heading',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        },
      );

      /* ── Cards rise from ground + glow animation ── */
      gsap.fromTo(
        '.ingredient-card-item',
        { y: 80, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.ingredients-grid',
            start: 'top 80%',
          },
        },
      );

      /* ── Continuous slow rotation on hover icon ── */
      gsap.to('.ingredient-icon', {
        rotation: 360,
        duration: 18,
        repeat: -1,
        ease: 'none',
        stagger: { each: 3, from: 'start' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="herbs"
      className="py-24 px-6"
      style={{
        background: 'linear-gradient(to bottom, #060606 0%, #040404 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Heading ── */}
        <div className="ingredients-heading text-center mb-14">
          <p className="section-tag mb-3">Ancient Botanicals</p>
          <h2 className="heading-lg text-cream">
            The Healing <span className="text-gold-400 italic">Roots</span>
          </h2>
          <div className="section-divider mt-5" />
        </div>

        {/* ── Grid ── */}
        <div className="ingredients-grid grid grid-cols-2 md:grid-cols-4 gap-5">
          {INGREDIENTS.map((ing) => (
            <div
              key={ing.id}
              className="ingredient-card ingredient-card-item group"
            >
              {/* Visual area */}
              <div
                className="relative aspect-square overflow-hidden"
                style={{
                  background: `linear-gradient(145deg, ${ing.color1} 0%, ${ing.color2} 100%)`,
                }}
              >
                {/* Botanical illustration */}
                <svg
                  className="absolute inset-0 m-auto w-3/5 h-3/5 ingredient-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    filter: `drop-shadow(0 0 12px ${ing.accentColor}88)`,
                    animation: 'glowPulse 3s ease-in-out infinite',
                  }}
                >
                  <path d={ing.svgPath} fill={ing.accentColor} opacity="0.9" />
                </svg>

                {/* Glow orb */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at center, ${ing.accentColor}22 0%, transparent 70%)`,
                  }}
                />

                {/* Scan line shimmer */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)',
                  }}
                />
              </div>

              {/* Label area */}
              <div className="p-4">
                <h3 className="text-cream font-serif text-lg leading-tight">{ing.name}</h3>
                <p className="text-gold-500/60 text-[11px] font-sans italic mt-0.5 mb-2">
                  {ing.latin}
                </p>
                <p className="text-cream/45 text-xs font-sans leading-relaxed line-clamp-3">
                  {ing.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
