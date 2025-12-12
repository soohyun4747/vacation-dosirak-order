import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  title: string;
  description?: string;
  backHref?: string;
  actions?: ReactNode;
}

export const PageHeader = ({ title, description, backHref, actions }: Props) => (
  <div className="flex flex-col gap-2 border-b border-gray-100 pb-4">
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        {backHref && (
          <Link href={backHref} className="text-sm text-blue-600 hover:underline">
            ← 돌아가기
          </Link>
        )}
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
    {description && <p className="text-sm text-gray-600">{description}</p>}
  </div>
);
