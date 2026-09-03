import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import AdminLayout from '@/components/admin/AdminLayout';
import { getAdminSession } from '@/lib/auth';
import { getApiUrl } from '@/lib/api';
import RulesClient from './RulesClient';

export const revalidate = 0;

export default async function RulesAdminPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  let rules: any[] = [];
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;

    const res = await fetch(getApiUrl('/api/admin/rules'), {
      headers: {
        ...(token ? { Cookie: `admin_session=${token}`, Authorization: `Bearer ${token}` } : {}),
      },
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      rules = data.rules || [];
    }
  } catch (err) {
    console.error('API fetch error on RulesAdminPage:', err);
  }

  const formattedRules = rules.map((r: any) => ({
    id: r.id,
    text: r.text,
    displayOrder: r.displayOrder,
    published: r.published,
  }));

  return (
    <AdminLayout userEmail={session.email}>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="pb-4 border-b border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-black text-white">Manage Community Rules</h1>
          <p className="text-xs text-slate-400 mt-1">
            Edit, add, or reorder ground code and community playing guidelines.
          </p>
        </div>

        <RulesClient initialRules={formattedRules} />
      </div>
    </AdminLayout>
  );
}
