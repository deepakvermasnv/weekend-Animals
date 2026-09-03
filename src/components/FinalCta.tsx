import { ArrowRight, MessageSquare } from 'lucide-react';

interface FinalCtaProps {
  googleFormUrl: string;
  whatsappGroupUrl?: string;
}

export default function FinalCta({ googleFormUrl, whatsappGroupUrl }: FinalCtaProps) {
  return (
    <section className="py-14 sm:py-20 bg-slate-100 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-white relative overflow-hidden border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-5xl 2xl:max-w-7xl tv-container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center mx-auto text-2xl sm:text-3xl shadow-xl mb-5 sm:mb-6">
          🏏
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 sm:mb-4 text-slate-900 dark:text-white">
          Ready to Play This Weekend?
        </h2>

        <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto text-xs sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed">
          Join the next match and become part of our local weekend cricket community. Spot reservations fill up quickly!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
          <a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-500 dark:to-green-500 hover:from-emerald-500 hover:to-green-500 text-white dark:text-slate-950 font-black text-base sm:text-lg px-8 sm:px-9 py-3.5 sm:py-4 rounded-2xl shadow-xl hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-1 min-h-[48px]"
          >
            <span>Join Next Match</span>
            <ArrowRight className="w-5 h-5" />
          </a>

          {whatsappGroupUrl && (
            <a
              href={whatsappGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 font-bold text-sm sm:text-base px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl transition-all min-h-[48px]"
            >
              <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Join WhatsApp Group</span>
            </a>
          )}
        </div>

      </div>
    </section>
  );
}
