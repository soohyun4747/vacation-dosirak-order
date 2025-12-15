import { ReactNode } from 'react';

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return <div className="space-y-6">{children}</div>;
}
