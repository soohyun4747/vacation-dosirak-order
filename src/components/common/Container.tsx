import Image from 'next/image';
import { ReactNode } from 'react';

export const Container = ({ children }: { children: ReactNode }) => (
	<div className='mx-auto flex min-h-screen flex-col bg-yellow-50/30 px-4 py-6 sm:px-6 lg:px-8'>
		<div className='mx-auto w-full max-w-3xl space-y-6'>
			<header className='flex items-center justify-center text-left relative h-[50px]'>
				<div className='w-[50px] h-[42px] absolute left-0'>
					<Image
						src={'/logo.png'}
						alt={'logo'}
						fill
					/>
				</div>
				<p className='text-[18px] font-bold text-gray-900 self-center'>
					부산 공공기관 도시락
				</p>
				<div />
			</header>
			{children}
		</div>
	</div>
);
