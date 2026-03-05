import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function WhyUs() {
  const container = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const steps = [
    { num: t('works.step1.num'), title: t('works.step1.title'), tag: t('works.step1.tag') },
    { num: t('works.step2.num'), title: t('works.step2.title'), tag: t('works.step2.tag') },
    { num: t('works.step3.num'), title: t('works.step3.title'), tag: t('works.step3.tag') },
    { num: t('works.step4.num'), title: t('works.step4.title'), tag: t('works.step4.tag') },
  ];

  useGSAP(() => {
    const items = gsap.utils.toArray('.step-item');

    items.forEach((item: any) => {
      gsap.from(item, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
        }
      });
    });
  }, { scope: container });

  return (
    <section id="works" ref={container} className="py-16 md:py-24 bg-charcoal text-white flex flex-col justify-center relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="mb-16 md:mb-24">
          <h2 className="font-sans text-4xl md:text-5xl font-normal tracking-tight mb-4 text-left">
            {t('works.title')}
          </h2>
          <p className="font-sans text-base md:text-lg text-white/50">
            {t('works.heading')}
          </p>
        </div>

        <div className="flex flex-col">
          {steps.map((step, i) => (
            <div
              key={i}
              className="step-item flex flex-col md:flex-row md:items-center justify-between py-8 md:py-10 border-b border-white/10 group transition-colors"
            >
              <div className="flex items-center gap-8 md:gap-16 mb-4 md:mb-0">
                <span className="font-sans text-5xl md:text-6xl font-light text-white/20 group-hover:text-white/40 transition-colors">
                  {step.num}
                </span>
                <h3 className="font-sans text-xl md:text-2xl font-medium">
                  {step.title}
                </h3>
              </div>
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 md:text-right">
                {step.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
