'use client';

import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Badge } from '../../../../src/components/common/Badge';
import { Button } from '../../../../src/components/common/Button';
import { Card } from '../../../../src/components/common/Card';
import { PageHeader } from '../../../../src/components/common/PageHeader';
import { Select } from '../../../../src/components/common/Select';
import { drivers as mockDrivers, orders as mockOrders } from '../../../../src/mock/data';
import { Driver, Order, OrderStatus } from '../../../../src/types';

export default function AdminOrderDetailPage() {
  const params = useParams<{ id: string }>();
  const initialOrder = useMemo(() => mockOrders.find((o) => o.id === params.id), [params.id]);
  const [order, setOrder] = useState<Order | undefined>(initialOrder);
  const [selectedDriver, setSelectedDriver] = useState<Driver | undefined>(
    mockDrivers.find((d) => d.id === initialOrder?.driverId),
  );

  const handleStatusChange = (status: OrderStatus) => setOrder((prev) => (prev ? { ...prev, status } : prev));
  const handleAssign = () =>
    setOrder((prev) => (prev ? { ...prev, driverId: selectedDriver?.id, driverName: selectedDriver?.name } : prev));

  const driverLoad = selectedDriver ? (selectedDriver.id.length % 4) + 1 : null;

  if (!order) {
    return (
      <div className="space-y-4">
        <PageHeader title="주문 상세" backHref="/admin/orders" />
        <Card>존재하지 않는 주문입니다.</Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title={`주문 상세 ${order.id}`} backHref="/admin/orders" />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">주문 정보</h2>
            <Badge status={order.status} />
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            <p>주문일: {new Date(order.createdAt).toLocaleString()}</p>
            <p>배송일: {new Date(order.deliveryDate).toLocaleDateString()}</p>
            <p>고객: {order.customerName} ({order.customerPhone})</p>
            <p>주소: {order.address.main}</p>
            <p>상세주소: {order.address.detail}</p>
            {order.address.entranceCode && <p>공동현관 비밀번호: {order.address.entranceCode}</p>}
          </div>
          <div className="space-y-1 text-sm">
            <h3 className="font-semibold text-gray-900">주문 메뉴</h3>
            {order.items.map((item) => (
              <div key={item.menuId} className="flex justify-between text-gray-700">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₩{(item.unitPrice * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-semibold text-gray-900">
              <span>총 금액</span>
              <span>₩{order.totalPrice.toLocaleString()}</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">상태 변경</label>
            <Select value={order.status} onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}>
              {['PENDING', 'PREPARING', 'DELIVERING', 'COMPLETED'].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </div>
        </Card>

        <Card className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">배송기사 배정</h2>
          <Select
            value={selectedDriver?.id ?? ''}
            onChange={(e) => setSelectedDriver(mockDrivers.find((d) => d.id === e.target.value))}
          >
            <option value="">기사 선택</option>
            {mockDrivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name} ({driver.phone})
              </option>
            ))}
          </Select>
          {driverLoad !== null && (
            <div className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">오늘 배정 건수: {driverLoad}건</div>
          )}
          <Button onClick={handleAssign} disabled={!selectedDriver}>
            배정하기
          </Button>
          <div className="rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-700">
            <p>배정된 기사: {order.driverName ?? '미배정'}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
