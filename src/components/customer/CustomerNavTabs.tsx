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
    <nav className="mb-6">
      <div className="flex gap-2 rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50 via-indigo-50 to-sky-50 p-2 shadow-inner">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex-1 rounded-xl border px-4 py-3 text-center text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-white text-sky-900 shadow-lg shadow-sky-100 border-transparent'
                  : 'border-transparent bg-white/60 text-sky-700 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow'
              }`}
            >
              <span className="block leading-tight">{tab.label}</span>
              {isActive && <span className="mt-1 block text-xs font-medium text-sky-600">이동 중</span>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
