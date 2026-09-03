import { Calendar, Clock, MapPin, ExternalLink, Users, AlertCircle, CheckCircle2 } from 'lucide-react';

interface MatchData {
  id: string;
  title: string;
  date: string | Date;
  startTime: string;
  endTime: string;
  groundName: string;
  groundAddress: string;
  mapsUrl: string;
  fee: number;
  maxPlayers: number;
  description?: string;
  status: string;
  registrationOpen: boolean;
  isWaitlistEnabled: boolean;
}

interface NextMatchCardProps {
  match: MatchData | null;
  confirmedCount: number;
  availableSpots: number;
  googleFormUrl: string;
}

export default function NextMatchCard({ match, confirmedCount, availableSpots, googleFormUrl }: NextMatchCardProps) {
  if (!match) {
    return (
      <section id="next-match" className="py-12 sm:py-16 bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
        <div className="max-w-4xl 2xl:max-w-6xl tv-container mx-auto px-4 text-center">
          <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-200 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-2xl sm:text-3xl">
              🏏
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">No Upcoming Match Scheduled Yet</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Our organizers are setting up the next weekend turf schedule. Stay tuned or join our WhatsApp community for instant updates!
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Format Date string nicely e.g. "Sunday, 30 August 2026"
  const matchDate = new Date(match.date);
  const formattedDayDate = matchDate.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const isFull = confirmedCount >= match.maxPlayers || match.status === 'FULL';
  const isClosed = !match.registrationOpen || match.status === 'REGISTRATION_CLOSED' || match.status === 'CANCELLED';

  return (
    <section id="next-match" className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white relative transition-colors">
      <div className="max-w-5xl 2xl:max-w-7xl tv-container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2.5 sm:space-y-3 mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-xs font-black tracking-widest text-emerald-700 dark:text-emerald-400 uppercase bg-emerald-100 dark:bg-emerald-950/80 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-emerald-300 dark:border-emerald-500/30">
            NEXT WEEKEND MATCH
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Reserve Your Spot For The Game
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-xs sm:text-base">
            First come, first served. Secure your spot by completing registration and payment.
          </p>
        </div>

        {/* Dynamic Card Container */}
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-emerald-500/30 rounded-3xl shadow-xl overflow-hidden relative">
          
          {/* Top Banner Accent */}
          <div className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 p-4 sm:p-6 text-white dark:text-slate-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-black/20 dark:bg-slate-950/20 px-2.5 py-1 rounded-md text-white dark:text-slate-950">
                Match Details
              </span>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-black mt-1 leading-tight">{match.title}</h3>
            </div>

            <div className="bg-slate-900 dark:bg-slate-950 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl font-black text-lg sm:text-xl shadow-md border border-slate-800 shrink-0">
              ₹{match.fee} <span className="text-xs font-normal text-slate-400">/ Player</span>
            </div>
          </div>

          {/* Body Info Grid */}
          <div className="p-5 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Left Column: Match Details */}
            <div className="space-y-5 sm:space-y-6">
              
              <div className="flex items-start space-x-3.5 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Date &amp; Day</span>
                  <p className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">{formattedDayDate}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Match Timing</span>
                  <p className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                    {match.startTime} - {match.endTime}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Venue &amp; Ground</span>
                  <p className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">{match.groundName}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{match.groundAddress}</p>
                  {match.mapsUrl && (
                    <a
                      href={match.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold mt-2 min-h-[36px]"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {match.description && (
                <p className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 leading-relaxed">
                  {match.description}
                </p>
              )}
            </div>

            {/* Right Column: Dynamic Player Roster Bar & CTA */}
            <div className="bg-white dark:bg-slate-950 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6 shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-300 flex items-center space-x-2">
                    <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Player Capacity</span>
                  </span>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    {confirmedCount} / {match.maxPlayers} Joined
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-3.5 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isFull ? 'bg-amber-500' : 'bg-gradient-to-r from-emerald-600 to-green-500 dark:from-emerald-500 dark:to-green-400'
                    }`}
                    style={{ width: `${Math.min(100, (confirmedCount / match.maxPlayers) * 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-bold mt-3">
                  {isFull ? (
                    <span className="text-amber-600 dark:text-amber-400 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Match Full ({confirmedCount}/{match.maxPlayers})</span>
                    </span>
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{availableSpots} Spots Left</span>
                    </span>
                  )}
                  <span className="text-slate-500 dark:text-slate-400">{match.maxPlayers - confirmedCount} available</span>
                </div>
              </div>

              {/* Status Banner & Action Button */}
              <div className="space-y-3">
                {isClosed ? (
                  <div className="w-full bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-500/40 text-red-700 dark:text-red-300 text-center font-extrabold py-3.5 rounded-xl text-xs sm:text-sm">
                    Registration Closed
                  </div>
                ) : isFull ? (
                  <div className="space-y-2">
                    <div className="w-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-500/40 text-amber-800 dark:text-amber-300 text-center font-extrabold py-3 rounded-xl text-xs sm:text-sm">
                      {confirmedCount} / {match.maxPlayers} Players Joined — Match Full
                    </div>
                    {match.isWaitlistEnabled && (
                      <a
                        href={googleFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-amber-700 dark:text-amber-300 text-center font-bold py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs transition-colors min-h-[44px] flex items-center justify-center"
                      >
                        Join Waiting List via Google Form →
                      </a>
                    )}
                  </div>
                ) : (
                  <a
                    href={googleFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-500 dark:to-green-500 hover:from-emerald-500 hover:to-green-500 text-white dark:text-slate-950 text-center font-black py-4 rounded-xl text-sm sm:text-base shadow-xl transition-all transform hover:-translate-y-0.5 min-h-[48px] flex items-center justify-center"
                  >
                    JOIN THIS MATCH →
                  </a>
                )}

                <p className="text-center text-[10px] sm:text-[11px] text-slate-500 font-medium">
                  Registration takes ~1 min on Google Form • Payment QR displayed after registration
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
