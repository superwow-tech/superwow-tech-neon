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
      duration: 1.5,
      ease: "power4.out",
      delay: 0.5
    });

    gsap.from(".hero-text-line-2", {
      scale: 0.5,
      opacity: 0,
      color: "#ffffff",
      duration: 1.5,
      ease: "power4.out",
      delay: 0.8
    });

    gsap.from(".hero-text-line-3", {
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      delay: 1.1
    });

    gsap.from(".hero-cta", {
      y: 30,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      delay: 1.4
    });

    gsap.from(".hero-scroll", {
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      delay: 1.7
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

      <div className="z-10 text-center px-4 w-full mt-16">
        <h1 className="font-display text-[26vw] md:text-[18vw] leading-[0.8] tracking-normal uppercase text-white flex flex-col items-center drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <div className="hero-text-line-1 px-4">
            <span className="inline-block">WEB & AI</span>
          </div>
          <div className="hero-text-line-2 px-4">
            <span className="inline-block text-lime [text-shadow:0_0_40px_currentColor]">SOLUTIONS</span>
          </div>
        </h1>
        <p className="hero-text-line-3 mt-8 font-sans text-sm font-bold md:text-3xl text-white/90 max-w-3xl mx-auto uppercase tracking-widest drop-shadow-md">
          FASTER, SMARTER AND POWERED BY AI
        </p>

      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-pink/80 hover:text-pink transition-colors cursor-pointer drop-shadow-md">
        <span className="text-sm uppercase tracking-[0.2em] font-bold">Scroll</span>
        <ChevronDown className="hero-scroll-icon w-6 h-6" />
      </div>
    </section>
  );
}
