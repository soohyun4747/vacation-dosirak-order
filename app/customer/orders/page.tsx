'use client';

import { useMemo, useState } from 'react';
import { Card } from '../../../src/components/common/Card';
import { PageHeader } from '../../../src/components/common/PageHeader';
import { orders as mockOrders } from '../../../src/mock/data';

export default function CustomerOrdersPage() {
  const [orders] = useState(mockOrders);
  const [expandedId, setExpandedId] = useState<string | null>(mockOrders[0]?.id ?? null);

  const sorted = useMemo(() => [...orders].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)), [orders]);

  return (
    <div className="space-y-6">
      <PageHeader title="주문 내역" backHref="/customer/order" />
      <Card className="divide-y divide-gray-100">
        {sorted.map((order) => {
          const isOpen = expandedId === order.id;
          return (
            <div key={order.id} className="space-y-3 py-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">주문번호 {order.id}</p>
                  <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₩{order.totalPrice.toLocaleString()}</p>
                  <button
                    type="button"
                    className="text-xs font-semibold text-amber-700 underline"
                    onClick={() => setExpandedId(isOpen ? null : order.id)}
                  >
                    {isOpen ? '접기' : '펼치기'}
                  </button>
                </div>
              </div>
              {isOpen && (
                <div className="space-y-2 rounded-lg bg-amber-50 p-3 text-sm text-gray-800">
                  <div className="flex items-center justify-between text-xs font-semibold text-amber-800">
                    <span>배송일</span>
                    <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                  </div>
                  <div className="space-y-1">
                    {order.items.map((item) => (
                      <div key={item.menuId} className="flex items-center justify-between">
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span className="text-xs text-gray-600">배송일 {new Date(order.orderDate).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-gray-600">
                    배송지: {order.address.main} {order.address.detail}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </Card>
    </div>
  );
}
