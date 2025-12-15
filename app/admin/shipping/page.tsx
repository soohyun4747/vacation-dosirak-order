'use client';

import { useMemo, useState } from 'react';
import { Badge } from '../../../src/components/common/Badge';
import { Card } from '../../../src/components/common/Card';
import { Input } from '../../../src/components/common/Input';
import { PageHeader } from '../../../src/components/common/PageHeader';
import { Select } from '../../../src/components/common/Select';
import { drivers as mockDrivers, orders as mockOrders } from '../../../src/mock/data';
import { Driver } from '../../../src/types';

export default function AdminShippingPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [driverKeyword, setDriverKeyword] = useState('');

  const filteredDrivers = useMemo(
    () =>
      mockDrivers.filter(
        (driver) => driver.name.includes(driverKeyword) || driver.phone.includes(driverKeyword),
      ),
    [driverKeyword],
  );

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (!deliveryDate) return true;
      const orderDate = new Date(order.deliveryDate).toISOString().slice(0, 10);
      return orderDate === deliveryDate;
    });
  }, [deliveryDate, orders]);

  const handleAssign = (orderId: string, driverId: string) => {
    const selected = mockDrivers.find((driver) => driver.id === driverId);
    if (!selected) return;
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, driverId: selected.id, driverName: selected.name } : order,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader title="배송 관리" backHref="/admin/orders" />

      <Card className="flex flex-wrap items-center gap-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">배송일</span>
          <Input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} className="w-40" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">배정 기사 검색</span>
          <Input
            placeholder="이름/전화번호 검색"
            value={driverKeyword}
            onChange={(e) => setDriverKeyword(e.target.value)}
            className="w-56"
          />
        </div>
      </Card>

      <Card className="divide-y divide-gray-100 text-sm">
        <div className="grid grid-cols-6 gap-2 pb-2 font-semibold text-gray-700">
          <span>배송일</span>
          <span>주문번호</span>
          <span className="col-span-2">고객/주소</span>
          <span>배정 기사</span>
          <span className="text-center">상태</span>
          <span className="text-right">조치</span>
        </div>
        {filteredOrders.map((order) => (
          <div key={order.id} className="grid grid-cols-6 items-center gap-2 py-2">
            <span className="text-xs text-gray-600">{new Date(order.deliveryDate).toLocaleDateString()}</span>
            <span className="font-semibold text-gray-900">{order.id}</span>
            <span className="col-span-2 text-gray-700">
              {order.customerName}
              <br />
              <span className="text-xs text-gray-500">{order.address.main}</span>
            </span>
            <div className="space-y-1">
              <Select
                value={order.driverId ?? ''}
                onChange={(e) => handleAssign(order.id, e.target.value)}
                className="w-full"
              >
                <option value="">기사 선택</option>
                {filteredDrivers.map((driver: Driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name} ({driver.phone})
                  </option>
                ))}
              </Select>
              <p className="text-xs text-gray-500">{order.driverName ? `${order.driverName} 배정됨` : '미배정'}</p>
            </div>
            <div className="flex justify-center">
              {order.status ? <Badge status={order.status} /> : <span className="text-xs text-gray-500">미정</span>}
            </div>
            <div className="flex justify-end text-xs text-gray-500">
              {deliveryDate ? `${deliveryDate} 배송` : '전체 보기'}
            </div>
          </div>
        ))}
        {filteredOrders.length === 0 && (
          <div className="py-6 text-center text-sm text-gray-500">선택한 조건에 해당하는 주문이 없습니다.</div>
        )}
      </Card>
    </div>
  );
}
