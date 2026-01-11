const Footer = () => {
  return (
    <footer className="w-full bg-white/95 py-2 text-center shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <p className="py-2 text-sm font-semibold text-destructive">
            Emergency: Police 100 | Ambulance 102 | Fire 101
        </p>
        <div className="copyright-ticker bg-gray-800 py-2 overflow-hidden relative">
            <div className="ticker-content animate-scroll-left inline-block whitespace-nowrap text-white text-sm font-medium">
                <span>© 2026 Nepal Health & Emergency Finder - Developed by Prajwol</span>
                <span className="ticker-separator mx-8 text-destructive">●</span>
                <span>For Emergency: Call 100 (Police), 102 (Ambulance), 101 (Fire)</span>
                <span className="ticker-separator mx-8 text-destructive">●</span>
                 <span>© 2026 Nepal Health & Emergency Finder - Developed by Prajwol</span>
                <span className="ticker-separator mx-8 text-destructive">●</span>
                <span>For Emergency: Call 100 (Police), 102 (Ambulance), 101 (Fire)</span>
                 <span className="ticker-separator mx-8 text-destructive">●</span>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
