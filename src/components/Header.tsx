'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

interface HeaderProps {
  googleFormUrl?: string;
  communityName?: string;
}

export default function Header({ googleFormUrl = '#', communityName = 'Weekend Animal' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white'
            : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white shadow-sm'
        }`}
      >
        <div className="max-w-7xl 2xl:max-w-[1536px] tv-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3 group min-h-[44px] py-1 shrink-0 mr-4 xl:mr-8">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
                <span className="text-lg sm:text-xl font-black text-slate-950">🏏</span>
              </div>
              <div className="flex flex-col shrink-0">
                <span className="font-extrabold text-base sm:text-lg xl:text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {communityName}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium hidden xs:inline">Local Weekend Community</span>
              </div>
            </Link>

            {/* Desktop Navigation (Visible on xl 1280px+) */}
            <nav className="hidden xl:flex items-center space-x-6 2xl:space-x-8 text-xs 2xl:text-sm font-semibold text-slate-600 dark:text-slate-300">
              <Link href="#home" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2">
                Home
              </Link>
              <Link href="#next-match" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2">
                Next Match
              </Link>
              <Link href="#how-it-works" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2">
                How It Works
              </Link>
              <Link href="#players" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2">
                Players
              </Link>
              <Link href="#ground" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2">
                Ground
              </Link>
              <Link href="#faq" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2">
                FAQ
              </Link>
            </nav>

            {/* Desktop Right CTAs + ThemeToggle (Visible on xl 1280px+) */}
            <div className="hidden xl:flex items-center space-x-3 2xl:space-x-4 shrink-0">
              <ThemeToggle />
              <Link
                href="/payment"
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 px-3.5 py-2 rounded-lg border border-emerald-500/30 hover:border-emerald-500/60 transition-all min-h-[38px] flex items-center"
              >
                Pay Fee
              </Link>
              <a
                href={googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold px-4 2xl:px-5 py-2.5 rounded-xl shadow-md hover:shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 text-xs 2xl:text-sm min-h-[42px]"
              >
                <span>Join Next Match</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile & Tablet Navigation Trigger (Visible < xl 1280px) */}
            <div className="flex xl:hidden items-center space-x-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center border border-slate-200 dark:border-slate-700"
                aria-label="Toggle Navigation Menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile & Tablet Navigation Drawer (< xl 1280px) */}
        {isMenuOpen && (
          <div className="xl:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 pt-3 pb-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl">
            
            {/* Theme Toggle inside Drawer */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">Theme Preference</span>
              <ThemeToggle />
            </div>

            <nav className="flex flex-col space-y-1 font-semibold text-slate-700 dark:text-slate-200 text-sm">
              <Link href="#home" onClick={() => setIsMenuOpen(false)} className="py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span>Home</span>
                <span className="text-xs text-slate-400">→</span>
              </Link>
              <Link href="#next-match" onClick={() => setIsMenuOpen(false)} className="py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span>Next Match</span>
                <span className="text-xs text-slate-400">→</span>
              </Link>
              <Link href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span>How It Works</span>
                <span className="text-xs text-slate-400">→</span>
              </Link>
              <Link href="#players" onClick={() => setIsMenuOpen(false)} className="py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span>Players Roster</span>
                <span className="text-xs text-slate-400">→</span>
              </Link>
              <Link href="#ground" onClick={() => setIsMenuOpen(false)} className="py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span>Ground Location</span>
                <span className="text-xs text-slate-400">→</span>
              </Link>
              <Link href="#rules" onClick={() => setIsMenuOpen(false)} className="py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span>Community Rules</span>
                <span className="text-xs text-slate-400">→</span>
              </Link>
              <Link href="#faq" onClick={() => setIsMenuOpen(false)} className="py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span>FAQ</span>
                <span className="text-xs text-slate-400">→</span>
              </Link>
              <Link href="/payment" onClick={() => setIsMenuOpen(false)} className="py-2.5 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-between">
                <span>Pay Fee via UPI QR</span>
                <span className="text-xs text-emerald-500">→</span>
              </Link>
            </nav>

            <div className="pt-2 flex flex-col space-y-2">
              <a
                href={googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 text-center font-extrabold py-3.5 rounded-xl shadow-lg flex items-center justify-center space-x-2 text-sm min-h-[48px]"
              >
                <span>Join Next Match</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Sticky Bottom Bar for Mobile & Tablet (< xl 1280px) */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-3 shadow-2xl flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Weekend Match</span>
          <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">Open For Joining</span>
        </div>
        <a
          href={googleFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl shadow-lg flex items-center space-x-1.5 min-h-[40px]"
        >
          <span>JOIN NOW</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </>
  );
}
