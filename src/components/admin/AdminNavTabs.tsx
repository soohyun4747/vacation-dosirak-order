'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/admin/orders', label: '주문관리' },
  { href: '/admin/shipping', label: '배송관리' },
  { href: '/admin/meal-plans', label: '식단표관리' },
];

export const AdminNavTabs = () => {
  const pathname = usePathname();

  return (
    <nav className="mb-4">
      <div className="flex rounded-xl border border-amber-100 bg-white p-1 shadow-sm">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 rounded-lg px-3 py-2 text-center text-sm font-medium transition-colors ${
                isActive ? 'bg-amber-500 text-white shadow-sm' : 'text-gray-700 hover:bg-amber-50'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
