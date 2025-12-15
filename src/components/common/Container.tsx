import Image from 'next/image';
import { ReactNode } from 'react';

export const Container = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen flex-col bg-yellow-50/30">
    <header className="w-full bg-white shadow-sm">
      <div className="relative mx-auto flex h-[56px] max-w-3xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute left-4 sm:left-6 lg:left-8 h-[42px] w-[50px]">
          <Image src={'/logo.png'} alt={'logo'} fill />
        </div>
        <p className="self-center text-[18px] font-bold text-gray-900">부산 공공기관 도시락</p>
        <div />
      </div>
    </header>
    <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">{children}</div>
  </div>
);
