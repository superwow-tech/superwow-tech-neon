import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'lt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.whatWeDo': 'What We Do',
    'nav.works': 'How We Work',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.close': 'Close',

    'hero.line1': 'WEB & AI',
    'hero.line2': 'SOLUTIONS',
    'hero.subtitle': 'FASTER. SMARTER. AI-POWERED.',

    'marquee.item1': 'AI SOLUTIONS',
    'marquee.item2': 'DESIGN',
    'marquee.item3': 'WEB DEVELOPMENT',
    'marquee.item4': 'DIGITAL ENGINEERING',
    'marquee.item5': 'SOFTWARE STUDIO',

    'build.title': 'What We Build',
    'build.heading': 'Solutions for every business',
    'build.desc': 'Thoughtfully built digital solutions tailored to your goals.',
    'build.service1.num': '01',
    'build.service1.title': 'Websites',
    'build.service1.desc': 'Beautiful, high-performing websites that bring your business online.',
    'build.service2.num': '02',
    'build.service2.title': 'SEO',
    'build.service2.desc': 'Get found more easily and stand out where it matters.',
    'build.service3.num': '03',
    'build.service3.title': 'Branding',
    'build.service3.desc': 'Names and visuals that feel true to your brand.',

    'do.sectionTitle': 'What we do',
    'do.heading': 'Websites designed to bring in clients',
    'do.desc1': 'We create fast, modern websites that present your business clearly and help attract new customers.',
    'do.desc2': 'Most projects go live within just a few days.',

    'do.group1.title': 'Websites',
    'do.group1.desc': 'Professional websites built to showcase your business clearly and turn visitors into clients.',
    'do.group1.item1': 'One-page websites',
    'do.group1.item2': 'Multi-page websites',
    'do.group1.item3': 'Landing pages',

    'do.group2.title': 'Online Stores',
    'do.group2.desc': 'Modern e-commerce stores with smooth payments and easy product management.',
    'do.group2.item1': 'E-commerce websites',
    'do.group2.item2': 'Payment integrations',
    'do.group2.item3': 'Product management',

    'do.group3.title': 'Growth & Optimization',
    'do.group3.desc': 'Smart improvements and tools that help your website perform better and win more clients.',
    'do.group3.item1': 'SEO',
    'do.group3.item2': 'AI integrations',
    'do.group3.item3': 'UX/UI improvements',
    'do.group3.item4': 'Website maintenance',

    'do.trust1': 'Fast launch',
    'do.trust2': 'Mobile-friendly',
    'do.trust3': 'SEO-ready',
    'do.trust4': 'Easy to manage',

    'do.cta': 'Let’s discuss your project',
    'do.cta.sub': 'Most projects are launched within a few days.',

    'works.title': 'HOW IT WORKS',
    'works.heading': 'Simple, clear, and without the extra fuss.',
    'works.step1.num': '01',
    'works.step1.title': 'Quick consultation and needs review',
    'works.step1.tag': 'START',
    'works.step2.num': '02',
    'works.step2.title': 'Design and structure planning',
    'works.step2.tag': 'PLANNING',
    'works.step3.num': '03',
    'works.step3.title': 'Website development (often within one week)',
    'works.step3.tag': 'BUILD',
    'works.step4.num': '04',
    'works.step4.title': 'Handover and launch',
    'works.step4.tag': 'LAUNCH',

    'contact.title': 'Contact',
    'contact.heading1': 'READY TO',
    'contact.heading2': 'START?',
    'contact.desc': 'Tell us about your project. We’ll get back to you within 24 hours.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.sent': 'Message sent!',
    'contact.error': 'Something went wrong — try again',

    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.social': 'Social',
    'footer.links': 'Links',
    'footer.contact': 'Contact Us',
  },
  lt: {
    'nav.whatWeDo': 'Ką darome',
    'nav.works': 'Kaip dirbame',
    'nav.contact': 'Kontaktai',
    'nav.menu': 'Meniu',
    'nav.close': 'Uždaryti',

    'hero.line1': 'WEB & AI',
    'hero.line2': 'SPRENDIMAI',
    'hero.subtitle': 'GREIČIAU. IŠMANIAU. SU AI.',

    'marquee.item1': 'AI SPRENDIMAI',
    'marquee.item2': 'WEB DIZAINAS',
    'marquee.item3': 'SVETAINIŲ KŪRIMAS',
    'marquee.item4': 'KONSULTACIJOS',
    'marquee.item5': 'AUTOMATIZACIJA',

    'build.title': 'Ką kuriame',
    'build.heading': 'Sprendimai kiekvienam verslui',
    'build.desc': 'Apgalvoti skaitmeniniai sprendimai, pritaikyti jūsų verslo tikslams.',
    'build.service1.num': '01',
    'build.service1.title': 'Svetainės',
    'build.service1.desc': 'Kuriame estetiškas ir efektyvias svetaines jūsų verslo įvaizdžiui internete.',
    'build.service2.num': '02',
    'build.service2.title': 'SEO',
    'build.service2.desc': 'Padedame būti lengviau randamiems ir labiau matomiems.',
    'build.service3.num': '03',
    'build.service3.title': 'Prekės ženklas',
    'build.service3.desc': 'Kuriame pavadinimus ir vizualus, kurie atspindi jūsų verslo esmę.',

    'do.sectionTitle': 'Ką mes darome',
    'do.heading': 'Kuriame svetaines, kurios padeda pritraukti klientus',
    'do.desc1': 'Kuriame greitas, modernias svetaines, kurios aiškiai pristato jūsų verslą ir padeda pritraukti naujų klientų.',
    'do.desc2': 'Dauguma projektų startuoja vos per kelias dienas.',

    'do.group1.title': 'Svetainės',
    'do.group1.desc': 'Profesionalios svetainės, sukurtos taip, kad aiškiai pristatytų jūsų verslą ir padėtų paversti lankytojus klientais.',
    'do.group1.item1': 'Vieno puslapio svetainės',
    'do.group1.item2': 'Kelių puslapių svetainės',
    'do.group1.item3': 'Nukreipimo puslapiai',

    'do.group2.title': 'El. parduotuvės',
    'do.group2.desc': 'Modernios el. parduotuvės su sklandžiais atsiskaitymais ir patogiu prekių valdymu.',
    'do.group2.item1': 'El. prekybos svetainės',
    'do.group2.item2': 'Mokėjimų integracijos',
    'do.group2.item3': 'Prekių valdymas',

    'do.group3.title': 'Augimas ir optimizavimas',
    'do.group3.desc': 'Sprendimai ir patobulinimai, padedantys svetainei veikti geriau ir pritraukti daugiau klientų.',
    'do.group3.item1': 'SEO',
    'do.group3.item2': 'AI integracijos',
    'do.group3.item3': 'UX/UI patobulinimai',
    'do.group3.item4': 'Svetainės priežiūra',

    'do.trust1': 'Greitas startas',
    'do.trust2': 'Pritaikyta mobiliesiems',
    'do.trust3': 'Paruošta SEO',
    'do.trust4': 'Lengva valdyti',

    'do.cta': 'Aptarkime jūsų projektą',
    'do.cta.sub': 'Dauguma projektų startuoja per kelias dienas.',

    'works.title': 'KAIP DIRBAME',
    'works.heading': 'Trumpai, aiškiai ir be nereikalingų žingsnių.',
    'works.step1.num': '01',
    'works.step1.title': 'Trumpa konsultacija ir poreikių aptarimas',
    'works.step1.tag': 'PRADŽIA',
    'works.step2.num': '02',
    'works.step2.title': 'Dizaino ir struktūros paruošimas',
    'works.step2.tag': 'PLANAVIMAS',
    'works.step3.num': '03',
    'works.step3.title': 'Svetainės kūrimas (dažnai per vieną savaitę)',
    'works.step3.tag': 'KŪRIMAS',
    'works.step4.num': '04',
    'works.step4.title': 'Perdavimas ir paleidimas',
    'works.step4.tag': 'STARTAS',

    'contact.title': 'Kontaktai',
    'contact.heading1': 'PASIRUOŠĘ',
    'contact.heading2': 'PRADĖTI?',
    'contact.desc': 'Papasakokite apie savo projektą. Atsakysime per 24 valandas.',
    'contact.name': 'Vardas',
    'contact.email': 'El. paštas',
    'contact.message': 'Žinutė',
    'contact.send': 'Siųsti žinutę',
    'contact.sending': 'Siunčiama...',
    'contact.sent': 'Žinutė išsiųsta!',
    'contact.error': 'Įvyko klaida — bandykite dar kartą',

    'footer.rights': 'Visos teisės saugomos.',
    'footer.privacy': 'Privatumo politika',
    'footer.terms': 'Paslaugų teikimo sąlygos',
    'footer.social': 'Socialiniai tinklai',
    'footer.links': 'Nuorodos',
    'footer.contact': 'Susisiekite',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('lt');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
