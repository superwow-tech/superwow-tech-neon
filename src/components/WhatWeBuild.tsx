import { useLanguage } from '../context/LanguageContext';

export default function WhatWeBuild() {
  const { t } = useLanguage();

  const items = [
    t('marquee.item1'),
    t('marquee.item2'),
    t('marquee.item3'),
    t('marquee.item4'),
    t('marquee.item5'),
    t('marquee.item6'),
    t('marquee.item7'),
  ];

  // Duplicate items to ensure smooth infinite scrolling
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <section id="build" className="w-full bg-[#110F1B] py-6 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {marqueeItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="text-white font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-widest uppercase px-6">
              {item}
            </span>
            <span className="text-lime font-display text-2xl md:text-3xl lg:text-4xl font-bold px-2">
              /
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
