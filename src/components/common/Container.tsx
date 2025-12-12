import { ReactNode } from 'react';

export const Container = ({ children }: { children: ReactNode }) => (
  <div className="mx-auto flex min-h-screen flex-col bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
    <div className="mx-auto w-full max-w-3xl">{children}</div>
  </div>
);
