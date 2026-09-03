import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import AdminLayout from '@/components/admin/AdminLayout';
import { getAdminSession } from '@/lib/auth';
import { getApiUrl } from '@/lib/api';
import PaymentsClient from './PaymentsClient';

export const revalidate = 0;

export default async function PaymentsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  let payments: any[] = [];
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;

    const res = await fetch(getApiUrl('/api/admin/payments'), {
      headers: {
        ...(token ? { Cookie: `admin_session=${token}`, Authorization: `Bearer ${token}` } : {}),
      },
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      payments = data.payments || [];
    }
  } catch (err) {
    console.error('API fetch error on PaymentsPage:', err);
  }

  const formattedPayments = payments.map((p: any) => ({
    id: p.id,
    registrationId: p.registrationId,
    playerName: p.registration?.name || 'Unknown Player',
    playerPhone: p.registration?.phone || '',
    matchTitle: p.registration?.match?.title || 'Unknown Match',
    amount: p.amount,
    status: p.status,
    reference: p.reference || '',
    notes: p.notes || '',
    createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : '',
  }));

  const summary = {
    pendingCount: payments.filter((p: any) => p.status === 'PENDING').length,
    paidCount: payments.filter((p: any) => p.status === 'PAID').length,
    rejectedCount: payments.filter((p: any) => p.status === 'REJECTED').length,
    totalCollected: payments
      .filter((p: any) => p.status === 'PAID')
      .reduce((sum: number, p: any) => sum + (p.amount || 0), 0),
  };

  return (
    <AdminLayout userEmail={session.email}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="pb-4 border-b border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-black text-white">Manual Payment Verification</h1>
          <p className="text-xs text-slate-400 mt-1">
            Review QR payments, enter UPI transaction reference numbers, mark payments as Paid or Rejected.
          </p>
        </div>

        <PaymentsClient initialPayments={formattedPayments} summary={summary} />
      </div>
    </AdminLayout>
  );
}
