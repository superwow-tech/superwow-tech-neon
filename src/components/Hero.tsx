import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronDown } from 'lucide-react';
import heroImg from '@/assets/images/hero.png';
import heroMobileImg from '@/assets/images/hero_mobile.png';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".hero-text-line-1", {
      y: 100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.1
    });

    gsap.from(".hero-text-line-2", {
      scale: 0.5,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.25
    });

    gsap.from(".hero-text-line-3", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.4
    });

    gsap.from(".hero-cta", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.55
    });

    gsap.from(".hero-scroll", {
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.7
    });

    gsap.to(".hero-scroll-icon", {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    gsap.to(".parallax-bg", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, { scope: container });

  return (
    <section id="home" ref={container} className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-charcoal">
      {/* Background Image Parallax */}
      <div className="parallax-bg absolute inset-0 w-full h-[130%] -top-[15%] pointer-events-none overflow-hidden origin-center">
        <div className="absolute inset-0 bg-charcoal/40 z-10" />
        <picture>
          <source media="(min-width: 768px)" srcSet={heroImg} />
          <img src={heroMobileImg} alt="Hero Background" className="w-full h-full object-cover object-center" />
        </picture>
      </div>

      {/* Added vertical padding and removed overflow-hidden to give the text-shadow room to bleed without clipping */}
      <div className="z-10 text-center px-4 w-full mt-16 py-10 flex flex-col items-center justify-center max-w-[100vw]">
        {/* Adjusted letter spacing (tracking-tight on mobile, tracking-[0.1em] on md+) and clamp sizes */}
        <h1 className="font-display font-black text-[clamp(3rem,16vw,11rem)] leading-[0.85] md:leading-[1.1] tracking-tighter md:tracking-[0.1em] uppercase flex flex-col items-center w-full relative">

          {/* Shadow Layer (renders behind all text so no letters get washed out) */}
          <div className="absolute inset-x-0 top-0 flex flex-col items-center w-full pointer-events-none z-0" aria-hidden="true">
            <div className="hero-text-line-1 px-1 md:px-4 break-words max-w-[100vw] will-change-[transform,opacity]">
              <span className="inline-block text-neon-lime-shadow will-change-transform">WEB & AI</span>
            </div>
            <div className="hero-text-line-2 px-1 md:px-4 break-words max-w-[100vw] will-change-[transform,opacity]">
              <span className="inline-block text-neon-lime-shadow pt-2 md:pt-4 will-change-transform">SOLUTIONS</span>
            </div>
          </div>

          {/* Text Layer (renders on top of all shadows) */}
          <div className="relative z-10 flex flex-col items-center w-full">
            <div className="hero-text-line-1 px-1 md:px-4 break-words max-w-[100vw] will-change-[transform,opacity]">
              <span className="inline-block text-neon-lime-text will-change-transform">WEB & AI</span>
            </div>
            <div className="hero-text-line-2 px-1 md:px-4 break-words max-w-[100vw] will-change-[transform,opacity]">
              <span className="inline-block text-neon-lime-text pt-2 md:pt-4 will-change-transform">SOLUTIONS</span>
            </div>
          </div>

        </h1>
        <p className="hero-text-line-3 mt-6 md:mt-8 font-sans text-[clamp(10px,3.5vw,16px)] sm:text-sm md:text-xl lg:text-2xl font-extrabold text-white max-w-5xl mx-auto uppercase tracking-wider md:tracking-[0.2em] text-glow-white px-2 w-full text-center will-change-[transform,opacity]">
          FASTER. SMARTER. AI-POWERED.
        </p>

      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-pink/80 hover:text-pink transition-colors cursor-pointer drop-shadow-md">
        <ChevronDown className="hero-scroll-icon w-10 h-10 md:w-12 md:h-12" />
      </div>
    </section>
  );
}
