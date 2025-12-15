'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
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

const ORDERS_PER_PAGE = 10;
const MENUS_PER_PAGE = 6;

type PaginationProps = {
	page: number;
	totalCount: number;
	perPage: number;
	onChange: (page: number) => void;
};

const PaginationControls = ({
	page,
	totalCount,
	perPage,
	onChange,
}: PaginationProps) => {
	const totalPages = Math.max(1, Math.ceil(totalCount / perPage));
	const pageStart = totalCount === 0 ? 0 : (page - 1) * perPage + 1;
	const pageEnd = Math.min(page * perPage, totalCount);

	return (
		<div className='flex items-center justify-between text-xs text-gray-600'>
			<span>
				{totalCount === 0
					? '표시할 데이터가 없습니다.'
					: `${pageStart}-${pageEnd} / ${totalCount}`}
			</span>
			<div className='flex items-center gap-2'>
				<Button
					variant='ghost'
					disabled={page === 1}
					onClick={() => onChange(page - 1)}>
					이전
				</Button>
				<span className='font-medium text-gray-700'>
					{page} / {totalPages}
				</span>
				<Button
					variant='ghost'
					disabled={page === totalPages || totalCount === 0}
					onClick={() => onChange(page + 1)}>
					다음
				</Button>
			</div>
		</div>
	);
};

export default function AdminOrdersPage() {
	const [orders] = useState(mockOrders);
	const [status, setStatus] = useState<(typeof statusOptions)[number]>('ALL');
	const [keyword, setKeyword] = useState('');
	const [todayOnly, setTodayOnly] = useState(false);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [orderPage, setOrderPage] = useState(1);
	const [menuPage, setMenuPage] = useState(1);

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

	const menuTotals = useMemo(() => {
		const totals = new Map<string, { name: string; quantity: number }>();
		filtered.forEach((order) => {
			order.items.forEach((item) => {
				const current = totals.get(item.menuId);
				totals.set(item.menuId, {
					name: item.name,
					quantity: (current?.quantity ?? 0) + item.quantity,
				});
			});
		});
		return Array.from(totals.values());
	}, [filtered]);

	const orderTotalPages = Math.max(
		1,
		Math.ceil(filtered.length / ORDERS_PER_PAGE)
	);
	const menuTotalPages = Math.max(
		1,
		Math.ceil(menuTotals.length / MENUS_PER_PAGE)
	);
	const currentOrderPage = Math.min(orderPage, orderTotalPages);
	const currentMenuPage = Math.min(menuPage, menuTotalPages);

	const paginatedOrders = useMemo(() => {
		const start = (currentOrderPage - 1) * ORDERS_PER_PAGE;
		return filtered.slice(start, start + ORDERS_PER_PAGE);
	}, [currentOrderPage, filtered]);

	const paginatedMenuTotals = useMemo(() => {
		const start = (currentMenuPage - 1) * MENUS_PER_PAGE;
		return menuTotals.slice(start, start + MENUS_PER_PAGE);
	}, [currentMenuPage, menuTotals]);

	const handleOrderPageChange = (nextPage: number) => {
		const clamped = Math.min(Math.max(1, nextPage), orderTotalPages);
		setOrderPage(clamped);
	};

	return (
		<div className='space-y-6'>
			<PageHeader
				title='주문 관리'
			/>

			<Card className='flex flex-wrap gap-3 text-sm'>
				<div className='flex md:flex-row flex-col-reverse md:justify-between w-full gap-4'>
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

			<Card className='text-sm'>
				<table className='w-full text-left text-gray-700'>
					<thead className='bg-gray-50 text-xs uppercase text-gray-500'>
						<tr>
							<th className='px-4 py-2'>메뉴</th>
							<th className='px-4 py-2 text-right'>총 수량</th>
						</tr>
					</thead>
					<tbody>
						{paginatedMenuTotals.map((item) => (
							<tr
								key={item.name}
								className='border-t border-gray-100'>
								<td className='px-4 py-2 font-medium'>
									{item.name}
								</td>
								<td className='px-4 py-2 text-right text-gray-900'>
									{item.quantity.toLocaleString()}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</Card>

			<Card className='text-sm'>
				<div className='flex items-center justify-between border-b border-gray-100 px-4 py-3'>
					<h3 className='text-base font-semibold text-gray-900'>
						주문 목록
					</h3>
					<span className='text-xs text-gray-500'>
						총 {filtered.length}건
					</span>
				</div>
				<div className='space-y-4 p-4'>
					<div className='overflow-auto'>
						<table className='w-max text-left text-gray-700'>
							<thead className='bg-gray-50 text-xs uppercase text-gray-500'>
								<tr>
									<th className='px-4 py-2'>주문일</th>
									<th className='px-4 py-2'>주문번호</th>
									<th className='px-4 py-2'>고객</th>
									<th className='px-4 py-2'>주소</th>
									<th className='px-4 py-2 text-right'>
										상세
									</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-gray-100'>
								{paginatedOrders.map((order) => (
									<tr
										key={order.id}
										className='align-top'>
										<td className='px-4 py-3 text-xs text-gray-600'>
											{new Date(
												order.createdAt
											).toLocaleString()}
										</td>
										<td className='px-4 py-3 font-semibold text-gray-900'>
											{order.id}
										</td>
										<td className='px-4 py-3'>
											<div className='font-medium text-gray-900'>
												{order.customerName}
											</div>
											<div className='text-xs text-gray-500'>
												{order.customerPhone}
											</div>
										</td>
										<td className='px-4 py-3 text-xs text-gray-600'>
											{order.address.main}
										</td>
										<td className='px-4 py-3 text-right'>
											<Link
												className='text-amber-700 underline'
												href={`/admin/orders/${order.id}`}>
												상세보기
											</Link>
										</td>
									</tr>
								))}
								{filtered.length === 0 && (
									<tr>
										<td
											className='px-4 py-6 text-center text-sm text-gray-500'
											colSpan={5}>
											선택한 조건에 해당하는 주문이
											없습니다.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>

					<PaginationControls
						page={currentOrderPage}
						totalCount={filtered.length}
						perPage={ORDERS_PER_PAGE}
						onChange={handleOrderPageChange}
					/>
				</div>
			</Card>
		</div>
	);
}
