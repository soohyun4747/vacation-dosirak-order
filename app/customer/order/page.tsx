'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Button } from '../../../src/components/common/Button';
import { Card } from '../../../src/components/common/Card';
import { Input } from '../../../src/components/common/Input';
import { PageHeader } from '../../../src/components/common/PageHeader';
import { useCart } from '../../../src/context/CartContext';
import { menuItems } from '../../../src/mock/menu';

type DeliveryDate = { label: string; displayDate: string; iso: string };

export default function CustomerOrderPage() {
	const { addToCart, totalCount, subtotal } = useCart();
	const [mainAddress, setMainAddress] = useState('');
	const [detail, setDetail] = useState('');
	const [entranceCode, setEntranceCode] = useState('');
	const [quantities, setQuantities] = useState<Record<string, number>>({});

	const deliveryDate: DeliveryDate = useMemo(() => {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		return {
			label: '내일',
			displayDate: `${tomorrow.getMonth() + 1}/${tomorrow.getDate()}`,
			iso: tomorrow.toISOString(),
		};
	}, []);

	const totalDisplay = useMemo(
		() => new Intl.NumberFormat('ko-KR').format(subtotal),
		[subtotal]
	);

	const handleAdd = (id: string, delta: number) => {
		setQuantities((prev) => ({
			...prev,
			[id]: Math.max(1, (prev[id] ?? 1) + delta),
		}));
	};

	const handleAddToCart = (menuId: string) => {
		const menu = menuItems.find((item) => item.id === menuId)!;
		const quantity = Math.max(1, quantities[menuId] ?? 1);
		addToCart(
			menu,
			quantity,
			deliveryDate.iso,
			`${deliveryDate.label} (${deliveryDate.displayDate})`
		);
	};

	return (
		<div className='space-y-6 pb-32'>
			<PageHeader
				title='도시락 주문'
				backHref='/'
			/>

			<Card className='space-y-4'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2 self-start'>
						<h2 className='font-bold text-amber-500'>배송지</h2>
					</div>
					<Button variant='secondary'>주소 검색</Button>
				</div>
				<div className='grid gap-2 md:grid-cols-2'>
					<div className='flex flex-col gap-1'>
						<p className='text-xs text-gray-600'>주소</p>
						<Input
							placeholder='배송지 주소를 입력하세요'
							value={mainAddress}
							onChange={(e) => setMainAddress(e.target.value)}
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<p className='text-xs text-gray-600'>상세주소</p>
						<Input
							placeholder='상세주소'
							value={detail}
							onChange={(e) => setDetail(e.target.value)}
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<p className='text-xs text-gray-600'>
							공동현관 비밀번호
						</p>
						<Input
							placeholder='공동현관 비밀번호 (선택)'
							value={entranceCode}
							onChange={(e) => setEntranceCode(e.target.value)}
						/>
					</div>
				</div>
			</Card>

			<Card className='space-y-2 border-amber-100 bg-amber-50 text-amber-900'>
				<h2 className='text-sm font-semibold'>주문 안내</h2>
				<p className='text-sm'>
					오후 5시까지 내일 도시락 주문을 받습니다. 배송일은{' '}
					{deliveryDate.displayDate} ({deliveryDate.label}) 입니다.
				</p>
			</Card>

			<Card className='space-y-3'>
				<div className='flex items-center gap-2'>
					<h2 className='font-bold text-amber-500'>이번주 식단표</h2>
				</div>
				<div className='overflow-hidden rounded-lg border border-amber-100'>
					<Image
						src={'/menu-notice.png'}
						alt='이번주 식단표'
						width={800}
						height={400}
						className='h-64 w-full object-cover'
					/>
				</div>
			</Card>

			<Card className='space-y-3'>
				<div className='flex items-center gap-2'>
					<h2 className='font-bold text-amber-500'>메뉴 선택</h2>
				</div>
				<div className='grid gap-3'>
					{menuItems.map((menu) => (
						<Card
							key={menu.id}
							className='flex flex-col gap-3 sm:flex-row'>
							<div className='flex flex-1 flex-col gap-3'>
								<div className='flex items-start justify-between gap-2'>
									<div>
										<p className='text-sm font-semibold text-gray-900'>
											{menu.name}
										</p>
										<p className='text-xs text-gray-500'>
											{menu.description}
										</p>
									</div>
									<span className='text-sm font-medium text-gray-900'>
										₩{menu.price.toLocaleString()}
									</span>
								</div>
								<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
									<div className='flex items-center gap-2'>
										<span className='text-xs font-semibold text-amber-700'>
											{deliveryDate.label} ·{' '}
											{deliveryDate.displayDate}
										</span>
									</div>
									<div className='flex items-center justify-between gap-3 sm:justify-end'>
										<div className='flex items-center gap-2'>
											<Button
												variant='secondary'
												onClick={() =>
													handleAdd(menu.id, -1)
												}>
												–
											</Button>
											<span className='w-8 text-center text-sm font-semibold'>
												{quantities[menu.id] ?? 1}
											</span>
											<Button
												variant='secondary'
												onClick={() =>
													handleAdd(menu.id, 1)
												}>
												+
											</Button>
										</div>
										<Button
											onClick={() =>
												handleAddToCart(menu.id)
											}
											disabled={!deliveryDate}>
											장바구니 담기
										</Button>
									</div>
								</div>
							</div>
						</Card>
					))}
				</div>
			</Card>

			<div className='fixed bottom-4 left-0 right-0 md:mx-auto mx-2 flex max-w-3xl items-center justify-between gap-3 rounded-2xl border border-amber-100 bg-white px-4 py-3 shadow-lg'>
				<div className='flex flex-col text-sm'>
					<span className='font-semibold text-gray-900'>
						장바구니 {totalCount}개
					</span>
					<span className='text-gray-600'>합계 ₩{totalDisplay}</span>
				</div>
				<Link href='/customer/cart'>
					<Button className='whitespace-nowrap'>
						장바구니로 이동
					</Button>
				</Link>
			</div>
		</div>
	);
}
