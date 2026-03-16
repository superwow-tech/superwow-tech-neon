/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatWeBuild from './components/WhatWeBuild';
import WhatWeDo from './components/WhatWeDo';
import WhyUs from './components/WhyUs';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <LanguageProvider>
      <main className="bg-charcoal min-h-screen text-cream selection:bg-lime selection:text-charcoal">
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-lime z-[100] origin-left"
          style={{ scaleX }}
        />
        <Navbar />
        <Hero />
        <WhatWeBuild />
        <WhatWeDo />
        <WhyUs />
        <CTA />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
