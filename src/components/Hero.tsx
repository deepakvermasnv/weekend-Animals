import Link from 'next/link';
import { ArrowRight, CheckCircle2, MapPin, Users, Calendar } from 'lucide-react';

interface HeroProps {
  googleFormUrl: string;
  confirmedCount?: number;
  maxPlayers?: number;
}

export default function Hero({ googleFormUrl, confirmedCount, maxPlayers }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white pt-6 sm:pt-14 lg:pt-20 2xl:pt-24 pb-16 lg:pb-24 2xl:pb-28 transition-colors">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 sm:w-96 2xl:w-[500px] h-80 sm:h-96 2xl:h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-20 w-70 sm:w-80 2xl:w-[450px] h-70 sm:h-80 2xl:h-[450px] bg-green-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1536px] tv-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 2xl:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold text-emerald-800 dark:text-emerald-400 shadow-sm max-w-full">
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse shrink-0" />
              <span className="truncate">Weekend Cricket Community • Local Players</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-black tracking-tight leading-tight sm:leading-none text-slate-900 dark:text-white">
              Free This Weekend? <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-600 to-teal-500 dark:from-emerald-400 dark:via-green-300 dark:to-teal-200">
                Come Play Cricket.
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl 2xl:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Join our local weekend cricket community, meet new players and enjoy a game every weekend.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4">
              <a
                href={googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-500 dark:to-green-500 hover:from-emerald-500 hover:to-green-500 text-white dark:text-slate-950 font-black text-base sm:text-lg px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl shadow-xl hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-1 min-h-[50px]"
              >
                <span>Join Next Match</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <Link
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-base px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm transition-all min-h-[50px]"
              >
                <span>How It Works</span>
              </Link>
            </div>

            {/* Trust Info Line */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Weekend Matches</span>
              </div>
              <span className="hidden lg:inline text-slate-300 dark:text-slate-700">•</span>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Open to Different Skill Levels</span>
              </div>
              <span className="hidden lg:inline text-slate-300 dark:text-slate-700">•</span>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Local Cricket Community</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Cricket Badge Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md 2xl:max-w-lg bg-white dark:bg-gradient-to-b dark:from-slate-800/90 dark:to-slate-900/90 border border-slate-200 dark:border-slate-700/80 rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-xl relative group">
              <div className="absolute -top-3 -right-3 bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 font-black text-[10px] sm:text-xs px-3 py-1 rounded-full shadow-lg">
                NEXT GAME
              </div>

              <div className="flex items-center space-x-3.5 sm:space-x-4 mb-5 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center text-2xl sm:text-3xl shrink-0">
                  🏏
                </div>
                <div>
                  <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">Sunday Match Clash</h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Turf Facilities &amp; Heavy Tennis</p>
                </div>
              </div>

              <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center space-x-2.5 sm:space-x-3">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Schedule</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white text-right">Every Sunday Morning</span>
                </div>

                <div className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center space-x-2.5 sm:space-x-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Venue</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white text-right">Local Turf Grounds</span>
                </div>

                {confirmedCount !== undefined && maxPlayers !== undefined && (
                  <div className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30">
                    <div className="flex items-center space-x-2.5 sm:space-x-3">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Roster</span>
                    </div>
                    <span className="font-extrabold text-emerald-700 dark:text-emerald-300 text-right">
                      {confirmedCount} / {maxPlayers} Players Joined
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-5 sm:mt-6 pt-4 text-center">
                <a
                  href={googleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-emerald-700 dark:text-emerald-400 font-bold text-xs sm:text-sm py-3 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  Register via Google Form →
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
