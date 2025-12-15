'use client';

import { useMemo, useState } from 'react';
import { Badge } from '../../../src/components/common/Badge';
import { Card } from '../../../src/components/common/Card';
import { PageHeader } from '../../../src/components/common/PageHeader';
import { orders as mockOrders } from '../../../src/mock/data';
import { OrderStatus } from '../../../src/types';

export default function CustomerOrdersPage() {
	const [orders, setOrders] = useState(mockOrders);
	const [expandedId, setExpandedId] = useState<string | null>(
		mockOrders[0]?.id ?? null
	);

	const sorted = useMemo(
		() => [...orders].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
		[orders]
	);

	const handleCancel = (id: string) =>
		setOrders((prev) =>
			prev.map((order) =>
				order.id === id
					? { ...order, status: 'CANCELED' as OrderStatus }
					: order
			)
		);

	return (
		<div className='space-y-6'>
			<PageHeader
				title='주문 내역'
				backHref='/customer/order'
			/>
			<Card className='divide-y divide-gray-100'>
				{sorted.map((order) => {
					const isOpen = expandedId === order.id;
					const orderDate = new Date(order.createdAt);
					const now = new Date();
					const cutoff = new Date(orderDate);
					cutoff.setHours(23, 50, 0, 0);
					const isSameDay =
						orderDate.toDateString() === now.toDateString();
					const isCancelable =
						order.status !== 'CANCELED' &&
						isSameDay &&
						now <= cutoff;

					return (
						<div
							key={order.id}
							className='space-y-3 py-3'>
							<div className='flex items-center justify-between gap-3'>
								<div className='space-y-1'>
									<p className='text-sm font-semibold text-gray-900'>
										주문번호 {order.id}
									</p>
									<p className='text-xs text-gray-500'>
										{new Date(
											order.createdAt
										).toLocaleString()}
									</p>
								</div>
								<div className='text-right'>
									<p className='font-semibold text-gray-900'>
										₩{order.totalPrice.toLocaleString()}
									</p>
									<div className='flex flex-col justify-end gap-2'>
										<button
											type='button'
											disabled={!isCancelable}
											onClick={() =>
												handleCancel(order.id)
											}
											className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors ${
												isCancelable
													? 'bg-amber-500 text-white hover:bg-amber-600'
													: 'cursor-not-allowed bg-gray-100 text-gray-400'
											}`}>
											취소하기
										</button>
									</div>
									{!isCancelable &&
										order.status !== 'CANCELED' && (
											<p className='mt-1 text-[11px] text-gray-500'>
												당일 23:50 이전에만 취소할 수
												있습니다.
											</p>
										)}
								</div>
							</div>
							<div className='space-y-2 rounded-lg bg-amber-50 p-3 text-sm text-gray-800'>
								<div className='space-y-1'>
									{order.items.map((item) => (
										<div
											key={item.menuId}
											className='flex items-center justify-between'>
											<p>
												<span>
													{item.name} {item.unitPrice}
													원 x {item.quantity}
												</span>
											</p>
										</div>
									))}
								</div>
								<div className='text-xs text-gray-600'>
									<p>
										배송지: {order.address.main}{' '}
										{order.address.detail}
									</p>
									<p>
										배송일{' '}
										{new Date(
											order.deliveryDate
										).toLocaleDateString()}
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</Card>
		</div>
	);
}
