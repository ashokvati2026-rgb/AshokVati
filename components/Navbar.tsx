'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

const NAV_LINKS = [
  { href: '#formulas', label: 'Orthofix Care' },
  { href: '#zero-sugar', label: 'Zero Sugar' },
  { href: '#herbs', label: 'Our Herbs' },
  { href: '#science', label: 'Science' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 },
    );

    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-forest-900/95 backdrop-blur-md shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full border border-gold-500/60 flex items-center justify-center group-hover:border-gold-400 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all duration-300">
            {/* Leaf icon */}
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-gold-500">
              <path
                d="M12 3C7 3 3 7.5 3 13C3 16.87 5.13 20.22 8.27 22C8.1 21.05 8 20.03 8 19C8 13.48 9.78 9 12 9C14.22 9 16 13.48 16 19C16 20.03 15.9 21.05 15.73 22C18.87 20.22 21 16.87 21 13C21 7.5 17 3 12 3Z"
                fill="currentColor"
                opacity="0.85"
              />
            </svg>
          </div>
          <span
            className="text-cream font-sans text-base font-semibold tracking-[0.25em] uppercase"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            Ashokvati
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-cream/65 hover:text-cream text-sm tracking-wide font-sans transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a href="#shop" className="btn-gold text-sm">
            Shop Now
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col gap-[5px] p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-cream origin-center transition-transform duration-300 ${
              menuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-cream transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-cream origin-center transition-transform duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-forest-900/98 backdrop-blur-xl border-t border-gold-500/10 px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-cream/75 hover:text-gold-400 text-base tracking-wide font-sans transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="#shop" className="btn-gold text-sm text-center mt-1">
            Shop Now
          </a>
        </div>
      </div>
    </nav>
  );
}
