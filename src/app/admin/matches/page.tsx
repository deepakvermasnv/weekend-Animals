import { redirect } from 'next/navigation';
import Link from 'next/link';
import { cookies } from 'next/headers';
import AdminLayout from '@/components/admin/AdminLayout';
import { getAdminSession } from '@/lib/auth';
import { getApiUrl } from '@/lib/api';
import { Plus } from 'lucide-react';
import MatchListClient from './MatchListClient';

export const revalidate = 0;

export default async function MatchesPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  let formattedMatches: any[] = [];
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;

    const res = await fetch(getApiUrl('/api/admin/matches'), {
      headers: {
        ...(token ? { Cookie: `admin_session=${token}`, Authorization: `Bearer ${token}` } : {}),
      },
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      const matches = data.matches || [];
      formattedMatches = matches.map((m: any) => ({
        id: m.id,
        title: m.title,
        date: m.date ? new Date(m.date).toISOString() : '',
        startTime: m.startTime,
        endTime: m.endTime,
        groundName: m.groundName,
        fee: m.fee,
        maxPlayers: m.maxPlayers,
        status: m.status,
        registrationOpen: m.registrationOpen,
        confirmedCount: m.confirmedCount || 0,
        registeredCount: m.registeredCount || 0,
      }));
    }
  } catch (err) {
    console.error('API fetch error on MatchesPage:', err);
  }

  return (
    <AdminLayout userEmail={session.email}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Match Management</h1>
            <p className="text-xs text-slate-400 mt-1">
              Create, publish, edit, or mark weekend matches as completed.
            </p>
          </div>

          <Link
            href="/admin/matches/new"
            className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Match</span>
          </Link>
        </div>

        <MatchListClient initialMatches={formattedMatches} />
      </div>
    </AdminLayout>
  );
}
