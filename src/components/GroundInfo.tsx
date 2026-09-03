import { MapPin, ExternalLink, Navigation } from 'lucide-react';

interface GroundInfoProps {
  groundName?: string;
  groundAddress?: string;
  mapsUrl?: string;
}

export default function GroundInfo({
  groundName = 'ABC Cricket Ground & Sports Turf',
  groundAddress = '123 Stadium Road, Near Central Park, Sector 4',
  mapsUrl = 'https://maps.google.com',
}: GroundInfoProps) {
  return (
    <section id="ground" className="py-12 sm:py-16 lg:py-24 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl 2xl:max-w-[1536px] tv-container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-center lg:text-left">
            <span className="text-[10px] sm:text-xs font-black tracking-widest text-emerald-700 dark:text-emerald-400 uppercase bg-emerald-100 dark:bg-emerald-950/80 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-emerald-300 dark:border-emerald-500/30">
              LOCATION &amp; VENUE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-black tracking-tight text-slate-900 dark:text-white">Where We Play</h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
              We book top-rated turf grounds with high quality pitches, floodlights, seating arrangements, parking, and refreshment facilities.
            </p>

            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm text-left">
              <div className="flex items-start space-x-3.5 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">{groundName}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">{groundAddress}</p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs sm:text-sm px-5 sm:px-6 py-3 rounded-xl shadow-lg transition-all min-h-[44px] w-full sm:w-auto"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-5 sm:space-y-6 relative overflow-hidden shadow-sm">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 dark:bg-emerald-950/80 rounded-3xl border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center mx-auto text-3xl sm:text-4xl">
                📍
              </div>
              <div>
                <h3 className="font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">Easy Directions</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-sm mx-auto">
                  Pin location and driving directions are shared directly in the WhatsApp group before every weekend match.
                </p>
              </div>
              <div className="inline-flex items-center space-x-2 text-[11px] sm:text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-slate-100 dark:bg-slate-900 px-3.5 sm:px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800">
                <span>Free Ample Parking • Water &amp; Changing Rooms Available</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
