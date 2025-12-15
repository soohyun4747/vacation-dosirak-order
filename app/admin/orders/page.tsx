'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Badge } from '../../../src/components/common/Badge';
import { Button } from '../../../src/components/common/Button';
import { Card } from '../../../src/components/common/Card';
import { Input } from '../../../src/components/common/Input';
import { PageHeader } from '../../../src/components/common/PageHeader';
import { Select } from '../../../src/components/common/Select';
import { orders as mockOrders } from '../../../src/mock/data';
import { OrderStatus } from '../../../src/types';

const statusOptions: (OrderStatus | 'ALL')[] = [
	'ALL',
	'CONFIRMED',
	'CANCELED',
	'DELIVERED',
];

export default function AdminOrdersPage() {
	const [orders] = useState(mockOrders);
	const [status, setStatus] = useState<(typeof statusOptions)[number]>('ALL');
	const [keyword, setKeyword] = useState('');
	const [todayOnly, setTodayOnly] = useState(false);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	const filtered = useMemo(() => {
		return orders.filter((order) => {
			const matchesStatus = status === 'ALL' || order.status === status;
			const matchesKeyword =
				order.customerName.includes(keyword) ||
				order.customerPhone.includes(keyword) ||
				order.id.includes(keyword);
			const matchesDate =
				!todayOnly ||
				new Date(order.createdAt).toDateString() ===
					new Date().toDateString();
			const createdAt = new Date(order.createdAt);
			const matchesStart =
				!startDate || createdAt >= new Date(`${startDate}T00:00:00`);
			const matchesEnd =
				!endDate || createdAt <= new Date(`${endDate}T23:59:59`);
			return (
				matchesStatus &&
				matchesKeyword &&
				matchesDate &&
				matchesStart &&
				matchesEnd
			);
		});
	}, [endDate, keyword, orders, startDate, status, todayOnly]);

	return (
		<div className='space-y-6'>
			<PageHeader
				title='주문 관리'
				backHref='/'
			/>

			<Card className='flex flex-wrap gap-3 text-sm'>
				<div className='flex justify-between w-full'>
					<div className='flex items-center gap-2'>
						<Input
							type='date'
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
						/>
						<span className='text-xs text-gray-500'>~</span>
						<Input
							type='date'
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
						/>
					</div>
					<Button
						variant={todayOnly ? 'primary' : 'secondary'}
						onClick={() => setTodayOnly((p) => !p)}>
						{todayOnly ? '오늘만 보기' : '전체 보기'}
					</Button>
				</div>
				<Select
					value={status}
					onChange={(e) =>
						setStatus(e.target.value as OrderStatus | 'ALL')
					}>
					{statusOptions.map((s) => (
						<option
							key={s}
							value={s}>
							{s}
						</option>
					))}
				</Select>
				<Input
					placeholder='이름/전화번호/주문번호 검색'
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					className='flex-1'
				/>
			</Card>

			<Card className='divide-y divide-gray-100 text-sm'>
				<div className='grid grid-cols-8 gap-2 pb-2 font-semibold text-gray-700'>
					<span className='col-span-2'>주문일</span>
					<span className='col-span-2'>주문번호</span>
					<span className='col-span-2'>고객</span>
					<span>주소</span>
					<span className='text-right'>상세</span>
				</div>
				{filtered.map((order) => (
					<div
						key={order.id}
						className='grid grid-cols-8 items-center gap-2 py-2'>
						<span className='text-xs text-gray-600 col-span-2'>
							{new Date(order.createdAt).toLocaleString()}
						</span>
						<span className='font-semibold text-gray-900 col-span-2'>
							{order.id}
						</span>
						<span className='col-span-2 text-gray-700'>
							{order.customerName}
							<br />
							<span className='text-xs text-gray-500'>
								{order.customerPhone}
							</span>
						</span>
						<span className='text-xs text-gray-600'>
							{order.address.main}
						</span>
						<div className='flex items-center justify-end gap-2'>
							<Link
								className='text-amber-700 underline'
								href={`/admin/orders/${order.id}`}>
								상세보기
							</Link>
						</div>
					</div>
				))}
			</Card>
		</div>
	);
}
