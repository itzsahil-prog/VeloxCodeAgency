
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';


const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Blog', path: '/blog' },
  { name: 'Team', path: '/team' },
  { name: 'Contact', path: '/contact' },
];

const CustomSVGLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 24 20 L 38 20 L 50 50 L 51 47.5 L 58 65 L 50 85 Z" fill="#F27C38" />
    <polygon points="54 40, 61 57.5, 67 42.5, 60 25" fill="#1E3A5F" />
    <polygon points="62 20, 76 20, 70 35, 64 20" fill="#1E3A5F" />
  </svg>
);

const Logo = () => (
  <div className="flex items-center space-x-3 group">
    <div className="relative h-12 w-12 flex items-center justify-center bg-white rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,212,255,0.3)] p-1 transform group-hover:scale-110 transition-transform duration-300">
      <CustomSVGLogo />
    </div>
    <span className="font-heading font-bold text-2xl tracking-tight">
      Velox<span className="text-primary">CodeAgency</span>
    </span>
  </div>
);

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="relative text-sm font-medium hover:text-primary transition-colors py-2"
            >
              {item.name}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </Link>
          ))}
          <Link
            to="/dashboard"
            className="px-5 py-2.5 bg-surface border border-white/10 rounded-full text-sm font-semibold hover:border-primary transition-all active:scale-95"
          >
            Client Dashboard
          </Link>
        </div>

        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};
