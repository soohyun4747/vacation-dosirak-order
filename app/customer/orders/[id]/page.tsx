'use client';

import { notFound, useParams } from 'next/navigation';
import { Card } from '../../../../src/components/common/Card';
import { PageHeader } from '../../../../src/components/common/PageHeader';
import { orders } from '../../../../src/mock/data';

export default function CustomerOrderDetail() {
  const params = useParams<{ id: string }>();
  const order = orders.find((o) => o.id === params.id);
  if (!order) return notFound();

  return (
    <div className="space-y-6">
      <PageHeader title={`주문 상세 ${order.id}`} backHref="/customer/orders" />
      <Card className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">주문일</span>
          <span className="font-semibold text-gray-900">{new Date(order.createdAt).toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">배송일</span>
          <span className="font-semibold text-gray-900">{new Date(order.deliveryDate).toLocaleDateString()}</span>
        </div>
      </Card>

      <Card className="space-y-2 text-sm">
        <h2 className="text-sm font-semibold text-gray-900">배송지</h2>
        <p>{order.address.main}</p>
        <p>{order.address.detail}</p>
        {order.address.entranceCode && <p>공동현관 비밀번호: {order.address.entranceCode}</p>}
      </Card>

      <Card className="space-y-2 text-sm">
        <h2 className="text-sm font-semibold text-gray-900">주문 메뉴</h2>
        {order.items.map((item) => (
          <div key={item.menuId} className="flex justify-between">
            <span>
              {item.name} x {item.quantity}
            </span>
            <div className="text-right">
              <span className="block">₩{(item.unitPrice * item.quantity).toLocaleString()}</span>
              <span className="text-xs text-gray-500">{new Date(order.deliveryDate).toLocaleDateString()} 배송</span>
            </div>
          </div>
        ))}
        <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-semibold text-gray-900">
          <span>총 금액</span>
          <span>₩{order.totalPrice.toLocaleString()}</span>
        </div>
      </Card>
    </div>
  );
}
