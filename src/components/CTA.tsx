import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function CTA() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { t, language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from_name: name, from_email: email, message, language }),
      });

      if (!res.ok) throw new Error('Failed to send');

      setFormState('success');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setFormState('idle'), 3000);
    } catch {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 3000);
    }
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
    <section id="contact" className="py-24 md:py-32 bg-charcoal text-white flex flex-col justify-center relative overflow-hidden">
      {/* Background soft glowing blobs combining neon lime and pink */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-between opacity-70">
        <div className="w-[30vw] h-[60%] md:h-[80%] bg-pink/20 rounded-full blur-[100px] md:blur-[150px] -translate-x-1/2" />
        <div className="w-[30vw] h-[60%] md:h-[80%] bg-lime/20 rounded-full blur-[100px] md:blur-[150px] translate-x-1/2" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16 lg:gap-24 text-left"
      >
        {/* Left Column - Massive Text */}
        <div className="flex-1 w-full lg:w-3/5 flex flex-col lg:justify-between min-h-0 lg:min-h-[400px]">
          <motion.div variants={itemVariants} className="mb-8 lg:mb-12">
            <h2 className="font-sans text-sm font-bold tracking-widest uppercase text-white/50">{t('contact.title')}</h2>
          </motion.div>
          
          <div className="mt-8 lg:mt-auto">
            <motion.h3 variants={itemVariants} className="font-['League_Gothic'] text-[clamp(4.5rem,14vw,220px)] lg:text-[clamp(5rem,14vw,220px)] leading-[0.8] tracking-normal uppercase mb-8 md:mb-16 whitespace-nowrap">
              <span className="text-white block">{t('contact.heading1')}</span>
              <span className="text-lime block">{t('contact.heading2')}</span>
            </motion.h3>

            <motion.p variants={itemVariants} className="font-sans text-base md:text-lg text-white/70">
              {t('contact.desc')}
            </motion.p>
          </div>
        </div>

        {/* Right Column - Minimal Form */}
        <motion.form variants={itemVariants} onSubmit={handleSubmit} className="w-full lg:w-2/5 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-sans text-xs font-semibold uppercase tracking-widest text-white/70 ml-4">{t('contact.name')}</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/5 rounded-full px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-lime transition-all font-sans text-sm md:text-base"
              placeholder="John Doe"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-sans text-xs font-semibold uppercase tracking-widest text-white/70 ml-4">{t('contact.email')}</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 rounded-full px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-lime transition-all font-sans text-sm md:text-base"
              placeholder="john@example.com"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-sans text-xs font-semibold uppercase tracking-widest text-white/70 ml-4">{t('contact.message')}</label>
            <textarea
              id="message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-white/5 rounded-3xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-lime transition-all resize-none font-sans text-sm md:text-base"
              placeholder="..."
            />
          </div>

          <div className="w-full mt-4">
            <motion.button
              type="submit"
              disabled={formState !== 'idle'}
              animate={
                formState === 'success'
                  ? { scale: [1, 1.02, 1], backgroundColor: ['#cbf668', '#4ade80', '#cbf668'] }
                  : formState === 'error'
                  ? { scale: [1, 1.02, 1], backgroundColor: ['#cbf668', '#f87171', '#cbf668'] }
                  : { scale: 1, backgroundColor: '#cbf668' }
              }
              transition={{ duration: 0.5 }}
              className="w-full relative block text-charcoal font-display font-semibold text-lg uppercase px-12 py-5 rounded-full hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed overflow-hidden text-center"
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
                  {formState === 'error' && t('contact.error')}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </section>
  );
}
