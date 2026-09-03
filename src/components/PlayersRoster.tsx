import { ShieldCheck, UserCheck } from 'lucide-react';

interface PlayersRosterProps {
  publicPlayers: string[];
  confirmedCount: number;
}

export default function PlayersRoster({ publicPlayers, confirmedCount }: PlayersRosterProps) {
  return (
    <section id="players" className="py-12 sm:py-16 lg:py-24 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl 2xl:max-w-[1536px] tv-container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-2.5 sm:space-y-3 mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/30 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-extrabold text-emerald-800 dark:text-emerald-400">
            <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>CONFIRMED SQUAD ROSTER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-black tracking-tight text-slate-900 dark:text-white">Players Joining This Match</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto text-xs sm:text-base">
            <strong className="text-emerald-700 dark:text-emerald-400 font-extrabold">{confirmedCount} Players</strong> have confirmed their participation for the upcoming match.
          </p>
        </div>

        {publicPlayers.length > 0 ? (
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-3 sm:gap-4">
              {publicPlayers.map((name, i) => (
                <div
                  key={i}
                  className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 p-2.5 sm:p-3.5 rounded-2xl flex items-center space-x-2.5 sm:space-x-3 transition-colors shadow-xs"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-black text-xs flex items-center justify-center shrink-0">
                    {name.charAt(0)}
                  </div>
                  <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 truncate">{name}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-6 pt-4 border-t border-slate-100 dark:border-slate-900 flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Only verified confirmed player names are displayed publicly. Private contact information is protected.</span>
            </p>
          </div>
        ) : (
          <div className="text-center p-6 sm:p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Be the first player to register and confirm your spot!</p>
          </div>
        )}

      </div>
    </section>
  );
}
