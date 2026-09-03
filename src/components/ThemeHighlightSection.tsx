'use client';

import { Sun, Moon, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';

interface ThemeHighlightSectionProps {
  googleFormUrl?: string;
}

export default function ThemeHighlightSection({ googleFormUrl = '#' }: ThemeHighlightSectionProps) {
  const { theme } = useTheme();

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800 transition-colors relative overflow-hidden">
      
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1536px] tv-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-14 shadow-2xl space-y-10 sm:space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3.5 max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/30 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-extrabold text-emerald-800 dark:text-emerald-400 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>THEME HIGHLIGHT • LIGHT &amp; DARK MODES</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Play In Day Light or Night Floodlights. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 dark:from-emerald-400 dark:via-green-300 dark:to-teal-200">
                Designed For Every Mood.
              </span>
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-base lg:text-lg leading-relaxed">
              Switch seamlessly between a clean, bright Light theme and a high-contrast Dark theme. Your preference persists automatically across all devices.
            </p>

            {/* Interactive Theme Switcher Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Try Switching Themes Live:</span>
              <ThemeToggle className="scale-110 shadow-md" />
            </div>
          </div>

          {/* Interactive Mode Highlight Showcase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            
            {/* Light Mode Highlight Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 text-slate-900 shadow-md relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-600">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-900">Light Mode</h3>
                    <span className="text-[11px] font-semibold text-slate-500">Bright Morning Match Vibe</span>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Daytime
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2 shadow-xs text-xs text-slate-700">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Sunday Morning Match</span>
                  <span className="text-emerald-600">07:00 AM</span>
                </div>
                <p className="text-slate-500 text-[11px]">Crisp high-contrast layout for reading under direct sunlight on the pitch.</p>
              </div>

              <ul className="space-y-2 text-xs font-medium text-slate-600">
                <li className="flex items-center space-x-2">
                  <Zap className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Ultra-clean white backdrop with vibrant emerald accents</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Optimal readability outdoors in direct sunlight</span>
                </li>
              </ul>
            </div>

            {/* Dark Mode Highlight Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-white shadow-xl relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Moon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-white">Dark Mode</h3>
                    <span className="text-[11px] font-semibold text-slate-400">Night Turf &amp; Evening Match Vibe</span>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                  Nighttime
                </span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 shadow-xs text-xs text-slate-300">
                <div className="flex justify-between font-bold text-white">
                  <span>Floodlight Night Match</span>
                  <span className="text-emerald-400">08:00 PM</span>
                </div>
                <p className="text-slate-400 text-[11px]">Sleek OLED dark background designed to reduce eye strain during night strategy.</p>
              </div>

              <ul className="space-y-2 text-xs font-medium text-slate-300">
                <li className="flex items-center space-x-2">
                  <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Deep slate dark theme with neon emerald highlights</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Low-light comfort for night match check-ins</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Dedicated CTA Row with JOIN NOW button */}
          <div className="pt-4 text-center space-y-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              Ready to Step Onto the Pitch?
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-500 dark:to-green-500 hover:from-emerald-500 hover:to-green-500 text-white dark:text-slate-950 font-black text-base sm:text-lg px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl shadow-xl hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-1 min-h-[50px]"
              >
                <span>JOIN NOW</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
              Instant Google Form Registration • Pay Fee via UPI QR Code
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
