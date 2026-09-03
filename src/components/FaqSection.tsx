'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: FaqItem[];
}

export default function FaqSection({ faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const defaultFaqs = [
    {
      id: '1',
      question: 'Who can join the weekend cricket community?',
      answer: 'Anyone who loves cricket! Whether you are a beginner, casual weekend player, or experienced cricketer, you are warmly welcome to join.',
    },
    {
      id: '2',
      question: 'Do I need to be a professional cricket player?',
      answer: 'Not at all! Our matches are friendly and open to all skill levels. We balance teams fairly so everyone gets to bat and bowl.',
    },
    {
      id: '3',
      question: 'How much does a match cost?',
      answer: 'The fee is usually ₹150 per player per match, which covers ground booking, turf fees, quality cricket balls, water, and equipment maintenance.',
    },
    {
      id: '4',
      question: 'How do I pay?',
      answer: 'After filling out the registration form, you can pay using any UPI app (Google Pay, PhonePe, Paytm) by scanning the QR code on our Payment page.',
    },
    {
      id: '5',
      question: 'How do I join the WhatsApp group?',
      answer: 'Click the "Join WhatsApp Community" button on our website after submitting your registration. Match announcements and ground updates are shared in the group.',
    },
    {
      id: '6',
      question: 'What happens when a match is full?',
      answer: 'When maximum capacity is reached (e.g. 22 players), registration switches to a waitlist. If a confirmed player cancels, waitlisted players are promoted in order.',
    },
    {
      id: '7',
      question: 'What if I cannot attend after registering?',
      answer: 'Please inform the admin on WhatsApp at least 24 hours before match start so your spot can be assigned to a player on the waiting list.',
    },
    {
      id: '8',
      question: 'Where will the matches take place?',
      answer: 'Matches are played at local turf grounds and stadiums in your city. Exact ground address and Google Maps links are listed in the Next Match section.',
    },
  ];

  const list = faqs.length > 0 ? faqs : defaultFaqs;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 lg:py-24 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-4xl 2xl:max-w-6xl tv-container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-2.5 sm:space-y-3 mb-10 sm:mb-16">
          <span className="text-[10px] sm:text-xs font-black tracking-widest text-emerald-700 dark:text-emerald-400 uppercase bg-emerald-100 dark:bg-emerald-950/80 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-emerald-300 dark:border-emerald-500/30">
            GOT QUESTIONS?
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-black tracking-tight text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto text-xs sm:text-base">
            Find quick answers to common questions about weekend matches.
          </p>
        </div>

        <div className="space-y-3.5 sm:space-y-4">
          {list.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id || idx}
                className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 lg:p-6 text-left flex items-center justify-between space-x-3.5 sm:space-x-4 focus:outline-none min-h-[48px]"
                >
                  <span className="font-bold text-sm sm:text-base lg:text-lg text-slate-900 dark:text-slate-100 flex items-center space-x-2.5 sm:space-x-3">
                    <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/40' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-900 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
