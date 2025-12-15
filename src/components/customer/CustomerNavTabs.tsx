'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/customer/order', label: '주문하기' },
  { href: '/customer/orders', label: '주문내역' },
  { href: '/customer/profile', label: '프로필' },
];

export const CustomerNavTabs = () => {
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
