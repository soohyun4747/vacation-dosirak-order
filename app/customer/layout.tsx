'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { CustomerNavTabs } from '../../src/components/customer/CustomerNavTabs';

export default function CustomerLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isSignupPage = pathname.startsWith('/customer/signup');

  return (
    <div className="space-y-4">
      {!isSignupPage && <CustomerNavTabs />}
      {children}
    </div>
  );
}
