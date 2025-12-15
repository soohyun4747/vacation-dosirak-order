'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Badge } from '../../../src/components/common/Badge';
import { Button } from '../../../src/components/common/Button';
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
        const [page, setPage] = useState(1);
        const pageSize = 10;

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

        const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
        const currentPage = Math.min(page, totalPages);
        const paginatedOrders = useMemo(() => {
                const start = (currentPage - 1) * pageSize;
                return filteredOrders.slice(start, start + pageSize);
        }, [currentPage, filteredOrders]);

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
                                                onChange={(e) => {
                                                        setDeliveryDate(e.target.value);
                                                        setPage(1);
                                                }}
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
                                                                <th className='px-4 py-2 text-right'>상세</th>
                                                        </tr>
                                                </thead>
						<tbody className='divide-y divide-gray-100'>
                                                        {paginatedOrders.map((order) => (
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
                                                                                        {filteredDrivers.map((driver: Driver) => (
                                                                                                <option
                                                                                                        key={driver.id}
                                                                                                        value={driver.id}>
                                                                                                        {driver.name}
                                                                                                </option>
                                                                                        ))}
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
                                                                        <td className='px-4 py-3 text-right'>
                                                                                <Link href={`/admin/orders/${order.id}`}>
                                                                                        <Button
                                                                                                variant='secondary'
                                                                                                className='px-3 py-1 text-xs'>
                                                                                                상세보기
                                                                                        </Button>
                                                                                </Link>
                                                                        </td>
                                                                </tr>
                                                    ))}
                                                        {paginatedOrders.length === 0 && (
                                                                <tr>
                                                                        <td
                                                                                className='px-4 py-6 text-center text-sm text-gray-500'
                                                                                colSpan={6}>
                                                                                선택한 조건에 해당하는 주문이 없습니다.
                                                                        </td>
                                                                </tr>
                                                        )}
                                                </tbody>
                                        </table>
                                </div>
                                <div className='flex items-center justify-between pt-4 text-xs text-gray-600'>
                                        <span>
                                                페이지 {currentPage} / {totalPages}
                                        </span>
                                        <div className='flex gap-2'>
                                                <Button
                                                        variant='secondary'
                                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                                        disabled={currentPage === 1}>
                                                        이전
                                                </Button>
                                                <Button
                                                        variant='secondary'
                                                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                                        disabled={currentPage === totalPages}>
                                                        다음
                                                </Button>
                                        </div>
                                </div>
                        </Card>
                </div>
        );
}
