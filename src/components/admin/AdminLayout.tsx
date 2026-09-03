'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Users,
  CreditCard,
  Settings as SettingsIcon,
  HelpCircle,
  Shield,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

interface AdminLayoutProps {
  children: React.ReactNode;
  userEmail?: string;
}

export default function AdminLayout({ children, userEmail }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Matches', href: '/admin/matches', icon: Calendar },
    { label: 'Registrations / Players', href: '/admin/registrations', icon: Users },
    { label: 'Payments Queue', href: '/admin/payments', icon: CreditCard },
    { label: 'Site & QR Settings', href: '/admin/settings', icon: SettingsIcon },
    { label: 'Manage FAQs', href: '/admin/faqs', icon: HelpCircle },
    { label: 'Community Rules', href: '/admin/rules', icon: Shield },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row font-sans transition-colors duration-200">
      
      {/* Sidebar for Desktop & Ultra-wide */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 2xl:w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-5 lg:p-6 shrink-0 justify-between">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center text-slate-950 font-black text-lg shrink-0">
                🏏
              </div>
              <div className="truncate">
                <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white block truncate">Weekend Cricket</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider block truncate">
                  {userEmail || 'Admin Portal'}
                </span>
              </div>
            </div>
          </div>

          {/* Theme Toggle Button */}
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Theme</span>
            <ThemeToggle />
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl font-bold text-xs lg:text-sm transition-all min-h-[44px] ${
                    isActive
                      ? 'bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[42px]"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-4 h-4 shrink-0" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 text-xs sm:text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 p-3 rounded-xl border border-red-200 dark:border-red-500/20 transition-colors min-h-[44px]"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Top Mobile Bar */}
      <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-3.5 sm:p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-2">
          <span className="text-xl">🏏</span>
          <span className="font-extrabold text-sm text-slate-900 dark:text-white">Admin Portal</span>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 space-y-3 max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-xl text-xs font-bold min-h-[44px] ${
                    isActive
                      ? 'bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs font-bold">
            <Link href="/" target="_blank" className="text-emerald-600 dark:text-emerald-400 py-2">
              View Public Website →
            </Link>
            <button onClick={handleLogout} className="text-red-600 dark:text-red-400 py-2">
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 2xl:p-10 overflow-y-auto max-w-full">{children}</main>

    </div>
  );
}
