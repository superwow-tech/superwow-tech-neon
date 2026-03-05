import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, ShoppingCart, Sparkles, Check } from 'lucide-react';

export default function WhatWeDo() {
  const container = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const serviceGroups = [
    {
      icon: <Globe className="w-6 h-6 text-white/80" />,
      title: t('do.group1.title'),
      desc: t('do.group1.desc'),
      items: [t('do.group1.item1'), t('do.group1.item2'), t('do.group1.item3')]
    },
    {
      icon: <ShoppingCart className="w-6 h-6 text-white/80" />,
      title: t('do.group2.title'),
      desc: t('do.group2.desc'),
      items: [t('do.group2.item1'), t('do.group2.item2'), t('do.group2.item3')]
    },
    {
      icon: <Sparkles className="w-6 h-6 text-white/80" />,
      title: t('do.group3.title'),
      desc: t('do.group3.desc'),
      items: [t('do.group3.item1'), t('do.group3.item2'), t('do.group3.item3'), t('do.group3.item4')]
    }
  ];

  const trustIndicators = [
    t('do.trust1'),
    t('do.trust2'),
    t('do.trust3'),
    t('do.trust4')
  ];

  useGSAP(() => {
    gsap.from(".do-content", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });
  }, { scope: container });

  return (
    <section id="do" ref={container} className="py-16 md:py-24 bg-charcoal text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 lg:gap-20">
        
        {/* Left Column - Image */}
        <div className="w-full md:w-1/3 do-content flex flex-col">
          <h2 className="font-sans text-sm font-bold tracking-widest uppercase text-white/50 mb-8 lg:mb-12">{t('do.sectionTitle')}</h2>
          <div className="relative w-full max-w-[280px] sm:max-w-sm mx-auto md:max-w-none md:mx-0 aspect-[4/5] rounded-2xl overflow-hidden sticky top-24 bg-charcoal/50 flex items-center justify-center">
            <svg viewBox="0 0 400 500" className="w-full h-full object-contain p-4" preserveAspectRatio="xMidYMid meet">
              <defs>
                <pattern id="halftone-lime" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <circle cx="2" cy="2" r="2" fill="#cbf668" />
                </pattern>
                <pattern id="halftone-pink" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <circle cx="2" cy="2" r="2" fill="#f871c8" />
                </pattern>
                <pattern id="halftone-black" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <circle cx="1.5" cy="1.5" r="1.5" fill="#141414" />
                </pattern>
              </defs>
              
              {/* Cityscape Background (Pink & Black) */}
              <g transform="translate(0, 300)">
                {/* Pink buildings and halftones */}
                <rect x="20" y="50" width="80" height="150" fill="url(#halftone-pink)" />
                <rect x="120" y="80" width="100" height="120" fill="#f871c8" />
                <rect x="240" y="40" width="140" height="160" fill="url(#halftone-pink)" />
                <rect x="280" y="100" width="90" height="100" fill="#f871c8" />
                
                {/* Black buildings */}
                <rect x="10" y="80" width="50" height="120" fill="#141414" />
                <rect x="40" y="120" width="70" height="80" fill="url(#halftone-black)" />
                <rect x="100" y="100" width="60" height="100" fill="#141414" />
                <rect x="180" y="60" width="80" height="140" fill="#141414" />
                <rect x="220" y="130" width="120" height="70" fill="url(#halftone-black)" />
                <rect x="320" y="70" width="60" height="130" fill="#141414" />
                
                {/* Abstract city shapes */}
                <polygon points="120,80 170,30 220,80" fill="#141414" />
                <polygon points="240,40 290,10 340,40" fill="url(#halftone-black)" />
              </g>

              {/* Rocket Trail */}
              <g>
                <polygon points="220,250 50,450 120,450" fill="url(#halftone-lime)" />
                <polygon points="240,260 90,480 180,450" fill="url(#halftone-pink)" />
                <polygon points="230,255 70,460 150,460" fill="#cbf668" opacity="0.6" />
              </g>

              {/* Rocket */}
              <g transform="translate(180, 50) rotate(35)">
                {/* Lime Outline */}
                <path d="M60,0 C90,30 100,90 100,120 L130,150 L100,150 L85,180 L35,180 L20,150 L-10,150 L20,120 C20,90 30,30 60,0 Z" fill="#cbf668" />
                
                {/* Black Body */}
                <path d="M60,8 C85,35 92,88 92,115 L115,142 L90,142 L78,168 L42,168 L30,142 L5,142 L28,115 C28,88 35,35 60,8 Z" fill="#141414" />
                
                {/* Pink accents */}
                <path d="M60,8 C85,35 92,88 92,115 L28,115 C28,88 35,35 60,8 Z" fill="none" stroke="#f871c8" strokeWidth="3" />
                
                {/* Window */}
                <circle cx="60" cy="55" r="18" fill="#cbf668" />
                
                {/* Flames */}
                <path d="M42,168 Q60,220 78,168 Q60,190 42,168 Z" fill="#141414" />
                <path d="M48,168 Q60,200 72,168 Q60,180 48,168 Z" fill="#cbf668" />
              </g>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="w-full md:w-2/3 flex flex-col do-content">
          <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tighter mb-8 lg:mb-12">
            {t('do.heading')}
          </h3>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-12 lg:mb-16">
            <p className="font-sans text-lg text-white/70 flex-1 leading-relaxed">
              {t('do.desc1')}
            </p>
            <p className="font-sans text-lg text-white/70 flex-1 leading-relaxed">
              {t('do.desc2')}
            </p>
          </div>

          <div className="flex flex-col mb-12 lg:mb-16">
            {serviceGroups.map((group, i) => (
              <div 
                key={i} 
                className="py-8 border-t border-white/10 first:border-t-0 transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="p-4 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors shrink-0">
                    {group.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-sans text-2xl font-medium mb-3">{group.title}</h4>
                    <p className="font-sans text-base text-white/60 leading-relaxed mb-5">
                      {group.desc}
                    </p>
                    <ul className="flex flex-wrap gap-x-6 gap-y-3">
                      {group.items.map((item, j) => (
                        <li key={j} className="font-sans text-sm text-white/80 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-lime rounded-full"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 do-content pt-8 border-t border-white/10">
            {trustIndicators.map((indicator, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-lime/10">
                  <Check className="w-3.5 h-3.5 text-lime" />
                </div>
                <span className="font-sans text-sm font-medium text-white/80 uppercase tracking-wider">{indicator}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
