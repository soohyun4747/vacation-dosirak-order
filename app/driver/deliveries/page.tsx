'use client';

import Link from 'next/link';
import { DragEvent, useMemo, useState } from 'react';
import { Badge } from '../../../src/components/common/Badge';
import { Button } from '../../../src/components/common/Button';
import { Card } from '../../../src/components/common/Card';
import { Input } from '../../../src/components/common/Input';
import { PageHeader } from '../../../src/components/common/PageHeader';
import { orders as mockOrders } from '../../../src/mock/data';
import { Order, OrderItem, OrderStatus } from '../../../src/types';

export default function DriverDeliveriesPage() {
	const [date, setDate] = useState(() =>
		new Date().toISOString().slice(0, 10)
	);
	const [orders, setOrders] = useState<Order[]>(() => [...mockOrders]);
	const [draggingId, setDraggingId] = useState<string | null>(null);

	const filteredOrders = useMemo(
    () =>
      orders.filter((order) => {
        const deliveryDate = new Date(order.deliveryDate).toISOString().slice(0, 10);
        return deliveryDate === date;
      }),
    [date, orders],
  );
  

	const menuTotals = useMemo(() => {
		const totals = new Map<string, number>();
		filteredOrders.forEach((order) => {
			order.items.forEach((item: OrderItem) => {
				totals.set(
					item.name,
					(totals.get(item.name) ?? 0) + item.quantity
				);
			});
		});

		return Array.from(totals.entries());
	}, [filteredOrders]);

	const completeDelivery = (orderId: string) => {
		setOrders((prev) =>
			prev.map((order) =>
				order.id === orderId
					? { ...order, status: 'DELIVERED' as OrderStatus }
					: order
			)
		);
	};

	const handleDragStart = (event: DragEvent<HTMLDivElement>, id: string) => {
		event.dataTransfer.effectAllowed = 'move';
		setDraggingId(id);
	};

	const handleDrop = (event: DragEvent<HTMLDivElement>, targetId: string) => {
		event.preventDefault();
		if (!draggingId || draggingId === targetId) return;

		setOrders((prev) => {
			const list = [...prev];
			const fromIndex = list.findIndex(
				(order) => order.id === draggingId
			);
			const toIndex = list.findIndex((order) => order.id === targetId);
			if (fromIndex === -1 || toIndex === -1) return prev;

			const [moved] = list.splice(fromIndex, 1);
			list.splice(toIndex, 0, moved);
			return list;
		});
		setDraggingId(null);
	};

	const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	};

	const resetDateToToday = () =>
		setDate(new Date().toISOString().slice(0, 10));

	return (
		<div className='space-y-6'>
			<PageHeader
				title='배송 목록'
			/>
			<Card className='flex items-center md:justify-between justify-center gap-2 text-sm'>
				<Input
					type='date'
					value={date}
					onChange={(e) => setDate(e.target.value)}
					className='max-w-xs'
				/>
				<Button onClick={resetDateToToday} className='w-[70px]'>오늘</Button>
			</Card>

			<Card className='space-y-2 text-sm'>
				<h2 className='text-sm font-semibold text-gray-900'>
					챙겨갈 메뉴 총합
				</h2>
				{menuTotals.length === 0 && (
					<p className='text-gray-600'>
						선택한 날짜의 주문이 없습니다.
					</p>
				)}
				{menuTotals.length > 0 && (
					<div className='flex flex-wrap gap-3'>
						{menuTotals.map(([name, quantity]) => (
							<span
								key={name}
								className='rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800'>
								{name} x {quantity}
							</span>
						))}
					</div>
				)}
			</Card>

			<Card className='divide-y divide-gray-100'>
				{filteredOrders.length === 0 && (
					<p className='py-3 text-sm text-gray-600'>
						선택한 날짜의 배송이 없습니다.
					</p>
				)}
				{filteredOrders.map((order) => (
					<div
						key={order.id}
						draggable
						onDragStart={(event) =>
							handleDragStart(event, order.id)
						}
						onDragOver={handleDragOver}
						onDrop={(event) => handleDrop(event, order.id)}
						className={`space-y-4 py-3 transition-colors ${
							draggingId === order.id ? 'bg-amber-50' : ''
						}`}>
						<div className='flex items-start justify-between gap-3'>
							<div className='flex flex-col gap-1'>
								<p className='text-sm font-semibold text-gray-900'>
									{order.customerName}{' '}
								</p>
								<p className='text-sm text-gray-600'>
									{order.address.main}
								</p>
								<p className='text-sm text-gray-600'>
									상세주소: {order.address.detail}
								</p>
								{order.address.entranceCode && (
									<p className='text-sm text-gray-600'>
										공동현관 비밀번호:{' '}
										{order.address.entranceCode}
									</p>
								)}
								<Link
									className='text-amber-700 underline text-sm'
									href={`/driver/deliveries/${order.id}`}>
									상세보기
								</Link>
							</div>
							<div className='flex flex-col items-center gap-2 text-sm'>
								{order.status && (
									<Badge status={order.status} />
								)}

								<Button
									className='px-3 py-1 text-sm'
									onClick={() => completeDelivery(order.id)}
									disabled={order.status === 'DELIVERED'}>
									배송 완료
								</Button>
							</div>
						</div>
						<div className='rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700 flex flex-col gap-1'>
							<p className='mb-1 font-semibold text-gray-900'>
								주문 메뉴
							</p>
							<div className='flex flex-wrap gap-2'>
								{order.items.map((item) => (
									<span
										key={item.menuId}
										className='rounded-full bg-white px-3 py-1 shadow-sm'>
										{item.name} x {item.quantity}
									</span>
								))}
							</div>
						</div>
					</div>
				))}
			</Card>
		</div>
	);
}
