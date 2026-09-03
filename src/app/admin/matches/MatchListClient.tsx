'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Edit3, Trash2 } from 'lucide-react';

interface MatchItem {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  groundName: string;
  fee: number;
  maxPlayers: number;
  status: string;
  registrationOpen: boolean;
  confirmedCount: number;
  registeredCount: number;
}

export default function MatchListClient({ initialMatches }: { initialMatches: MatchItem[] }) {
  const router = useRouter();
  const [matches, setMatches] = useState<MatchItem[]>(initialMatches);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this match? All registrations for this match will also be removed.')) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/matches/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMatches(matches.filter((m) => m.id !== id));
        router.refresh();
      } else {
        alert('Failed to delete match');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/matches/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          registrationOpen: newStatus === 'REGISTRATION_OPEN',
        }),
      });

      if (res.ok) {
        setMatches(
          matches.map((m) =>
            m.id === id
              ? { ...m, status: newStatus, registrationOpen: newStatus === 'REGISTRATION_OPEN' }
              : m
          )
        );
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (matches.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xs">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-2xl sm:text-3xl">
          🏏
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">No Matches Found</h3>
        <p className="text-slate-600 dark:text-slate-400 text-xs max-w-sm mx-auto">
          Create your first weekend cricket match to start accepting registrations.
        </p>
        <Link
          href="/admin/matches/new"
          className="inline-flex items-center space-x-2 bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-lg min-h-[40px]"
        >
          <span>Create Match</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
      {matches.map((m) => {
        const dateObj = new Date(m.date);
        const formattedDate = dateObj.toLocaleDateString('en-IN', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        });

        return (
          <div
            key={m.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 flex flex-col justify-between space-y-5 sm:space-y-6 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-xs"
          >
            <div className="space-y-3.5 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                    m.status === 'REGISTRATION_OPEN'
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30'
                      : m.status === 'FULL'
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400 border-amber-300 dark:border-amber-500/30'
                      : m.status === 'COMPLETED'
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      : 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-400 border-red-300 dark:border-red-500/30'
                  }`}
                >
                  {m.status.replace('_', ' ')}
                </span>
                <span className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">₹{m.fee}</span>
              </div>

              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">{m.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">{m.groundName}</span>
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-500">Date &amp; Time:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {formattedDate} • {m.startTime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-500">Roster Capacity:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {m.confirmedCount} / {m.maxPlayers} Confirmed
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Status Select & Actions */}
            <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Quick Status:</span>
                <select
                  value={m.status}
                  onChange={(e) => handleStatusChange(m.id, e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-900 dark:text-slate-200 font-bold focus:outline-none min-h-[36px]"
                >
                  <option value="REGISTRATION_OPEN">Registration Open</option>
                  <option value="FULL">Full</option>
                  <option value="REGISTRATION_CLOSED">Registration Closed</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <Link
                  href={`/admin/matches/${m.id}/edit`}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-center font-bold text-xs py-2 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center space-x-1 min-h-[38px]"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </Link>
                <button
                  onClick={() => handleDelete(m.id)}
                  disabled={deletingId === m.id}
                  className="p-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-500/20 min-h-[38px] min-w-[38px] flex items-center justify-center"
                  title="Delete Match"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
