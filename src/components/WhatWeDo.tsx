import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, ShoppingCart, Sparkles } from 'lucide-react';
import shipImg from '@/assets/images/ship.png';
import shipMobileImg from '@/assets/images/ship_mobile.png';

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

  useGSAP(() => {
    gsap.from(".do-content", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      clearProps: "transform",
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });
  }, { scope: container });

  return (
    <section id="do" ref={container} className="pt-32 pb-16 md:pt-48 md:pb-24 bg-charcoal text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16 lg:gap-24">
        
        {/* Top Content - Full Width */}
        <div className="w-full flex flex-col">
          <div className="do-content mb-8 lg:mb-12">
            <h2 className="font-sans text-sm font-bold tracking-widest uppercase text-white/50">{t('do.sectionTitle')}</h2>
          </div>

          <div className="do-content">
            <h3 className="font-display text-4xl md:text-5xl lg:text-7xl font-normal leading-[1.1] tracking-normal mb-8 lg:mb-12">
              {t('do.heading')}
            </h3>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-12 w-full">
            <p className="font-sans text-lg text-white/70 flex-1 leading-relaxed">
              {t('do.desc1')}
            </p>
            <p className="font-sans text-lg text-white/70 flex-1 leading-relaxed">
              {t('do.desc2')}
            </p>
          </div>
        </div>

        {/* Bottom Content - Image + Services Grid */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          {/* Left Column - Image */}
          <div className="w-full md:w-1/3 flex flex-col items-center justify-start relative">
            <div className="do-content relative w-full sm:max-w-sm mx-auto md:max-w-none md:mx-0 rounded-2xl overflow-hidden bg-charcoal/50 flex flex-col items-center justify-center">
              <picture className="w-full">
                <source media="(min-width: 768px)" srcSet={shipImg} />
                <img src={shipMobileImg} alt="Ship" className="w-full h-auto object-contain" />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
            </div>
          </div>

          {/* Right Column - Services & Trust */}
          <div className="w-full md:w-2/3 flex flex-col">
            <div className="flex flex-col mb-12">
              {serviceGroups.map((group, i) => (
                <div
                  key={i}
                  className="py-8 border-t border-white/10 first:border-t-0 transition-all duration-300 group"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-6">
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


          </div>
        </div>
      </div>
    </section>
  );
}
