'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../src/components/common/Button';
import { Card } from '../src/components/common/Card';
import { Input } from '../src/components/common/Input';
import { mockUsers } from '../src/mock/users';

export default function Home() {
	const router = useRouter();
	const defaultUser = useMemo(() => mockUsers[0], []);
	const [userId, setUserId] = useState(defaultUser?.id ?? '');
	const [password, setPassword] = useState(defaultUser?.password ?? '');
	const [error, setError] = useState('');

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const matched = mockUsers.find(
			(user) =>
				user.id === userId.trim() && user.password === password.trim()
		);

		if (matched) {
			setError('');
			router.push(matched.redirect);
			return;
		}

		setError(
			'아이디 혹은 비밀번호가 올바르지 않습니다. 아래의 테스트 계정 정보를 확인해주세요.'
		);
	};

	return (
		<div className='flex flex-col justify-center items-center gap-6'>
			<Card className='md:w-[360px] w-full'>
				<p className='w-full text-center mb-4 text-lg font-semibold text-gray-600'>
					로그인
				</p>
				<form
					onSubmit={handleSubmit}
					className='space-y-4'>
					<div className='space-y-2'>
						<label
							className='text-sm font-medium text-gray-800'
							htmlFor='userId'>
							아이디
						</label>
						<Input
							id='userId'
							name='userId'
							value={userId}
							onChange={(event) => setUserId(event.target.value)}
							placeholder='mock 계정 아이디'
							type='text'
							required
						/>
					</div>

					<div className='space-y-2'>
						<label
							className='text-sm font-medium text-gray-800'
							htmlFor='password'>
							비밀번호
						</label>
						<Input
							id='password'
							name='password'
							value={password}
							onChange={(event) =>
								setPassword(event.target.value)
							}
							placeholder='mock 계정 비밀번호'
							type='password'
							required
						/>
					</div>

					{error && <p className='text-sm text-red-600'>{error}</p>}

					<div className='space-y-2'>
						<Button
							type='submit'
							className='w-full'>
							로그인하고 이동하기
						</Button>

						<div className='flex gap-2'>
							<Button
								type='button'
								variant='secondary'
								className='w-1/2'
								onClick={() => router.push('/customer/signup')}>
								회원가입
							</Button>
							<Button
								type='button'
								variant='ghost'
								className='w-1/2 text-xs'
								onClick={() => router.push('/forgot-password')}>
								아이디/비밀번호 찾기
							</Button>
						</div>
					</div>
				</form>
			</Card>
		</div>
	);
}
