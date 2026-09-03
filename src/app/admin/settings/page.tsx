'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import PaymentQrImage from '@/components/PaymentQrImage';
import { Save, Upload, CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({
    communityName: 'Weekend Animal',
    communityDescription: 'Join our local weekend cricket community, meet new players and enjoy a game every weekend.',
    googleFormUrl: 'https://forms.google.com/sample-cricket-registration',
    paymentQrCodeUrl: '/images/Weekend-animal.jpg',
    upiId: 'deepuverma124124-1@okicici',
    paymentConfirmationUrl: 'https://wa.me/919876543210?text=Hi!%20I%20have%20completed%20the%20payment.',
    whatsappGroupUrl: 'https://chat.whatsapp.com/sample-group',
    contactWhatsappNumber: '+91 98765 43210',
    contactEmail: 'organizer@weekendcricket.com',
    googleMapsUrl: 'https://maps.google.com',
    showPublicPlayerNames: 'true',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (res.ok && data.settings) {
          setSettings(data.settings);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) return;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 500;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
        }

        // Convert to lightweight JPEG data URL
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        handleChange('paymentQrCodeUrl', compressedDataUrl);
      };
      img.src = event.target.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError('');

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) {
        throw new Error('Failed to save settings');
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error saving settings';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 text-center text-slate-500 dark:text-slate-400 font-bold text-sm">Loading site settings...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl 2xl:max-w-6xl tv-container mx-auto space-y-6">
        
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Website &amp; QR Settings</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Update Google Form link, payment QR image, UPI ID, and WhatsApp invite links.
          </p>
        </div>

        {success && (
          <div className="bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/50 text-emerald-800 dark:text-emerald-300 text-xs p-4 rounded-2xl flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Settings saved successfully! Public website updated immediately.</span>
          </div>
        )}

        {error && (
          <div className="bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-500/40 text-red-800 dark:text-red-200 text-xs p-4 rounded-2xl flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-8 space-y-8 shadow-xs">
          
          {/* Section 1: Community Details */}
          <div className="space-y-4">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              Community Identity
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Community Name *</label>
                <input
                  type="text"
                  required
                  value={settings.communityName}
                  onChange={(e) => handleChange('communityName', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none min-h-[42px]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Public Player Names Roster</label>
                <select
                  value={settings.showPublicPlayerNames}
                  onChange={(e) => handleChange('showPublicPlayerNames', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none min-h-[42px]"
                >
                  <option value="true">Enable Public Display (First Name + Last Initial)</option>
                  <option value="false">Disable Public Player Names</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Community Tagline / Description</label>
                <textarea
                  rows={2}
                  value={settings.communityDescription}
                  onChange={(e) => handleChange('communityDescription', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Links & Google Form */}
          <div className="space-y-4">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              Registration &amp; WhatsApp Links
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="md:col-span-2">
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Google Form URL * <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-normal">(Used by &quot;Join Next Match&quot; CTA)</span>
                </label>
                <input
                  type="url"
                  required
                  value={settings.googleFormUrl}
                  onChange={(e) => handleChange('googleFormUrl', e.target.value)}
                  placeholder="https://forms.google.com/..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none min-h-[42px]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">WhatsApp Group URL *</label>
                <input
                  type="url"
                  required
                  value={settings.whatsappGroupUrl}
                  onChange={(e) => handleChange('whatsappGroupUrl', e.target.value)}
                  placeholder="https://chat.whatsapp.com/..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none min-h-[42px]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Payment Confirmation URL</label>
                <input
                  type="url"
                  required
                  value={settings.paymentConfirmationUrl}
                  onChange={(e) => handleChange('paymentConfirmationUrl', e.target.value)}
                  placeholder="https://wa.me/... or Google Form URL"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none min-h-[42px]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: QR Code & UPI Details */}
          <div className="space-y-4">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              Payment QR Code &amp; UPI
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs items-start">
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">UPI ID *</label>
                  <input
                    type="text"
                    required
                    value={settings.upiId}
                    onChange={(e) => handleChange('upiId', e.target.value)}
                    placeholder="deepuverma124124-1@okicici"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none font-mono min-h-[42px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Upload &amp; Auto-Compress QR Image
                  </label>
                  <label className="flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-500/40 rounded-xl px-4 py-2.5 cursor-pointer text-emerald-800 dark:text-emerald-300 font-bold transition-colors min-h-[44px]">
                    <Upload className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Upload QR Image File (Auto-Optimized)</span>
                    <input type="file" accept="image/*" onChange={handleQrUpload} className="hidden" />
                  </label>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    Any image size (e.g. 5MB photo) will be automatically compressed to high-speed ~20KB format.
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    OR Direct Image URL / Base64 Data
                  </label>
                  <input
                    type="text"
                    value={settings.paymentQrCodeUrl}
                    onChange={(e) => handleChange('paymentQrCodeUrl', e.target.value)}
                    placeholder="https://... or data:image/png;base64,..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none font-mono text-[11px] min-h-[42px] truncate"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => handleChange('paymentQrCodeUrl', '/images/Weekend-animal.jpg')}
                    className="inline-flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Default QR Image</span>
                  </button>
                </div>
              </div>

              {/* QR Image Preview */}
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Current Live Preview</span>
                <div className="bg-white p-4 rounded-xl max-w-[200px] mx-auto border border-slate-200 shadow-xs">
                  <PaymentQrImage src={settings.paymentQrCodeUrl} alt="Payment QR Preview" />
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center space-x-2 bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-black text-xs sm:text-sm px-7 sm:px-8 py-3 sm:py-3.5 rounded-xl shadow-xl transition-all disabled:opacity-50 min-h-[48px]"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving Settings...' : 'Save Settings'}</span>
            </button>
          </div>

        </form>

      </div>
    </AdminLayout>
  );
}
