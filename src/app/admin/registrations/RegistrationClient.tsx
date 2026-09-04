'use client';

import { useState, useEffect } from 'react';
import { Search, FileText, Plus, X, Phone, Trash2, AlertCircle, Pencil } from 'lucide-react';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';

interface RegistrationItem {
  id: string;
  name: string;
  phone: string;
  area: string;
  skillLevel: string;
  battingBowling: string;
  matchId: string;
  matchTitle: string;
  status: string;
  paymentId: string | null;
  paymentStatus: string;
  paymentAmount: number;
  paymentReference: string;
  notes: string;
  createdAt: string;
}

interface MatchOption {
  id: string;
  title: string;
  date: string;
}

export default function RegistrationClient({
  initialRegistrations,
  matches,
}: {
  initialRegistrations: RegistrationItem[];
  matches: MatchOption[];
}) {
  const [registrations, setRegistrations] = useState<RegistrationItem[]>(initialRegistrations);
  const [search, setSearch] = useState('');
  const [selectedMatchFilter, setSelectedMatchFilter] = useState('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [selectedPaymentFilter, setSelectedPaymentFilter] = useState('ALL');

  // Details Modal state
  const [selectedReg, setSelectedReg] = useState<RegistrationItem | null>(null);
  const [modalNotes, setModalNotes] = useState('');
  const [modalReference, setModalReference] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  // Edit Modal state
  const [editingReg, setEditingReg] = useState<RegistrationItem | null>(null);
  const [editError, setEditError] = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    area: '',
    skillLevel: 'Intermediate',
    battingBowling: 'All-Rounder',
    matchId: '',
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    paymentAmount: 0,
    reference: '',
    notes: '',
  });

  const handleOpenEditModal = (r: RegistrationItem) => {
    setEditingReg(r);
    setEditError('');
    setEditForm({
      name: r.name || '',
      phone: r.phone || '',
      area: r.area || '',
      skillLevel: r.skillLevel || 'Intermediate',
      battingBowling: r.battingBowling || 'All-Rounder',
      matchId: r.matchId || (matches[0]?.id || ''),
      status: r.status || 'CONFIRMED',
      paymentStatus: r.paymentStatus || 'PAID',
      paymentAmount: r.paymentAmount || 0,
      reference: r.paymentReference || '',
      notes: r.notes || '',
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReg) return;

    if (!editForm.name.trim()) {
      setEditError('Please enter player name.');
      return;
    }
    if (!editForm.phone.trim()) {
      setEditError('Please enter WhatsApp phone number.');
      return;
    }

    setEditLoading(true);
    setEditError('');

    try {
      const res = await apiFetch(`/api/admin/registrations/${editingReg.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editForm.name,
          phone: editForm.phone,
          area: editForm.area,
          skillLevel: editForm.skillLevel,
          battingBowling: editForm.battingBowling,
          matchId: editForm.matchId,
          status: editForm.status,
          paymentStatus: editForm.paymentStatus,
          amount: editForm.paymentAmount,
          reference: editForm.reference,
          notes: editForm.notes,
        }),
      });

      if (res.status === 401) {
        window.location.href = '/admin/login';
        return;
      }

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        const selectedMatch = matches.find((m) => m.id === editForm.matchId);
        setRegistrations((prev) =>
          prev.map((item) =>
            item.id === editingReg.id
              ? {
                  ...item,
                  name: editForm.name,
                  phone: editForm.phone,
                  area: editForm.area,
                  skillLevel: editForm.skillLevel,
                  battingBowling: editForm.battingBowling,
                  matchId: editForm.matchId,
                  matchTitle: selectedMatch ? selectedMatch.title : item.matchTitle,
                  status: editForm.status,
                  paymentStatus: editForm.paymentStatus,
                  paymentAmount: editForm.paymentAmount,
                  paymentReference: editForm.reference,
                  notes: editForm.notes,
                }
              : item
          )
        );
        setEditingReg(null);
      } else {
        setEditError(data.error || 'Failed to update player details.');
      }
    } catch (err) {
      console.error('Error updating player:', err);
      setEditError('An unexpected error occurred while updating player details.');
    } finally {
      setEditLoading(false);
    }
  };

  // Manual Add Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [addError, setAddError] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const [newReg, setNewReg] = useState({
    name: '',
    phone: '',
    area: '',
    skillLevel: 'Intermediate',
    battingBowling: 'All-Rounder',
    matchId: matches[0]?.id || '',
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    reference: '',
    notes: '',
  });

  // Ensure matchId is populated when matches array loads or modal opens
  useEffect(() => {
    if (!newReg.matchId && matches.length > 0) {
      setNewReg((prev) => ({ ...prev, matchId: matches[0].id }));
    }
  }, [matches, newReg.matchId]);

  const filtered = registrations.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search) ||
      r.area.toLowerCase().includes(search.toLowerCase());
    const matchesMatch = selectedMatchFilter === 'ALL' || r.matchId === selectedMatchFilter;
    const matchesStatus = selectedStatusFilter === 'ALL' || r.status === selectedStatusFilter;
    const matchesPayment = selectedPaymentFilter === 'ALL' || r.paymentStatus === selectedPaymentFilter;
    return matchesSearch && matchesMatch && matchesStatus && matchesPayment;
  });

  const handleUpdateStatus = async (regId: string, newPlayerStatus: string, newPaymentStatus?: string) => {
    try {
      const target = registrations.find((r) => r.id === regId);
      if (!target) return;

      const res = await fetch(`/api/admin/registrations/${regId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newPlayerStatus,
          paymentStatus: newPaymentStatus || target.paymentStatus,
        }),
      });

      if (res.status === 401) {
        window.location.href = '/admin/login';
        return;
      }

      if (res.ok) {
        setRegistrations(
          registrations.map((r) =>
            r.id === regId
              ? { ...r, status: newPlayerStatus, paymentStatus: newPaymentStatus || r.paymentStatus }
              : r
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteRegistration = async (regId: string, playerName: string) => {
    if (!confirm(`Are you sure you want to remove player "${playerName}" completely from the registration roster?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/registrations/${regId}`, {
        method: 'DELETE',
      });

      if (res.status === 401) {
        window.location.href = '/admin/login';
        return;
      }

      if (res.ok) {
        setRegistrations(registrations.filter((r) => r.id !== regId));
      } else {
        alert('Failed to remove player');
      }
    } catch (err) {
      console.error('Error deleting player:', err);
    }
  };

  const handleClearAllRegistrations = async () => {
    if (!confirm('Are you sure you want to delete ALL player registrations from the roster? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch('/api/admin/registrations', {
        method: 'DELETE',
      });

      if (res.status === 401) {
        window.location.href = '/admin/login';
        return;
      }

      if (res.ok) {
        setRegistrations([]);
      } else {
        alert('Failed to clear player roster');
      }
    } catch (err) {
      console.error('Error clearing player roster:', err);
    }
  };

  const handleSaveModalDetails = async () => {
    if (!selectedReg) return;
    setSavingNotes(true);

    try {
      const res = await fetch(`/api/admin/registrations/${selectedReg.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notes: modalNotes,
          reference: modalReference,
          status: selectedReg.status,
          paymentStatus: selectedReg.paymentStatus,
        }),
      });

      if (res.status === 401) {
        window.location.href = '/admin/login';
        return;
      }

      if (res.ok) {
        setRegistrations(
          registrations.map((r) =>
            r.id === selectedReg.id ? { ...r, notes: modalNotes, paymentReference: modalReference } : r
          )
        );
        setSelectedReg(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleAddRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError('');

    if (!newReg.name.trim()) {
      setAddError('Please enter the player name.');
      return;
    }

    if (!newReg.phone.trim()) {
      setAddError('Please enter a phone number.');
      return;
    }

    if (!newReg.matchId) {
      setAddError('Please select a match.');
      return;
    }

    setAddLoading(true);

    try {
      const res = await fetch('/api/admin/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReg),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 401) {
        window.location.href = '/admin/login';
        return;
      }

      if (res.ok && data.registration) {
        setShowAddModal(false);
        setNewReg({
          name: '',
          phone: '',
          area: '',
          skillLevel: 'Intermediate',
          battingBowling: 'All-Rounder',
          matchId: matches[0]?.id || '',
          status: 'CONFIRMED',
          paymentStatus: 'PAID',
          reference: '',
          notes: '',
        });
        window.location.reload();
      } else {
        setAddError(data.error || 'Failed to add player');
      }
    } catch (err) {
      console.error(err);
      setAddError('An unexpected error occurred while adding player.');
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 rounded-3xl space-y-4 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by player name, phone number, or area..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none min-h-[42px]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <select
              value={selectedMatchFilter}
              onChange={(e) => setSelectedMatchFilter(e.target.value)}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-700 dark:text-slate-300 font-bold focus:outline-none min-h-[40px]"
            >
              <option value="ALL">All Matches</option>
              {matches.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>

            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-700 dark:text-slate-300 font-bold focus:outline-none min-h-[40px]"
            >
              <option value="ALL">All Player Statuses</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="REGISTERED">Registered</option>
              <option value="WAITLISTED">Waitlisted</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

            <select
              value={selectedPaymentFilter}
              onChange={(e) => setSelectedPaymentFilter(e.target.value)}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-700 dark:text-slate-300 font-bold focus:outline-none min-h-[40px]"
            >
              <option value="ALL">All Payments</option>
              <option value="PAID">Paid</option>
              <option value="PENDING">Pending</option>
              <option value="REJECTED">Rejected</option>
            </select>

            {registrations.length > 0 && (
              <button
                onClick={handleClearAllRegistrations}
                className="bg-red-50 hover:bg-red-100 dark:bg-red-950/60 dark:hover:bg-red-900 text-red-600 dark:text-red-300 border border-red-200 dark:border-red-500/30 font-extrabold text-xs px-3 py-2 rounded-xl flex items-center space-x-1 transition-colors min-h-[40px]"
                title="Clear all players from roster"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}

            <button
              onClick={() => {
                setAddError('');
                if (matches.length > 0 && !newReg.matchId) {
                  setNewReg((prev) => ({ ...prev, matchId: matches[0].id }));
                }
                setShowAddModal(true);
              }}
              className="bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-extrabold text-xs px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow-sm min-h-[40px]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Player</span>
            </button>
          </div>

        </div>
      </div>

      {/* Registrations Roster Data Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 uppercase text-[10px] font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Player Name</th>
                <th className="p-4">WhatsApp Phone</th>
                <th className="p-4">Area &amp; Skill</th>
                <th className="p-4">Match</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 dark:text-slate-400 text-xs">
                    No players found. Click &quot;Add Player&quot; above to add players manually to the roster.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">
                      <div className="flex flex-col">
                        <span>{r.name}</span>
                        <span className="text-[10px] text-slate-500 font-normal">
                          {new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </td>

                    <td className="p-4 text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                      <a
                        href={`https://wa.me/${r.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center space-x-1 py-1"
                      >
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{r.phone}</span>
                      </a>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-col text-slate-700 dark:text-slate-300">
                        <span className="font-semibold">{r.area}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">{r.skillLevel} • {r.battingBowling}</span>
                      </div>
                    </td>

                    <td className="p-4 text-slate-700 dark:text-slate-300 font-medium max-w-[150px] truncate">
                      {r.matchTitle}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-black ${
                          r.paymentStatus === 'PAID'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30'
                            : r.paymentStatus === 'REJECTED'
                            ? 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-400 border border-red-300 dark:border-red-500/30'
                            : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30'
                        }`}
                      >
                        {r.paymentStatus} (₹{r.paymentAmount})
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-black ${
                          r.status === 'CONFIRMED'
                            ? 'bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300 border border-green-300 dark:border-green-500/30'
                            : r.status === 'WAITLISTED'
                            ? 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30'
                            : r.status === 'CANCELLED'
                            ? 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-500/30'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {r.status !== 'CONFIRMED' ? (
                          <button
                            onClick={() => handleUpdateStatus(r.id, 'CONFIRMED', 'PAID')}
                            className="bg-emerald-100 dark:bg-emerald-950 hover:bg-emerald-200 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/40 text-[10px] font-extrabold px-2.5 py-1.5 rounded-lg min-h-[36px]"
                          >
                            Confirm &amp; Pay
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUpdateStatus(r.id, 'CANCELLED')}
                            className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 text-[10px] font-bold px-2 py-1.5 rounded-lg min-h-[36px]"
                          >
                            Cancel
                          </button>
                        )}

                        <button
                          onClick={() => handleOpenEditModal(r)}
                          className="bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900 text-amber-700 dark:text-amber-300 p-2 rounded-lg border border-amber-200 dark:border-amber-500/20 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                          title="Edit Player Details"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedReg(r);
                            setModalNotes(r.notes || '');
                            setModalReference(r.paymentReference || '');
                          }}
                          className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 p-2 rounded-lg min-h-[36px] min-w-[36px] flex items-center justify-center"
                          title="View Details &amp; Notes"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeleteRegistration(r.id, r.name)}
                          className="bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900 text-red-600 dark:text-red-400 p-2 rounded-lg border border-red-200 dark:border-red-500/20 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                          title="Remove Player"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details & Internal Notes Modal */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-3xl p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Player Registration Details</h3>
              <button onClick={() => setSelectedReg(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white min-h-[36px] min-w-[36px] flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Name</span>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{selectedReg.name}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Phone</span>
                  <p className="font-bold text-emerald-700 dark:text-emerald-400 font-mono text-sm">{selectedReg.phone}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Area</span>
                  <p className="font-medium text-slate-700 dark:text-slate-300">{selectedReg.area}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Skill &amp; Role</span>
                  <p className="font-medium text-slate-700 dark:text-slate-300">{selectedReg.skillLevel} ({selectedReg.battingBowling})</p>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Payment Reference ID (UPI Ref)</label>
                <input
                  type="text"
                  value={modalReference}
                  onChange={(e) => setModalReference(e.target.value)}
                  placeholder="e.g. UPI/202608/987654"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none min-h-[40px]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Internal Admin Notes <span className="text-[10px] text-amber-600 dark:text-amber-400">(Never visible publicly)</span>
                </label>
                <textarea
                  rows={3}
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  placeholder="Add internal notes about payment, bat preference, or attendance..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    const regToEdit = selectedReg;
                    setSelectedReg(null);
                    if (regToEdit) {
                      handleOpenEditModal(regToEdit);
                    }
                  }}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900 px-3 py-2 rounded-xl border border-amber-200 dark:border-amber-500/20 min-h-[40px]"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const regToDelete = selectedReg;
                    setSelectedReg(null);
                    if (regToDelete) {
                      handleDeleteRegistration(regToDelete.id, regToDelete.name);
                    }
                  }}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900 px-3 py-2 rounded-xl border border-red-200 dark:border-red-500/20 min-h-[40px]"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSelectedReg(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[40px]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveModalDetails}
                  disabled={savingNotes}
                  className="bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-black text-xs px-5 py-2 rounded-xl shadow-lg min-h-[40px]"
                >
                  {savingNotes ? 'Saving...' : 'Save Notes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Registration Modal */}
      {editingReg && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-3xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 p-2 rounded-xl">
                  <Pencil className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Edit Player Details</h3>
              </div>
              <button
                onClick={() => setEditingReg(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {editError && (
              <div className="bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-500/40 text-red-800 dark:text-red-200 text-xs p-3 rounded-2xl flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                <span>{editError}</span>
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Player Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white min-h-[40px] focus:outline-none focus:border-amber-500 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">WhatsApp Phone *</label>
                  <input
                    type="text"
                    required
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white min-h-[40px] focus:outline-none focus:border-amber-500 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Area / Suburb</label>
                  <input
                    type="text"
                    value={editForm.area}
                    onChange={(e) => setEditForm({ ...editForm, area: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white min-h-[40px] focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Skill Level</label>
                  <select
                    value={editForm.skillLevel}
                    onChange={(e) => setEditForm({ ...editForm, skillLevel: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white min-h-[40px] focus:outline-none focus:border-amber-500 font-bold"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Role</label>
                  <select
                    value={editForm.battingBowling}
                    onChange={(e) => setEditForm({ ...editForm, battingBowling: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white min-h-[40px] focus:outline-none focus:border-amber-500 font-bold"
                  >
                    <option value="Batsman">Batsman</option>
                    <option value="Bowler">Bowler</option>
                    <option value="All-Rounder">All-Rounder</option>
                    <option value="Wicketkeeper-Batsman">Wicketkeeper-Batsman</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Assigned Match</label>
                <select
                  value={editForm.matchId}
                  onChange={(e) => setEditForm({ ...editForm, matchId: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white min-h-[40px] focus:outline-none focus:border-amber-500 font-bold"
                >
                  {matches.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.title} ({m.date ? new Date(m.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : ''})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Player Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white min-h-[40px] focus:outline-none focus:border-amber-500 font-bold"
                  >
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="REGISTERED">Registered</option>
                    <option value="WAITLISTED">Waitlisted</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Payment Status</label>
                  <select
                    value={editForm.paymentStatus}
                    onChange={(e) => setEditForm({ ...editForm, paymentStatus: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white min-h-[40px] focus:outline-none focus:border-amber-500 font-bold"
                  >
                    <option value="PAID">Paid</option>
                    <option value="PENDING">Pending</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="REFUNDED">Refunded</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Payment Amount (₹)</label>
                  <input
                    type="number"
                    value={editForm.paymentAmount}
                    onChange={(e) => setEditForm({ ...editForm, paymentAmount: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white min-h-[40px] focus:outline-none focus:border-amber-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Payment Ref (UPI ID)</label>
                  <input
                    type="text"
                    value={editForm.reference}
                    onChange={(e) => setEditForm({ ...editForm, reference: e.target.value })}
                    placeholder="e.g. UPI/9876543210"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white min-h-[40px] focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Internal Admin Notes</label>
                <textarea
                  rows={2}
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  placeholder="Notes about payment, bat preferences, etc."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white min-h-[40px] focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingReg(null)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs min-h-[40px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="bg-amber-600 dark:bg-amber-500 hover:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-black text-xs px-5 py-2 rounded-xl shadow-lg disabled:opacity-50 min-h-[40px]"
                >
                  {editLoading ? 'Saving Changes...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manual Add Player Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-md rounded-3xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Add Player Registration</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white min-h-[36px] min-w-[36px] flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>

            {addError && (
              <div className="bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-500/40 text-red-800 dark:text-red-200 text-xs p-3 rounded-2xl flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                <span>{addError}</span>
              </div>
            )}

            {matches.length === 0 ? (
              <div className="space-y-4 py-4 text-center">
                <p className="text-xs text-amber-600 dark:text-amber-400 font-bold">
                  No active matches found in the database. Please create a match first before adding players.
                </p>
                <Link
                  href="/admin/matches/new"
                  className="inline-flex items-center space-x-2 bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl shadow-md min-h-[40px]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Match Now</span>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleAddRegistration} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Select Match *</label>
                  <select
                    required
                    value={newReg.matchId}
                    onChange={(e) => setNewReg({ ...newReg, matchId: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white min-h-[40px]"
                  >
                    {matches.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.title} ({m.date ? new Date(m.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : ''})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Player Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={newReg.name}
                    onChange={(e) => setNewReg({ ...newReg, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white min-h-[40px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">WhatsApp Phone Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={newReg.phone}
                    onChange={(e) => setNewReg({ ...newReg, phone: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white min-h-[40px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Area / Suburb</label>
                    <input
                      type="text"
                      placeholder="e.g. Sector 4"
                      value={newReg.area}
                      onChange={(e) => setNewReg({ ...newReg, area: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white min-h-[40px]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Skill Level</label>
                    <select
                      value={newReg.skillLevel}
                      onChange={(e) => setNewReg({ ...newReg, skillLevel: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white min-h-[40px]"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Payment Status</label>
                    <select
                      value={newReg.paymentStatus}
                      onChange={(e) => setNewReg({ ...newReg, paymentStatus: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white min-h-[40px]"
                    >
                      <option value="PAID">Paid</option>
                      <option value="PENDING">Pending</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Roster Status</label>
                    <select
                      value={newReg.status}
                      onChange={(e) => setNewReg({ ...newReg, status: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white min-h-[40px]"
                    >
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="REGISTERED">Registered</option>
                      <option value="WAITLISTED">Waitlisted</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Payment Ref (UPI Txn ID)</label>
                  <input
                    type="text"
                    placeholder="e.g. UPI/9876543210"
                    value={newReg.reference}
                    onChange={(e) => setNewReg({ ...newReg, reference: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white min-h-[40px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Admin Internal Notes</label>
                  <input
                    type="text"
                    placeholder="e.g. Paid in cash at ground / Right-hand batsman"
                    value={newReg.notes}
                    onChange={(e) => setNewReg({ ...newReg, notes: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white min-h-[40px]"
                  />
                </div>

                <div className="pt-3 flex justify-end space-x-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs min-h-[40px]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={addLoading}
                    className="bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-black text-xs px-5 py-2 rounded-xl shadow-lg disabled:opacity-50 min-h-[40px]"
                  >
                    {addLoading ? 'Adding Player...' : 'Add Player to Roster'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
