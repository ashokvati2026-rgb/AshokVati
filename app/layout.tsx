import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ashokvati — Ancient Wisdom for Modern Wellness',
  description:
    'Natural Ayurvedic formulas crafted with wisdom-precision extraction methods to restore balance of body, mind & soul.',
  keywords:
    'Ayurveda, natural wellness, Orthofix Care, Zero Sugar, herbal, ancient wisdom, joint health, blood sugar',
  openGraph: {
    title: 'Ashokvati — Ancient Wisdom for Modern Wellness',
    description:
      'Natural Ayurvedic formulas for modern wellness. Bone, joint, and blood sugar support.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
