export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white pt-12 pb-8 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
          {/* Brand */}
          <div className="max-w-sm">
            <h2 className="font-display text-2xl font-bold tracking-tighter text-white uppercase mb-4">
              Superwow <span className="text-lime">Tech</span>
            </h2>
            <p className="text-white/60 text-sm mb-6 uppercase tracking-widest">
              FASTER, SMARTER AND POWERED BY AI
            </p>
          </div>

          {/* Contact */}
          <div className="md:text-right flex flex-col md:items-end">
            <h3 className="font-display text-xl mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a href="mailto:hello@superwow.tech" className="hover:text-lime transition-colors">
                  hello@superwow.tech
                </a>
              </li>
              <li>Vilnius, Lithuania</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>&copy; {currentYear} SUPERWOW TECH. All rights reserved.</p>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-lime/5 blur-[120px] rounded-full pointer-events-none" />
    </footer>
  );
}
