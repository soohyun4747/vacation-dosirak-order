import { ReactNode } from 'react';

export const Container = ({ children }: { children: ReactNode }) => (
  <div className="mx-auto flex min-h-screen flex-col bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <header className="text-center">
        <p className="text-lg font-bold text-gray-900">부산 시청 도시락 주문</p>
      </header>
      {children}
    </div>
  </div>
);
