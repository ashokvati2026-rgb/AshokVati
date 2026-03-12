'use client';

import Link from 'next/link';

const FOOTER_LINKS = {
  'Quick Links': [
    { label: 'Orthofix Care', href: '#orthofix' },
    { label: 'Zero Sugar', href: '#zero-sugar' },
    { label: 'Our Herbs', href: '#herbs' },
    { label: 'Science', href: '#science' },
  ],
  'Information': [
    { label: 'About Us', href: '#' },
    { label: 'How It Works', href: '#' },
    { label: 'Ingredients', href: '#herbs' },
    { label: 'Blog', href: '#' },
  ],
  'Newsletter': null,
};

export default function Footer() {
  return (
    <footer
      className="pt-16 pb-8 px-6 border-t border-forest-800"
      style={{ background: '#020202' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-full border border-gold-500/50 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-gold-500">
                  <path
                    d="M12 3C7 3 3 7.5 3 13C3 16.87 5.13 20.22 8.27 22C8.1 21.05 8 20.03 8 19C8 13.48 9.78 9 12 9C14.22 9 16 13.48 16 19C16 20.03 15.9 21.05 15.73 22C18.87 20.22 21 16.87 21 13C21 7.5 17 3 12 3Z"
                    fill="currentColor"
                    opacity="0.85"
                  />
                </svg>
              </div>
              <span className="text-cream font-sans text-base font-semibold tracking-[0.2em] uppercase">
                Ashokvati
              </span>
            </Link>
            <p className="text-cream/40 text-xs font-sans leading-relaxed max-w-xs">
              Ancient Ayurvedic wisdom for modern wellness. Crafted with precision
              extraction methods to restore balance of body, mind &amp; soul.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-5">
              {['instagram', 'facebook', 'twitter'].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="w-8 h-8 rounded-full border border-forest-700 flex items-center justify-center text-cream/40 hover:border-gold-500/50 hover:text-gold-400 transition-colors"
                >
                  {social === 'instagram' && (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                    </svg>
                  )}
                  {social === 'facebook' && (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  )}
                  {social === 'twitter' && (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {Object.entries(FOOTER_LINKS)
            .filter(([, v]) => v !== null)
            .map(([title, links]) => (
              <div key={title}>
                <h4 className="text-cream/70 text-xs font-sans font-semibold tracking-[0.2em] uppercase mb-4">
                  {title}
                </h4>
                <ul className="space-y-2.5">
                  {(links as { label: string; href: string }[]).map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-cream/40 hover:text-gold-400 text-sm font-sans transition-colors duration-200"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-cream/70 text-xs font-sans font-semibold tracking-[0.2em] uppercase mb-4">
              Newsletter
            </h4>
            <p className="text-cream/40 text-xs font-sans leading-relaxed mb-4">
              Get Ayurvedic wellness tips and exclusive offers delivered weekly.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-forest-800/60 border border-forest-700 text-cream placeholder-cream/30 text-sm font-sans rounded-lg px-4 py-2.5 outline-none focus:border-gold-500/60 transition-colors w-full"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="btn-gold text-xs w-full justify-center py-2.5"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-forest-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-cream/25 text-xs font-sans">
            © {new Date().getFullYear()} Ashokvati. All rights reserved.
          </p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((t) => (
              <a
                key={t}
                href="#"
                className="text-cream/25 hover:text-cream/50 text-xs font-sans transition-colors"
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
