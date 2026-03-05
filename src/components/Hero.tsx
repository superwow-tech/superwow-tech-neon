import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronDown } from 'lucide-react';

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

    gsap.to(".floating-shape", {
      y: "-=30",
      rotation: "+=10",
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      stagger: 0.5
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

    gsap.to(".parallax-shape-1", {
      y: -150,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(".parallax-shape-2", {
      y: -250,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(".parallax-shape-3", {
      y: -80,
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
    <section id="home" ref={container} className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-charcoal via-charcoal/90 to-lime/10">
      {/* Energetic Abstract Background */}
      <div className="parallax-bg absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-lime/20 to-pink-900/20" />
        <div className="absolute -inset-[10px] opacity-50 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lime/10 via-transparent to-transparent" />
        
        {/* Parallax Shapes */}
        <div className="parallax-shape-1 absolute top-[20%] left-[10%] w-64 h-64">
          <div className="floating-shape w-full h-full bg-lime/10 rounded-full blur-3xl mix-blend-screen" />
        </div>
        <div className="parallax-shape-2 absolute top-[60%] right-[15%] w-96 h-96">
          <div className="floating-shape w-full h-full bg-blue-500/10 rounded-full blur-3xl mix-blend-screen" />
        </div>
        <div className="parallax-shape-3 absolute top-[40%] left-[60%] w-72 h-72">
          <div className="floating-shape w-full h-full bg-pink/10 rounded-full blur-3xl mix-blend-screen" />
        </div>
      </div>

      <div className="z-10 text-center px-4 w-full mt-16">
        <h1 className="font-display text-[22vw] md:text-[15vw] leading-[0.8] tracking-tighter uppercase text-white flex flex-col items-center drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <div className="hero-text-line-1 px-4">
            <span className="inline-block">WEB & AI</span>
          </div>
          <div className="hero-text-line-2 px-4">
            <span className="inline-block text-lime [text-shadow:0_0_40px_currentColor]">SOLUTIONS</span>
          </div>
        </h1>
        <p className="hero-text-line-3 mt-8 font-sans text-sm md:text-2xl text-white/70 max-w-2xl mx-auto uppercase tracking-widest">
          FASTER, SMARTER AND POWERED BY AI
        </p>
        
        <div className="hero-cta mt-12 md:hidden flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 text-white font-bold uppercase tracking-wider rounded-full border border-white/20 hover:bg-white/10 transition-colors">
            Let's Talk
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-lime transition-colors cursor-pointer">
        <span className="text-xs uppercase tracking-[0.2em] font-medium">Scroll</span>
        <ChevronDown className="hero-scroll-icon w-6 h-6" />
      </div>
    </section>
  );
}
