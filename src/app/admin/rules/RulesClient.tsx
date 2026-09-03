'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

interface RuleItem {
  id: string;
  text: string;
  displayOrder: number;
  published: boolean;
}

export default function RulesClient({ initialRules }: { initialRules: RuleItem[] }) {
  const [rules, setRules] = useState<RuleItem[]>(initialRules);
  const [editingRule, setEditingRule] = useState<RuleItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingRule({
      id: '',
      text: '',
      displayOrder: rules.length + 1,
      published: true,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRule) return;

    try {
      if (isNew) {
        const res = await fetch('/api/admin/rules', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingRule),
        });
        const data = await res.json();
        if (res.ok && data.rule) {
          setRules([...rules, data.rule]);
        }
      } else {
        const res = await fetch(`/api/admin/rules/${editingRule.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingRule),
        });
        if (res.ok) {
          setRules(rules.map((r) => (r.id === editingRule.id ? editingRule : r)));
        }
      }
      setEditingRule(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this rule?')) return;
    try {
      const res = await fetch(`/api/admin/rules/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setRules(rules.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleOpenAdd}
          className="bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Rule</span>
        </button>
      </div>

      <div className="space-y-3">
        {rules.map((r) => (
          <div
            key={r.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between space-x-4 shadow-xs"
          >
            <div className="flex items-center space-x-3">
              <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-1 rounded border border-emerald-300 dark:border-emerald-500/30">
                #{r.displayOrder}
              </span>
              <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">{r.text}</p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => {
                  setIsNew(false);
                  setEditingRule(r);
                }}
                className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(r.id)}
                className="p-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900 text-red-600 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-500/20"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingRule && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-md rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{isNew ? 'Add Rule' : 'Edit Rule'}</h3>
              <button onClick={() => setEditingRule(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Rule Text *</label>
                <textarea
                  rows={3}
                  required
                  value={editingRule.text}
                  onChange={(e) => setEditingRule({ ...editingRule, text: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Display Order</label>
                <input
                  type="number"
                  value={editingRule.displayOrder}
                  onChange={(e) => setEditingRule({ ...editingRule, displayOrder: parseInt(e.target.value, 10) })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingRule(null)}
                  className="px-4 py-2 rounded-xl text-slate-500 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 font-black px-5 py-2 rounded-xl shadow-lg"
                >
                  Save Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
