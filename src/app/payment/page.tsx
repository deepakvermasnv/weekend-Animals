import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { getSiteSettings } from '@/lib/settings';
import { getApiUrl } from '@/lib/api';
import PaymentQrImage from '@/components/PaymentQrImage';

export const revalidate = 0;

export default async function PaymentPage() {
  const settings = await getSiteSettings();
  let fee = 150;

  try {
    const res = await fetch(getApiUrl('/api/public/match'), { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.match?.fee) {
        fee = data.match.fee;
      }
    }
  } catch (error) {
    console.error('API fetch error on PaymentPage:', error);
  }
  // Static QR Image from UI frontend assets so it never depends on backend
  const qrImage = '/images/Weekend-animal.jpg';
  const upiId = settings.upiId || 'deepuverma124124-1@okicici';
  const confirmationUrl =
    settings.paymentConfirmationUrl ||
    'https://wa.me/919876543210?text=Hi!%20I%20have%20completed%20the%20payment%20for%20the%20upcoming%20cricket%20match.';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col items-center justify-center p-4 sm:p-6 font-sans transition-colors">
      <div className="w-full max-w-xl">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Card Container */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 text-center">
          
          <div className="space-y-2">
            <span className="text-xs font-black tracking-widest text-emerald-700 dark:text-emerald-400 uppercase bg-emerald-100 dark:bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-300 dark:border-emerald-500/30">
              STEP 2 OF 3
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Complete Your Match Payment
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Scan the QR code using any UPI app (Google Pay, PhonePe, Paytm, BHIM)
            </p>
          </div>

          {/* Amount Box */}
          <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/40 p-4 rounded-2xl flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Match Fee Amount:</span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">₹{fee}</span>
          </div>

          {/* QR Code Container */}
          <div className="bg-white p-6 rounded-3xl inline-block shadow-inner mx-auto max-w-[260px] border border-slate-200">
            <PaymentQrImage src={qrImage} alt="Payment QR Code" />
          </div>

          {/* UPI ID Display */}
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Official UPI ID</span>
            <p className="text-base font-extrabold text-emerald-700 dark:text-emerald-300 select-all font-mono">{upiId}</p>
          </div>

          {/* Instructions List */}
          <div className="text-left bg-slate-50 dark:bg-slate-950/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center space-x-2 font-bold text-emerald-700 dark:text-emerald-400 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Simple Payment Instructions:</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-600 dark:text-slate-400 pl-1">
              <li>Open your preferred UPI App (GPay / PhonePe / Paytm).</li>
              <li>Scan the QR code above or enter the UPI ID.</li>
              <li>Enter exact amount: <strong>₹{fee}</strong>.</li>
              <li>Complete payment and tap <strong>&quot;I Have Paid&quot;</strong> below.</li>
            </ol>
          </div>

          {/* Confirmation Button */}
          <div className="pt-2 space-y-3">
            <a
              href={confirmationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-500 dark:to-green-500 hover:from-emerald-500 hover:to-green-500 text-white dark:text-slate-950 font-black py-4 rounded-2xl text-base shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              I HAVE PAID — CONFIRM PAYMENT →
            </a>
            
            <p className="text-[11px] text-slate-500 font-medium">
              After confirming, our organizer will verify your payment and mark your slot as confirmed on the roster!
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
