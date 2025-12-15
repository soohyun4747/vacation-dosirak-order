import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  title: string;
  description?: string;
  backHref?: string;
  actions?: ReactNode;
}

export const PageHeader = ({ title, description, backHref, actions }: Props) => (
  <div className="relative flex flex-col items-center gap-2 border-b border-gray-100 pb-4 text-center">
    {backHref && (
      <Link href={backHref} className="absolute left-0 top-1 text-sm text-amber-700 hover:underline">
        ← 돌아가기
      </Link>
    )}
    <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
    {description && <p className="text-sm text-gray-600">{description}</p>}
    {actions && <div className="flex items-center gap-2">{actions}</div>}
  </div>
);
