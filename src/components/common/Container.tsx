import { ReactNode } from 'react';

export const Container = ({ children }: { children: ReactNode }) => (
  <div className="mx-auto flex min-h-screen flex-col bg-yellow-50/30 px-4 py-6 sm:px-6 lg:px-8">
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <header className="flex items-center gap-3 text-left">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-2xl shadow-md">
          🍱
        </div>
        <p className="text-lg font-bold text-gray-900">부산 공공기관 도시락</p>
      </header>
      {children}
    </div>
  </div>
);
