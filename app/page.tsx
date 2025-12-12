'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../src/components/common/Button';
import { Card } from '../src/components/common/Card';
import { Input } from '../src/components/common/Input';
import { PageHeader } from '../src/components/common/PageHeader';
import { mockUsers } from '../src/mock/users';

export default function Home() {
	const router = useRouter();
	const defaultUser = useMemo(() => mockUsers[0], []);
	const [email, setEmail] = useState(defaultUser?.email ?? '');
	const [password, setPassword] = useState(defaultUser?.password ?? '');
	const [error, setError] = useState('');

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const matched = mockUsers.find(
			(user) =>
				user.email === email.trim() && user.password === password.trim()
		);

		if (matched) {
			setError('');
			router.push(matched.redirect);
			return;
		}

		setError(
			'이메일 혹은 비밀번호가 올바르지 않습니다. 아래의 테스트 계정 정보를 확인해주세요.'
		);
	};

	return (
		<div className='flex flex-col justify-center items-center gap-6'>
			<PageHeader title='로그인' />

			<Card className='md:w-[360px]'>
				<form
					onSubmit={handleSubmit}
					className='space-y-4'>
					<div className='space-y-2'>
						<label
							className='text-sm font-medium text-gray-800'
							htmlFor='email'>
							이메일
						</label>
						<Input
							id='email'
							name='email'
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							placeholder='mock 계정 이메일'
							type='email'
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

					<Button
						type='submit'
						className='w-full'>
						로그인하고 이동하기
					</Button>
				</form>
			</Card>
		</div>
	);
}
