'use client';

import { ReactNode } from 'react';
import { AdminNavTabs } from '../../src/components/admin/AdminNavTabs';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4">
      <AdminNavTabs />
      {children}
    </div>
  );
}
