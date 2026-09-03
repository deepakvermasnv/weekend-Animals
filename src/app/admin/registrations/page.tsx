import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import AdminLayout from '@/components/admin/AdminLayout';
import { getAdminSession } from '@/lib/auth';
import { getApiUrl } from '@/lib/api';
import RegistrationClient from './RegistrationClient';

export const revalidate = 0;

export default async function RegistrationsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  let matches: any[] = [];
  let registrations: any[] = [];

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;
    const authHeaders = {
      ...(token ? { Cookie: `admin_session=${token}`, Authorization: `Bearer ${token}` } : {}),
    };

    const [matchesRes, regsRes] = await Promise.all([
      fetch(getApiUrl('/api/admin/matches'), { headers: authHeaders, cache: 'no-store' }),
      fetch(getApiUrl('/api/admin/registrations'), { headers: authHeaders, cache: 'no-store' }),
    ]);

    if (matchesRes.ok) {
      const data = await matchesRes.json();
      matches = data.matches || [];
    }

    if (regsRes.ok) {
      const data = await regsRes.json();
      registrations = data.registrations || [];
    }
  } catch (err) {
    console.error('API fetch error on RegistrationsPage:', err);
  }

  const formattedRegs = registrations.map((r: any) => ({
    id: r.id,
    name: r.name,
    phone: r.phone,
    area: r.area,
    skillLevel: r.skillLevel,
    battingBowling: r.battingBowling,
    matchId: r.matchId,
    matchTitle: r.match?.title || 'Unknown Match',
    status: r.status,
    paymentId: r.payment?.id || null,
    paymentStatus: r.payment?.status || 'PENDING',
    paymentAmount: r.payment?.amount || r.match?.fee || 150,
    paymentReference: r.payment?.reference || '',
    notes: r.payment?.notes || '',
    createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : '',
  }));

  const formattedMatches = matches.map((m: any) => ({
    id: m.id,
    title: m.title,
    date: m.date ? new Date(m.date).toISOString() : '',
  }));

  return (
    <AdminLayout userEmail={session.email}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="pb-4 border-b border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-black text-white">Player Registrations</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage player rosters, verify payment receipts, promote waitlisted players, and add internal notes.
          </p>
        </div>

        <RegistrationClient initialRegistrations={formattedRegs} matches={formattedMatches} />
      </div>
    </AdminLayout>
  );
}
