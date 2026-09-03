import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import AdminLayout from '@/components/admin/AdminLayout';
import { getAdminSession } from '@/lib/auth';
import { getApiUrl } from '@/lib/api';
import FaqClient from './FaqClient';

export const revalidate = 0;

export default async function FaqsAdminPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  let faqs: any[] = [];
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;

    const res = await fetch(getApiUrl('/api/admin/faqs'), {
      headers: {
        ...(token ? { Cookie: `admin_session=${token}`, Authorization: `Bearer ${token}` } : {}),
      },
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      faqs = data.faqs || [];
    }
  } catch (err) {
    console.error('API fetch error on FaqsAdminPage:', err);
  }

  const formattedFaqs = faqs.map((f: any) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
    displayOrder: f.displayOrder,
    published: f.published,
  }));

  return (
    <AdminLayout userEmail={session.email}>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="pb-4 border-b border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-black text-white">Manage FAQs</h1>
          <p className="text-xs text-slate-400 mt-1">
            Add, edit, reorder, or publish/unpublish questions on the public landing page.
          </p>
        </div>

        <FaqClient initialFaqs={formattedFaqs} />
      </div>
    </AdminLayout>
  );
}
