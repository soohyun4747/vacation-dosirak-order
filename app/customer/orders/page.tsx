'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Badge } from '../../../src/components/common/Badge';
import { Card } from '../../../src/components/common/Card';
import { PageHeader } from '../../../src/components/common/PageHeader';
import { orders as mockOrders } from '../../../src/mock/data';

export default function CustomerOrdersPage() {
  const [orders] = useState(mockOrders);

  const sorted = useMemo(() => [...orders].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)), [orders]);

  return (
    <div className="space-y-6">
      <PageHeader title="주문 내역" backHref="/customer/order" />
      <Card className="divide-y divide-gray-100">
        {sorted.map((order) => (
          <div key={order.id} className="flex items-center justify-between gap-3 py-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">주문번호 {order.id}</p>
              <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Badge status={order.status} />
              <div className="text-right">
                <p className="font-semibold text-gray-900">₩{order.totalPrice.toLocaleString()}</p>
              </div>
              <Link className="text-blue-600 hover:underline" href={`/customer/orders/${order.id}`}>
                상세보기
              </Link>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
