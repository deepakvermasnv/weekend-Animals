'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface PaymentItem {
  id: string;
  registrationId: string;
  playerName: string;
  playerPhone: string;
  matchTitle: string;
  amount: number;
  status: string;
  reference: string;
  notes: string;
  createdAt: string;
}

interface Summary {
  pendingCount: number;
  paidCount: number;
  rejectedCount: number;
  totalCollected: number;
}

export default function PaymentsClient({
  initialPayments,
  summary,
}: {
  initialPayments: PaymentItem[];
  summary: Summary;
}) {
  const [payments, setPayments] = useState<PaymentItem[]>(initialPayments);
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');

  const filtered = payments.filter((p) => {
    const matchesTab = activeTab === 'ALL' || p.status === activeTab;
    const matchesSearch =
      p.playerName.toLowerCase().includes(search.toLowerCase()) ||
      p.playerPhone.includes(search) ||
      p.reference.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleUpdatePayment = async (paymentId: string, status: string) => {
    try {
      const res = await fetch('/api/admin/payments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId,
          status,
          autoConfirmPlayer: status === 'PAID',
        }),
      });

      if (res.ok) {
        setPayments(payments.map((p) => (p.id === paymentId ? { ...p, status } : p)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Metric Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xs">
          <span className="text-[10px] text-slate-500 font-extrabold uppercase">Pending Verification</span>
          <p className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{summary.pendingCount}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xs">
          <span className="text-[10px] text-slate-500 font-extrabold uppercase">Verified Paid</span>
          <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{summary.paidCount}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xs">
          <span className="text-[10px] text-slate-500 font-extrabold uppercase">Rejected Payments</span>
          <p className="text-xl sm:text-2xl font-black text-red-600 dark:text-red-400 mt-1">{summary.rejectedCount}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xs">
          <span className="text-[10px] text-slate-500 font-extrabold uppercase">Total Verified Fees</span>
          <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">₹{summary.totalCollected}</p>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {['ALL', 'PENDING', 'PAID', 'REJECTED'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-colors min-h-[38px] ${
                activeTab === tab
                  ? 'bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search reference or player name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none min-h-[40px]"
          />
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[650px]">
            <thead className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 uppercase text-[10px] font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Player</th>
                <th className="p-4">Match Title</th>
                <th className="p-4">Amount</th>
                <th className="p-4">UPI Reference</th>
                <th className="p-4">Payment Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">
                    <div>
                      <span>{p.playerName}</span>
                      <span className="block text-[10px] font-mono text-emerald-600 dark:text-emerald-400">{p.playerPhone}</span>
                    </div>
                  </td>

                  <td className="p-4 text-slate-700 dark:text-slate-300 max-w-[160px] truncate">{p.matchTitle}</td>

                  <td className="p-4 font-black text-slate-900 dark:text-white">₹{p.amount}</td>

                  <td className="p-4 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                    {p.reference || <span className="text-slate-400 dark:text-slate-600 font-sans italic">None Provided</span>}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-black ${
                        p.status === 'PAID'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30'
                          : p.status === 'REJECTED'
                          ? 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-400 border border-red-300 dark:border-red-500/30'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {p.status !== 'PAID' && (
                        <button
                          onClick={() => handleUpdatePayment(p.id, 'PAID')}
                          className="bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 text-[10px] font-black px-3 py-1.5 rounded-lg shadow-md min-h-[36px]"
                        >
                          Mark Paid &amp; Confirm
                        </button>
                      )}

                      {p.status !== 'REJECTED' && (
                        <button
                          onClick={() => handleUpdatePayment(p.id, 'REJECTED')}
                          className="bg-red-50 hover:bg-red-100 dark:bg-red-950/60 dark:hover:bg-red-900 text-red-600 dark:text-red-300 border border-red-200 dark:border-red-500/30 text-[10px] font-bold px-2.5 py-1.5 rounded-lg min-h-[36px]"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
