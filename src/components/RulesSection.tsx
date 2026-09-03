import { Shield, Check } from 'lucide-react';

interface RuleItem {
  id: string;
  text: string;
}

interface RulesSectionProps {
  rules: RuleItem[];
}

export default function RulesSection({ rules }: RulesSectionProps) {
  const defaultRules = [
    'Arrive at the ground 15 minutes before match start time.',
    'Confirm your participation and payment before joining.',
    'Avoid last-minute cancellations (inform organizers at least 24 hours prior).',
    'Respect all fellow players, umpire decisions, and ground equipment.',
    'Keep the ground clean and dispose of water bottles properly.',
    'Play fairly, maintain good sportsmanship, and support everyone.',
    'Follow all instructions provided by the community match organizer.',
  ];

  const ruleList = rules.length > 0 ? rules.map((r) => r.text) : defaultRules;

  return (
    <section id="rules" className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-900 transition-colors">
      <div className="max-w-5xl 2xl:max-w-7xl tv-container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-2.5 sm:space-y-3 mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/30 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-emerald-800 dark:text-emerald-400">
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>PLAYING CODE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-black tracking-tight text-slate-900 dark:text-white">Community Rules</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto text-xs sm:text-base">
            We maintain a safe, friendly, and respectful environment for everyone.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-6">
            {ruleList.map((ruleText, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 sm:space-x-3.5 bg-white dark:bg-slate-950 p-3.5 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/30 transition-colors shadow-xs"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">{ruleText}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
