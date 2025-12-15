'use client';

import { useMemo, useState } from 'react';
import { Badge } from '../../../src/components/common/Badge';
import { Card } from '../../../src/components/common/Card';
import { Input } from '../../../src/components/common/Input';
import { PageHeader } from '../../../src/components/common/PageHeader';
import { Select } from '../../../src/components/common/Select';
import {
	drivers as mockDrivers,
	orders as mockOrders,
} from '../../../src/mock/data';
import { Driver } from '../../../src/types';

export default function AdminShippingPage() {
	const [orders, setOrders] = useState(mockOrders);
	const [deliveryDate, setDeliveryDate] = useState('');
	const [driverKeyword, setDriverKeyword] = useState('');

	const filteredDrivers = useMemo(
		() =>
			mockDrivers.filter(
				(driver) =>
					driver.name.includes(driverKeyword) ||
					driver.phone.includes(driverKeyword)
			),
		[driverKeyword]
	);

	const filteredOrders = useMemo(() => {
		return orders.filter((order) => {
			if (!deliveryDate) return true;
			const orderDate = new Date(order.deliveryDate)
				.toISOString()
				.slice(0, 10);
			return orderDate === deliveryDate;
		});
	}, [deliveryDate, orders]);

	const handleAssign = (orderId: string, driverId: string) => {
		const selected = mockDrivers.find((driver) => driver.id === driverId);
		if (!selected) return;
		setOrders((prev) =>
			prev.map((order) =>
				order.id === orderId
					? {
							...order,
							driverId: selected.id,
							driverName: selected.name,
					  }
					: order
			)
		);
	};

	return (
		<div className='space-y-6'>
			<PageHeader
				title='배송 관리'
				backHref='/admin/orders'
			/>

			<Card className='flex flex-wrap items-center gap-5 text-sm'>
				<div className='flex items-center gap-2'>
					<span className='text-xs text-gray-500 w-[46px]'>
						배송일
					</span>
					<Input
						type='date'
						value={deliveryDate}
						onChange={(e) => setDeliveryDate(e.target.value)}
						className='w-40'
					/>
				</div>
				<div className='flex items-center gap-2'>
					<span className='text-xs text-gray-500 w-[112px]'>
						배정 기사 검색
					</span>
					<Input
						placeholder='이름/전화번호 검색'
						value={driverKeyword}
						onChange={(e) => setDriverKeyword(e.target.value)}
						className='w-56'
					/>
				</div>
			</Card>

			<Card className='text-sm'>
				<div className='overflow-auto'>
					<table className='w-full text-left text-gray-700'>
						<thead className='bg-gray-50 text-xs uppercase text-gray-500'>
							<tr>
								<th className='px-4 py-2'>배송일</th>
								<th className='px-4 py-2'>주문번호</th>
								<th className='px-4 py-2'>고객/주소</th>
								<th className='px-4 py-2'>배정 기사</th>
								<th className='px-4 py-2 text-center'>상태</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-100'>
							{filteredOrders.map((order) => (
								<tr
									key={order.id}
									className='align-top'>
									<td className='px-4 py-3 text-xs text-gray-600'>
										{new Date(
											order.deliveryDate
										).toLocaleDateString()}
									</td>
									<td className='px-4 py-3 font-semibold text-gray-900'>
										{order.id}
									</td>
									<td className='px-4 py-3 text-gray-700'>
										<div className='font-medium text-gray-900'>
											{order.customerName}
										</div>
										<div className='text-xs text-gray-500'>
											{order.address.main}
										</div>
									</td>
									<td className='px-4 py-3'>
										<Select
											value={order.driverId ?? ''}
											onChange={(e) =>
												handleAssign(
													order.id,
													e.target.value
												)
											}
											className='w-full'>
											<option value=''>기사 선택</option>
											{filteredDrivers.map(
												(driver: Driver) => (
													<option
														key={driver.id}
														value={driver.id}>
														{driver.name}
													</option>
												)
											)}
										</Select>
									</td>
									<td className='px-4 py-3 text-center'>
										{order.status ? (
											<Badge status={order.status} />
										) : (
											<span className='text-xs text-gray-500'>
												미정
											</span>
										)}
									</td>
								</tr>
							))}
							{filteredOrders.length === 0 && (
								<tr>
									<td
										className='px-4 py-6 text-center text-sm text-gray-500'
										colSpan={5}>
										선택한 조건에 해당하는 주문이 없습니다.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</Card>
		</div>
	);
}
