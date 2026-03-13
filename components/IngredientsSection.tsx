'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FALLBACK_HERB_IMAGE =
  'https://images.unsplash.com/photo-1457530378978-8bac673b8062?auto=format&fit=crop&w=900&q=80';

const INGREDIENTS = [
  {
    id: 'gurkhalil',
    name: 'Gurkhalil',
    hindiName: 'गुरखलील',
    latin: 'Terminalia chebula',
    desc: 'The king of herbs — powerful antioxidant and detoxifier known to support joint health.',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Harra_(Terminalia_chebula)_hanging_fruit_at_23_Mile,_Duars,_WB_W_IMG_5902.jpg',
    color1: '#111111',
    color2: '#1a1a1a',
    accentColor: '#d0d0d0',
  },
  {
    id: 'kali-erai',
    name: 'Kali Erai',
    hindiName: 'पिप्पली',
    latin: 'Piper longum',
    desc: 'Long pepper root with bioavailability-enhancing properties that supercharge the formula.',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Piper_longum.jpg',
    color1: '#0d0d0d',
    color2: '#161616',
    accentColor: '#c0c0c0',
  },
  {
    id: 'ashwagandha',
    name: 'Ashwagandha',
    hindiName: 'अश्वगन्धा',
    latin: 'Withania somnifera',
    desc: 'The adaptogenic root that reduces cortisol, builds resilience, and supports joint tissue.',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ashwagandha.jpg',
    color1: '#131313',
    color2: '#1c1c1c',
    accentColor: '#e0e0e0',
  },
  {
    id: 'rasna',
    name: 'Rasna',
    hindiName: 'रास्ना',
    latin: 'Pluchea lanceolata',
    desc: 'Ancient Vata-balancing herb traditionally used for arthritis and muscular disorders.',
    imageUrl: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
    color1: '#0f0f0f',
    color2: '#181818',
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
                {/* Real herb image */}
                <img
                  src={ing.imageUrl}
                  alt={ing.name}
                  className="w-full h-full object-cover ingredient-icon"
                  style={{ filter: 'brightness(0.98) saturate(1)' }}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.dataset.fallbackApplied === 'true') return;
                    target.dataset.fallbackApplied = 'true';
                    target.src = FALLBACK_HERB_IMAGE;
                  }}
                />

                {/* Overlay tint */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${ing.color1}88 0%, transparent 45%)`,
                  }}
                />

                {/* Glow orb on hover */}
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
                      'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)',
                  }}
                />
              </div>

              {/* Label area */}
              <div className="p-4">
                <h3 className="text-cream font-serif text-lg leading-tight">
                  {ing.name}
                  <span className="ml-2 text-gold-400/70 text-sm font-sans not-italic">{ing.hindiName}</span>
                </h3>
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
