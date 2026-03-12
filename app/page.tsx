import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FormulaSection from '@/components/FormulaSection';
import StrugglesSection from '@/components/StrugglesSection';
import IngredientsSection from '@/components/IngredientsSection';
import ZeroSugarSection from '@/components/ZeroSugarSection';
import ScienceSection from '@/components/ScienceSection';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';

// Dynamically import heavy 3D section — client-side only
const OrthofixSection = dynamic(() => import('@/components/OrthofixSection'), {
  ssr: false,
  loading: () => (
    <div className="h-screen bg-forest-900 flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

// Sound system — client-side only (uses Web Audio API)
const SoundDesign = dynamic(() => import('@/components/SoundDesign'), { ssr: false });

export default function Home() {
  return (
    <SmoothScroll>
      <main className="bg-forest-900 overflow-x-hidden">
        <Navbar />
        <HeroSection />
        <FormulaSection />
        <StrugglesSection />
        <OrthofixSection />
        <IngredientsSection />
        <ZeroSugarSection />
        <ScienceSection />
        <Testimonials />
        <CTASection />
        <Footer />
        <SoundDesign />
      </main>
    </SmoothScroll>
  );
}
