import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white p-6 sm:p-12 font-sans transition-colors">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Privacy Policy</h1>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            At Weekend Cricket Community, we value your privacy. We collect minimal information solely for the purpose of organizing weekend cricket matches and coordinating player rosters.
          </p>

          <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">1. Information We Collect</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            When you register via Google Form, we collect basic details such as your Name, Phone/WhatsApp number, Preferred Area, Skill Level, and Batting/Bowling role.
          </p>

          <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">2. Public Display</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            We only display your First Name and Last Initial (e.g. &quot;Rahul S.&quot;) on our public player roster. We NEVER display your phone number, email address, or payment references publicly.
          </p>

          <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">3. Contact Us</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            If you wish to remove your registration or update your details, please contact the community organizer on WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}
