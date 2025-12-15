'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Badge } from '../../../src/components/common/Badge';
import { Button } from '../../../src/components/common/Button';
import { Card } from '../../../src/components/common/Card';
import { Input } from '../../../src/components/common/Input';
import { PageHeader } from '../../../src/components/common/PageHeader';
import { orders as mockOrders } from '../../../src/mock/data';

export default function DriverDeliveriesPage() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [orders] = useState(mockOrders);

  return (
    <div className="space-y-6">
      <PageHeader title="배송 목록" backHref="/" />
      <Card className="flex items-center gap-3 text-sm">
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="max-w-xs" />
        <Button onClick={() => setDate(new Date().toISOString().slice(0, 10))}>오늘</Button>
      </Card>

      <Card className="divide-y divide-gray-100">
        {orders.length === 0 && <p className="py-3 text-sm text-gray-600">선택한 날짜의 배송이 없습니다.</p>}
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between gap-3 py-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">{order.customerName}</p>
              <p className="text-xs text-gray-500">{order.address.main}</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {order.status && <Badge status={order.status} />}
              <Link className="text-amber-700 underline" href={`/driver/deliveries/${order.id}`}>
                상세보기
              </Link>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
