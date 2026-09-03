import { redirect } from 'next/navigation';
import Link from 'next/link';
import { cookies } from 'next/headers';
import AdminLayout from '@/components/admin/AdminLayout';
import { getAdminSession } from '@/lib/auth';
import { getApiUrl } from '@/lib/api';
import { Users, CheckCircle2, IndianRupee, ArrowUpRight, Plus } from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  let totalPlayers = 0;
  let upcomingMatch: any = null;
  let recentRegistrations: any[] = [];
  let registeredCount = 0;
  let confirmedCount = 0;
  let pendingPaymentCount = 0;
  let totalCollected = 0;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;

    const res = await fetch(getApiUrl('/api/admin/dashboard'), {
      headers: {
        ...(token ? { Cookie: `admin_session=${token}`, Authorization: `Bearer ${token}` } : {}),
      },
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      totalPlayers = data.totalPlayers || 0;
      upcomingMatch = data.upcomingMatch || null;
      recentRegistrations = data.recentRegistrations || [];
      registeredCount = data.registeredCount || 0;
      confirmedCount = data.confirmedCount || 0;
      pendingPaymentCount = data.pendingPaymentCount || 0;
      totalCollected = data.totalCollected || 0;
    }
  } catch (err) {
    console.error('API fetch error on Admin Dashboard:', err);
  }

  return (
    <AdminLayout userEmail={session.email}>
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Dashboard Overview</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Live statistics and upcoming match status for {session.name}.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/admin/matches/new"
              className="inline-flex items-center space-x-2 bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Match</span>
            </Link>
          </div>
        </div>

        {/* Top Summary Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total Players</span>
              <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{totalPlayers}</p>
            <span className="text-[11px] text-slate-500 dark:text-slate-500 font-medium">Lifetime registered players</span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Registered (Current)</span>
              <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
              {registeredCount} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">/ {upcomingMatch?.maxPlayers || 0}</span>
            </p>
            <span className="text-[11px] text-slate-500 dark:text-slate-500 font-medium">Spots filled for upcoming game</span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Confirmed Players</span>
              <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-3xl font-black text-green-600 dark:text-green-400">{confirmedCount}</p>
            <span className="text-[11px] text-slate-500 dark:text-slate-500 font-medium">Payment verified &amp; confirmed</span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total Collected</span>
              <IndianRupee className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <p className="text-3xl font-black text-amber-600 dark:text-amber-400">₹{totalCollected}</p>
            <span className="text-[11px] text-slate-500 dark:text-slate-500 font-medium">Match fees collected</span>
          </div>

        </div>

        {/* Upcoming Match Overview Card */}
        {upcomingMatch ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-300 dark:border-emerald-500/30">
                  ACTIVE MATCH SCHEDULED
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">{upcomingMatch.title}</h2>
              </div>
              <div className="flex items-center space-x-2">
                <Link
                  href={`/admin/matches/${upcomingMatch.id}/edit`}
                  className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  Edit Match
                </Link>
                <Link
                  href="/admin/registrations"
                  className="bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-extrabold text-xs px-4 py-2 rounded-xl"
                >
                  View Registrations →
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 dark:text-slate-300">
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-500 font-bold uppercase text-[10px]">Date &amp; Time</span>
                <p className="font-extrabold text-slate-900 dark:text-white text-sm">
                  {new Date(upcomingMatch.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} • {upcomingMatch.startTime}
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-500 font-bold uppercase text-[10px]">Ground Venue</span>
                <p className="font-extrabold text-slate-900 dark:text-white text-sm">{upcomingMatch.groundName}</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-500 font-bold uppercase text-[10px]">Payment Status</span>
                <p className="font-extrabold text-amber-700 dark:text-amber-400 text-sm">
                  {pendingPaymentCount} Pending Payments • ₹{upcomingMatch.fee} / player
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No upcoming match scheduled yet.</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Create your first match to start accepting weekend registrations.</p>
            <Link
              href="/admin/matches/new"
              className="inline-flex items-center space-x-2 bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl"
            >
              <Plus className="w-4 h-4" />
              <span>Create First Match</span>
            </Link>
          </div>
        )}

        {/* Recent Registrations Table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Recent Registrations</h3>
            <Link href="/admin/registrations" className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center space-x-1">
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3 rounded-l-xl">Player Name</th>
                  <th className="p-3">WhatsApp Phone</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Player Status</th>
                  <th className="p-3 rounded-r-xl">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {recentRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{reg.name}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-300 font-mono">{reg.phone}</td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">{reg.battingBowling}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-md text-[10px] font-black ${
                          reg.payment?.status === 'PAID'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30'
                            : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30'
                        }`}
                      >
                        {reg.payment?.status || 'PENDING'}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-md text-[10px] font-black ${
                          reg.status === 'CONFIRMED'
                            ? 'bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300 border border-green-300 dark:border-green-500/30'
                            : reg.status === 'WAITLISTED'
                            ? 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {reg.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">
                      {new Date(reg.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
