'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Badge } from '../../../../src/components/common/Badge';
import { Button } from '../../../../src/components/common/Button';
import { Card } from '../../../../src/components/common/Card';
import { PageHeader } from '../../../../src/components/common/PageHeader';
import { orders as mockOrders } from '../../../../src/mock/data';
import { OrderStatus } from '../../../../src/types';

export default function DriverDeliveryDetailPage() {
  const params = useParams<{ id: string }>();
  const order = mockOrders.find((o) => o.id === params.id);
  const [status, setStatus] = useState<OrderStatus>(order?.status ?? 'PENDING');
  const [message, setMessage] = useState('');

  const complete = () => {
    setStatus('COMPLETED');
    setMessage('배송을 완료했습니다. 고생하셨습니다!');
  };

  if (!order) {
    return (
      <div className="space-y-4">
        <PageHeader title="배송 상세" backHref="/driver/deliveries" />
        <Card>배송 정보를 찾을 수 없습니다.</Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title={`배송 상세 ${order.id}`} backHref="/driver/deliveries" />
      <Card className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-900">{order.customerName}</span>
          <Badge status={status} />
        </div>
        <p>전화번호: {order.customerPhone}</p>
        <p>주소: {order.address.main}</p>
        <p>상세주소: {order.address.detail}</p>
        {order.address.entranceCode && <p>공동현관 비밀번호: {order.address.entranceCode}</p>}
      </Card>

      <Card className="space-y-2 text-sm">
        <h2 className="text-sm font-semibold text-gray-900">주문 메뉴</h2>
        {order.items.map((item) => (
          <div key={item.menuId} className="flex justify-between">
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
      </Card>

      {message && <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">{message}</div>}

      <div className="flex gap-3">
        <a className="flex-1" href={`tel:${order.customerPhone}`}>
          <Button variant="secondary" className="w-full">
            전화걸기
          </Button>
        </a>
        <Button className="flex-1" onClick={complete} disabled={status === 'COMPLETED'}>
          배송 완료
        </Button>
      </div>
    </div>
  );
}
