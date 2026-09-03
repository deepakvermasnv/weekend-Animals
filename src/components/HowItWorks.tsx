import { ClipboardCheck, QrCode, MessageSquare, Trophy, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Join',
      desc: 'Fill out the short registration form with your basic details.',
      icon: ClipboardCheck,
    },
    {
      step: '02',
      title: 'Pay',
      desc: 'Pay the match fee using the QR code provided after registration.',
      icon: QrCode,
    },
    {
      step: '03',
      title: 'Join WhatsApp',
      desc: 'Join the WhatsApp community for ground updates and team details.',
      icon: MessageSquare,
    },
    {
      step: '04',
      title: 'Play',
      desc: 'Come to the ground on weekend morning and enjoy the game!',
      icon: Trophy,
    },
  ];

  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-24 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl 2xl:max-w-[1536px] tv-container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-2.5 sm:space-y-3 mb-10 sm:mb-16">
          <span className="text-[10px] sm:text-xs font-black tracking-widest text-emerald-700 dark:text-emerald-400 uppercase bg-emerald-100 dark:bg-emerald-950/80 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-emerald-300 dark:border-emerald-500/30">
            SIMPLE PROCESS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-black tracking-tight text-slate-900 dark:text-white">How It Works</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-xs sm:text-base">
            From discovering a game to stepping onto the pitch — 4 easy steps.
          </p>

          {/* Visual Step Banner */}
          <div className="pt-3 sm:pt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
            <span>Join</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span>Pay</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span>WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span>Play</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 2xl:gap-10">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 relative flex flex-col justify-between hover:border-emerald-500/40 shadow-sm hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <span className="text-3xl sm:text-4xl font-black text-slate-300 dark:text-slate-700 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
