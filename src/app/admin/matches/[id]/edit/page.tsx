'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

export default function EditMatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    groundName: '',
    groundAddress: '',
    mapsUrl: '',
    fee: '',
    maxPlayers: '',
    description: '',
    status: 'REGISTRATION_OPEN',
    registrationOpen: true,
    isWaitlistEnabled: true,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadMatch() {
      try {
        const res = await fetch(`/api/admin/matches/${id}`);
        if (res.status === 401) {
          router.push('/admin/login');
          return;
        }
        const data = await res.json();
        if (res.ok && data.match) {
          const m = data.match;
          setFormData({
            title: m.title || '',
            date: m.date ? new Date(m.date).toISOString().split('T')[0] : '',
            startTime: m.startTime || '',
            endTime: m.endTime || '',
            groundName: m.groundName || '',
            groundAddress: m.groundAddress || '',
            mapsUrl: m.mapsUrl || '',
            fee: String(m.fee || 0),
            maxPlayers: String(m.maxPlayers || 22),
            description: m.description || '',
            status: m.status || 'REGISTRATION_OPEN',
            registrationOpen: m.registrationOpen ?? true,
            isWaitlistEnabled: m.isWaitlistEnabled ?? true,
          });
        } else {
          setError(data.error || 'Match record not found in database. It may have been deleted.');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadMatch();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (parseFloat(formData.fee) < 0 || isNaN(parseFloat(formData.fee))) {
      setError('Match fee must be a valid non-negative number.');
      return;
    }

    if (parseInt(formData.maxPlayers, 10) <= 0 || isNaN(parseInt(formData.maxPlayers, 10))) {
      setError('Maximum players must be greater than 0.');
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`/api/admin/matches/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update match');
      }

      window.location.href = '/admin/matches';
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred while updating match';
      setError(message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 text-center text-slate-500 dark:text-slate-400 font-bold text-sm">Loading match details...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl 2xl:max-w-6xl tv-container mx-auto space-y-6">
        
        <Link
          href="/admin/matches"
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 min-h-[36px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Matches</span>
        </Link>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Edit Match Details</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Update schedule, venue location, or change match status.</p>
          </div>

          {error && (
            <div className="bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-500/40 text-red-800 dark:text-red-200 text-xs p-4 rounded-2xl flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Match Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Match Date *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Match Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                      registrationOpen: e.target.value === 'REGISTRATION_OPEN',
                    })
                  }
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none min-h-[44px]"
                >
                  <option value="REGISTRATION_OPEN">Registration Open</option>
                  <option value="UPCOMING">Upcoming</option>
                  <option value="FULL">Full</option>
                  <option value="REGISTRATION_CLOSED">Registration Closed</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Start Time *</label>
                <input
                  type="text"
                  required
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">End Time *</label>
                <input
                  type="text"
                  required
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Ground Name *</label>
                <input
                  type="text"
                  required
                  value={formData.groundName}
                  onChange={(e) => setFormData({ ...formData, groundName: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Ground Address *</label>
                <input
                  type="text"
                  required
                  value={formData.groundAddress}
                  onChange={(e) => setFormData({ ...formData, groundAddress: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Match Fee (₹) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.fee}
                  onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Maximum Players Limit *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.maxPlayers}
                  onChange={(e) => setFormData({ ...formData, maxPlayers: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none min-h-[44px]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Google Maps Location Link</label>
                <input
                  type="text"
                  value={formData.mapsUrl}
                  onChange={(e) => setFormData({ ...formData, mapsUrl: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none min-h-[44px]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Description / Match Rules</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-slate-200 dark:border-slate-800">
              <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer min-h-[36px]">
                <input
                  type="checkbox"
                  checked={formData.isWaitlistEnabled}
                  onChange={(e) => setFormData({ ...formData, isWaitlistEnabled: e.target.checked })}
                  className="w-4 h-4 rounded accent-emerald-500"
                />
                <span>Enable Waitlist when capacity full</span>
              </label>

              <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer min-h-[36px]">
                <input
                  type="checkbox"
                  checked={formData.registrationOpen}
                  onChange={(e) => setFormData({ ...formData, registrationOpen: e.target.checked })}
                  className="w-4 h-4 rounded accent-emerald-500"
                />
                <span>Open Registration</span>
              </label>
            </div>

            <div className="pt-4 flex items-center justify-end space-x-4">
              <Link
                href="/admin/matches"
                className="px-5 sm:px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px] flex items-center"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center space-x-2 bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-black text-xs px-6 py-3 rounded-xl shadow-lg transition-all disabled:opacity-50 min-h-[44px]"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </AdminLayout>
  );
}
