import { ReactNode } from 'react';
import { CustomerNavTabs } from '@/src/components/customer/CustomerNavTabs';

export default function CustomerWithTabsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4">
      <CustomerNavTabs />
      {children}
    </div>
  );
}
