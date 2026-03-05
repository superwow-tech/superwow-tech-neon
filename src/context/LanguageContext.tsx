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
    'nav.works': 'How it works',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    
    'hero.line1': 'WeB & Ai',
    'hero.line2': 'SoLuTiOnS',
    'hero.subtitle': 'FaStEr. SmArTeR. Ai-PoWeReD.',
    
    'marquee.item1': 'SOLUTIONS',
    'marquee.item2': 'UI/UX DESIGN',
    'marquee.item3': 'WEB DEVELOPMENT',
    'marquee.item4': 'DIGITAL ENGINEERING',
    'marquee.item5': 'SOFTWARE STUDIO',
    'marquee.item6': 'TECHNICAL CONSULTING',
    'marquee.item7': 'AI AUTOMATION',
    
    'build.title': 'What We Build',
    'build.heading': 'Solutions for every business',
    'build.desc': 'Innovation-driven solutions tailored to your needs.',
    'build.service1.num': '01',
    'build.service1.title': 'Websites',
    'build.service1.desc': 'Art with code. We build your virtual presence.',
    'build.service2.num': '02',
    'build.service2.title': 'SEO',
    'build.service2.desc': 'Stand out from the crowd and rank higher.',
    'build.service3.num': '03',
    'build.service3.title': 'Branding',
    'build.service3.desc': 'Names and logos that reflect your core identity.',
    
    'do.sectionTitle': 'What we do',
    'do.heading': 'Websites designed to bring you clients.',
    'do.desc1': 'Fast, modern websites that clearly present your business and help attract new customers.',
    'do.desc2': 'Most projects are launched in just a few days.',
    
    'do.group1.title': 'Websites',
    'do.group1.desc': 'Professional websites designed to clearly present your business and attract customers.',
    'do.group1.item1': 'One-page websites',
    'do.group1.item2': 'Multi-page websites',
    'do.group1.item3': 'Landing pages',
    
    'do.group2.title': 'Online Stores',
    'do.group2.desc': 'Modern online stores with seamless payments and easy product management.',
    'do.group2.item1': 'E-commerce websites',
    'do.group2.item2': 'Payment integrations',
    'do.group2.item3': 'Product management',
    
    'do.group3.title': 'Growth & Optimization',
    'do.group3.desc': 'Tools and improvements that help your website perform better and attract more clients.',
    'do.group3.item1': 'SEO',
    'do.group3.item2': 'AI integrations',
    'do.group3.item3': 'UX/UI improvements',
    'do.group3.item4': 'Website maintenance',
    
    'do.trust1': 'Fast launch',
    'do.trust2': 'Mobile-optimized',
    'do.trust3': 'SEO-ready',
    'do.trust4': 'Easy to manage',
    
    'do.cta': 'Discuss your project',
    'do.cta.sub': 'Most projects launch within a few days.',
    
    'works.title': 'HOW IT WORKS',
    'works.heading': 'Short, clear, without unnecessary steps.',
    'works.step1.num': '01',
    'works.step1.title': 'Brief consultation and needs assessment',
    'works.step1.tag': 'START',
    'works.step2.num': '02',
    'works.step2.title': 'Design and structure preparation',
    'works.step2.tag': 'PLANNING',
    'works.step3.num': '03',
    'works.step3.title': 'Website development (often in one week)',
    'works.step3.tag': 'DEVELOPMENT',
    'works.step4.num': '04',
    'works.step4.title': 'Handover and launch',
    'works.step4.tag': 'FINISH',
    
    'contact.title': 'Contact',
    'contact.heading1': 'ReAdY tO',
    'contact.heading2': 'StArT?',
    'contact.desc': 'Tell us about your project. We reply within 24h.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.sent': 'Message Sent!',
    
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.social': 'Social',
    'footer.links': 'Links',
    'footer.contact': 'Contact Us',
  },
  lt: {
    'nav.whatWeDo': 'Ką Darome',
    'nav.works': 'Kaip dirbame',
    'nav.contact': 'Kontaktai',
    'nav.menu': 'Meniu',
    'nav.close': 'Uždaryti',
    
    'hero.line1': 'WeB & Ai',
    'hero.line2': 'SpReNdImAi',
    'hero.subtitle': 'GrEiTiau. GuDrIau. VaRoMi Ai.',
    
    'marquee.item1': 'SPRENDIMAI',
    'marquee.item2': 'UI/UX DIZAINAS',
    'marquee.item3': 'TINKLAPIŲ KŪRIMAS',
    'marquee.item4': 'SKAITMENINĖ INŽINERIJA',
    'marquee.item5': 'PROGRAMINĖS ĮRANGOS STUDIJA',
    'marquee.item6': 'TECHNINĖS KONSULTACIJOS',
    'marquee.item7': 'AI AUTOMATIZACIJA',
    
    'build.title': 'Ką Kuriame',
    'build.heading': 'Sprendimai kiekvienam verslui',
    'build.desc': 'Inovatyvūs sprendimai ir gili aistra kūrybai.',
    'build.service1.num': '01',
    'build.service1.title': 'Svetainės',
    'build.service1.desc': 'Menas kodais. Kuriame jūsų virtualų įvaizdį.',
    'build.service2.num': '02',
    'build.service2.title': 'SEO',
    'build.service2.desc': 'Išsiskirkite iš minios ir būkite matomi.',
    'build.service3.num': '03',
    'build.service3.title': 'Prekės ženklas',
    'build.service3.desc': 'Kuriame vardus ir logotipus, atspindinčius jūsų identitetą.',
    
    'do.sectionTitle': 'Ką mes darome',
    'do.heading': 'Kuriame modernias ir aiškios struktūros svetaines, kurios padeda jūsų verslui būti matomam internete.',
    'do.desc1': 'Greitos, modernios svetainės, kurios aiškiai pristato jūsų verslą ir padeda pritraukti naujų klientų.',
    'do.desc2': 'Dauguma projektų paleidžiami vos per kelias dienas.',
    
    'do.group1.title': 'Svetainės',
    'do.group1.desc': 'Profesionalios svetainės, sukurtos aiškiai pristatyti jūsų verslą ir pritraukti klientus.',
    'do.group1.item1': 'Vieno puslapio svetainės',
    'do.group1.item2': 'Kelių puslapių svetainės',
    'do.group1.item3': 'Nukreipimo puslapiai',
    
    'do.group2.title': 'El. parduotuvės',
    'do.group2.desc': 'Modernios internetinės parduotuvės su sklandžiais mokėjimais ir lengvu prekių valdymu.',
    'do.group2.item1': 'El. prekybos svetainės',
    'do.group2.item2': 'Mokėjimų integracijos',
    'do.group2.item3': 'Prekių valdymas',
    
    'do.group3.title': 'Augimas ir optimizacija',
    'do.group3.desc': 'Įrankiai ir patobulinimai, padedantys jūsų svetainei veikti geriau ir pritraukti daugiau klientų.',
    'do.group3.item1': 'SEO',
    'do.group3.item2': 'AI integracijos',
    'do.group3.item3': 'UX/UI patobulinimai',
    'do.group3.item4': 'Svetainės priežiūra',
    
    'do.trust1': 'Greitas paleidimas',
    'do.trust2': 'Pritaikyta mobiliesiems',
    'do.trust3': 'Paruošta SEO',
    'do.trust4': 'Lengva valdyti',
    
    'do.cta': 'Aptarti jūsų projektą',
    'do.cta.sub': 'Dauguma projektų paleidžiami per kelias dienas.',
    
    'works.title': 'KAIP VYKSTA DARBAS',
    'works.heading': 'Trumpa, aišku, be bereikalingų etapų.',
    'works.step1.num': '01',
    'works.step1.title': 'Trumpa konsultacija ir poreikių aptarimas',
    'works.step1.tag': 'PRADŽIA',
    'works.step2.num': '02',
    'works.step2.title': 'Dizaino ir struktūros paruošimas',
    'works.step2.tag': 'PLANAVIMAS',
    'works.step3.num': '03',
    'works.step3.title': 'Svetainės sukūrimas (dažnai per vieną savaitę)',
    'works.step3.tag': 'KŪRIMAS',
    'works.step4.num': '04',
    'works.step4.title': 'Perdavimas ir paleidimas',
    'works.step4.tag': 'PABAIGA',
    
    'contact.title': 'Kontaktai',
    'contact.heading1': 'PaSiRuoŠę',
    'contact.heading2': 'PrAdĖtI?',
    'contact.desc': 'Papasakokite apie projektą. Atsakome per 24 val.',
    'contact.name': 'Vardas',
    'contact.email': 'El. paštas',
    'contact.message': 'Žinutė',
    'contact.send': 'Siųsti Žinutę',
    'contact.sending': 'Siunčiama...',
    'contact.sent': 'Žinutė Išsiųsta!',
    
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
