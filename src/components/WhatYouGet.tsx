import { Calendar, Users, Bell, MessageSquare, HeartHandshake } from 'lucide-react';

export default function WhatYouGet() {
  const benefits = [
    {
      title: 'Weekend Cricket',
      desc: 'Regular opportunities to play cricket every single weekend.',
      icon: Calendar,
    },
    {
      title: 'Meet New Players',
      desc: 'Connect with fellow cricket lovers in your local area and build lasting friendships.',
      icon: Users,
    },
    {
      title: 'Easy Match Updates',
      desc: 'Get clear match information, timing, and venue location all in one place.',
      icon: Bell,
    },
    {
      title: 'WhatsApp Community',
      desc: 'Stay updated on weather, team lists, and ground changes through our community group.',
      icon: MessageSquare,
    },
    {
      title: 'Friendly Environment',
      desc: 'Enjoy competitive cricket with players of different skill levels in a supportive atmosphere.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-900 transition-colors">
      <div className="max-w-7xl 2xl:max-w-[1536px] tv-container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-2.5 sm:space-y-3 mb-10 sm:mb-16">
          <span className="text-[10px] sm:text-xs font-black tracking-widest text-emerald-700 dark:text-emerald-400 uppercase bg-emerald-100 dark:bg-emerald-950/80 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-emerald-300 dark:border-emerald-500/30">
            COMMUNITY BENEFITS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-black tracking-tight text-slate-900 dark:text-white">What You Get</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto text-xs sm:text-base">
            Everything you need for a fun, organized weekend cricket match.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 hover:border-emerald-500/40 shadow-sm hover:shadow-md transition-all space-y-3.5 sm:space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
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
