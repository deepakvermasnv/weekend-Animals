import Link from 'next/link';
import { ShieldCheck, MessageSquare, Mail, Phone, Lock } from 'lucide-react';

interface FooterProps {
  communityName?: string;
  communityDescription?: string;
  whatsappGroupUrl?: string;
  contactWhatsappNumber?: string;
  contactEmail?: string;
}

export default function Footer({
  communityName = 'Weekend Cricket Community',
  communityDescription = 'Connecting local cricket enthusiasts for weekend turf matches.',
  whatsappGroupUrl = '#',
  contactWhatsappNumber = '+919876543210',
  contactEmail = 'organizer@weekendcricket.com',
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-900 pt-12 sm:pt-16 pb-28 md:pb-12 text-xs sm:text-sm transition-colors">
      <div className="max-w-7xl 2xl:max-w-[1536px] tv-container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-slate-200 dark:border-slate-900">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center text-slate-950 font-black text-sm sm:text-base shrink-0">
                🏏
              </div>
              <span className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">{communityName}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{communityDescription}</p>
            <div className="pt-2">
              <a
                href={whatsappGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 text-xs font-bold px-3.5 py-2.5 rounded-xl min-h-[38px]"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Community</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm tracking-wider uppercase mb-3.5 sm:mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="#home" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-1 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#next-match" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-1 inline-block">
                  Next Match
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-1 inline-block">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#players" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-1 inline-block">
                  Players Roster
                </Link>
              </li>
              <li>
                <Link href="/payment" className="text-emerald-600 dark:text-emerald-400 hover:underline py-1 inline-block font-bold">
                  Payment QR Page
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Rules & FAQs */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm tracking-wider uppercase mb-3.5 sm:mb-4">Information</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="#rules" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-1 inline-block">
                  Community Rules
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-1 inline-block">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#ground" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-1 inline-block">
                  Ground Location
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-1 inline-block">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm tracking-wider uppercase mb-3.5 sm:mb-4">Contact Organizer</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{contactWhatsappNumber}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="truncate">{contactEmail}</span>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-900">
              <Link
                href="/admin/login"
                className="inline-flex items-center space-x-1.5 text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 font-semibold min-h-[36px]"
              >
                <Lock className="w-3 h-3" />
                <span>Community Admin Portal</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left text-xs text-slate-500 font-medium">
          <p>© {currentYear} {communityName}. All rights reserved.</p>
          <p className="flex items-center space-x-1 justify-center sm:justify-start">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Open &amp; Friendly Weekend Cricket Community</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
