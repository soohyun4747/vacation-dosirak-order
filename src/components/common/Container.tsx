'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { Button } from './Button';

export const Container = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const pathname = usePathname();

	const showLogout =
		pathname.startsWith('/customer') ||
		pathname.startsWith('/admin') ||
		pathname.startsWith('/driver');

	const handleLogout = () => router.push('/');

	return (
		<div className='flex min-h-screen flex-col bg-yellow-50/30'>
			<header className='w-full bg-white shadow-sm'>
				<div className='relative mx-auto flex h-[56px] max-w-3xl items-center justify-center px-4 sm:px-6 lg:px-8'>
					<div className='absolute left-4 sm:left-6 lg:left-8 h-[42px] w-[50px]'>
						<Image
							src={'/logo.png'}
							alt={'logo'}
							fill
						/>
					</div>
					<p className='self-center font-bold text-gray-800'>
						부산 공공기관 도시락
					</p>
					{showLogout && (
						<div className='absolute right-4 sm:right-6 lg:right-8'>
							<p className='text-sm text-amber-600' onClick={handleLogout}>로그아웃</p>
						</div>
					)}
				</div>
			</header>
			<div className='mx-auto w-full max-w-3xl space-y-6 px-4 py-6 sm:px-6 lg:px-8'>
				{children}
			</div>
		</div>
	);
};
