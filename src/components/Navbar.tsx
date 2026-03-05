import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const links = [
    { name: t('nav.whatWeDo'), href: "#do" },
    { name: t('nav.works'), href: "#works" },
    { name: t('nav.contact'), href: "#contact" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setIsOpen(false);
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: target, autoKill: true },
      ease: "power3.inOut"
    });
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'lt' : 'en');
  };

  return (
    <div className="fixed top-4 left-4 right-4 z-50 flex justify-center pointer-events-none">
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center justify-between bg-white/5 backdrop-blur-md rounded-full px-8 py-4 w-full max-w-6xl pointer-events-auto">
        <motion.a
          href="#home"
          onClick={(e) => handleScroll(e, '#home')}
          className="font-display text-2xl font-normal tracking-normal text-white uppercase hover:text-lime transition-colors"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Superwow <span className="text-lime">Tech</span>
        </motion.a>
        <div className="flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="font-sans text-sm uppercase tracking-widest text-white/70 hover:text-lime transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={toggleLanguage}
            className="font-sans text-sm font-bold uppercase tracking-widest text-lime hover:text-white transition-colors"
          >
            {language === 'en' ? 'LT' : 'EN'}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <motion.nav
        initial={false}
        animate={{ height: isOpen ? 'auto' : '64px' }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        className="md:hidden w-full bg-white/5 backdrop-blur-md rounded-[2rem] overflow-hidden pointer-events-auto relative"
      >
        <div className="flex items-center justify-between h-[64px] px-6">
          <motion.a
            href="#home"
            onClick={(e) => handleScroll(e, '#home')}
            className="font-display text-xl font-normal tracking-normal text-white uppercase hover:text-lime transition-colors"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Superwow <span className="text-lime">Tech</span>
          </motion.a>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="font-sans text-sm font-bold uppercase tracking-widest text-lime hover:text-white transition-colors"
            >
              {language === 'en' ? 'LT' : 'EN'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/70 hover:text-lime transition-colors font-sans text-sm uppercase tracking-widest w-[60px] flex justify-end overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={isOpen ? 'close' : 'menu'}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  {isOpen ? t('nav.close') : t('nav.menu')}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                closed: { opacity: 0, transition: { staggerChildren: 0.03, staggerDirection: -1 } }
              }}
              className="flex flex-col px-6 pb-8 pt-2 gap-6 text-right relative"
            >
              {links.map((link) => (
                <motion.div
                  key={link.name}
                  className="relative z-10"
                  variants={{
                    open: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
                    closed: { y: 10, opacity: 0, transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] } }
                  }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="font-sans text-lg uppercase tracking-widest text-white/70 hover:text-lime transition-colors block"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
