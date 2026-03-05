import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function CTA() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 3000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-charcoal text-white flex flex-col justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(203,246,104,0.1)_0%,transparent_70%)] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col md:flex-row items-start justify-between gap-12 md:gap-24 text-left"
      >
        <div className="flex-1">
          <motion.div variants={itemVariants} className="mb-6 md:mb-8">
            <h2 className="font-sans text-xs md:text-sm tracking-[0.2em] uppercase text-white/50">{t('contact.title')}</h2>
          </motion.div>
          <motion.h3 variants={itemVariants} className="font-display text-[18vw] md:text-[12vw] leading-[0.85] tracking-tighter uppercase mb-6 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            {t('contact.heading1')} <br/><span className="text-lime">{t('contact.heading2')}</span>
          </motion.h3>

          <motion.p variants={itemVariants} className="font-sans text-base md:text-xl text-white/70 max-w-2xl mb-12 md:mb-0">
            {t('contact.desc')}
          </motion.p>
        </div>

        <motion.form variants={itemVariants} onSubmit={handleSubmit} className="w-full md:w-1/2 max-w-md flex flex-col gap-4 text-left">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-sans text-xs uppercase tracking-widest text-white/50 ml-4">{t('contact.name')}</label>
            <input 
              type="text" 
              id="name" 
              required
              className="bg-white/5 rounded-full px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-lime transition-all"
              placeholder="John Doe"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-sans text-xs uppercase tracking-widest text-white/50 ml-4">{t('contact.email')}</label>
            <input 
              type="email" 
              id="email" 
              required
              className="bg-white/5 rounded-full px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-lime transition-all"
              placeholder="john@example.com"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="font-sans text-xs uppercase tracking-widest text-white/50 ml-4">{t('contact.message')}</label>
            <textarea 
              id="message" 
              required
              rows={4}
              className="bg-white/5 rounded-3xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-lime transition-all resize-none"
              placeholder="..."
            />
          </div>
          
          <motion.button 
            type="submit" 
            disabled={formState !== 'idle'}
            animate={
              formState === 'success' 
                ? { scale: [1, 1.05, 1], backgroundColor: ['#cbf668', '#4ade80', '#cbf668'] } 
                : { scale: 1, backgroundColor: '#cbf668' }
            }
            transition={{ duration: 0.5 }}
            className="mt-4 relative inline-block text-charcoal font-display text-xl uppercase px-10 py-5 rounded-full hover:scale-105 transition-transform disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed text-center overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={formState}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {formState === 'idle' && t('contact.send')}
                {formState === 'submitting' && t('contact.sending')}
                {formState === 'success' && t('contact.sent')}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
}
