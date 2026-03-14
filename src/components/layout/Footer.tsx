"use client";

import { useState, useEffect } from 'react';

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full bg-card border-t p-4 text-center mt-6">
      <p className="text-sm text-muted-foreground mb-2">
        <span className="font-bold text-destructive">Emergency Numbers:</span> Police: <a href="tel:100" className="font-semibold">100</a> | Ambulance: <a href="tel:102" className="font-semibold">102</a> | Fire: <a href="tel:101" className="font-semibold">101</a>
      </p>
      <p className="text-xs text-muted-foreground">
        © {year} Emergency Sewa. Developed by Prajwol. Not an official government app.
      </p>
    </footer>
  );
};

export default Footer;
