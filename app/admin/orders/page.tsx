'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Badge } from '../../../src/components/common/Badge';
import { Button } from '../../../src/components/common/Button';
import { Card } from '../../../src/components/common/Card';
import { Input } from '../../../src/components/common/Input';
import { PageHeader } from '../../../src/components/common/PageHeader';
import { Select } from '../../../src/components/common/Select';
import { orders as mockOrders } from '../../../src/mock/data';
import { OrderStatus } from '../../../src/types';

const statusOptions: (OrderStatus | 'ALL')[] = ['ALL', 'PENDING', 'PREPARING', 'DELIVERING', 'COMPLETED'];

export default function AdminOrdersPage() {
  const [orders] = useState(mockOrders);
  const [status, setStatus] = useState<(typeof statusOptions)[number]>('ALL');
  const [keyword, setKeyword] = useState('');
  const [todayOnly, setTodayOnly] = useState(false);

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = status === 'ALL' || order.status === status;
      const matchesKeyword =
        order.customerName.includes(keyword) || order.customerPhone.includes(keyword) || order.id.includes(keyword);
      const matchesDate = !todayOnly || new Date(order.createdAt).toDateString() === new Date().toDateString();
      return matchesStatus && matchesKeyword && matchesDate;
    });
  }, [keyword, orders, status, todayOnly]);

  return (
    <div className="space-y-6">
      <PageHeader title="주문 관리" backHref="/" />

      <Card className="flex flex-wrap gap-3 text-sm">
        <div className="flex gap-2">
          <Button variant={todayOnly ? 'primary' : 'secondary'} onClick={() => setTodayOnly((p) => !p)}>
            {todayOnly ? '오늘만 보기' : '전체 보기'}
          </Button>
        </div>
        <Select value={status} onChange={(e) => setStatus(e.target.value as OrderStatus | 'ALL')} className="w-40">
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
        <Input
          placeholder="이름/전화번호/주문번호 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1"
        />
      </Card>

      <Card className="divide-y divide-gray-100 text-sm">
        <div className="grid grid-cols-7 gap-2 pb-2 font-semibold text-gray-700">
          <span>주문일</span>
          <span>주문번호</span>
          <span className="col-span-2">고객</span>
          <span>주소</span>
          <span>기사</span>
          <span className="text-right">상태</span>
        </div>
        {filtered.map((order) => (
          <div key={order.id} className="grid grid-cols-7 items-center gap-2 py-2">
            <span className="text-xs text-gray-600">{new Date(order.createdAt).toLocaleString()}</span>
            <span className="font-semibold text-gray-900">{order.id}</span>
            <span className="col-span-2 text-gray-700">
              {order.customerName}
              <br />
              <span className="text-xs text-gray-500">{order.customerPhone}</span>
            </span>
            <span className="text-xs text-gray-600">{order.address.main}</span>
            <span className="text-xs text-gray-600">{order.driverName ?? '미배정'}</span>
            <div className="flex items-center justify-end gap-2">
              <Badge status={order.status} />
              <Link className="text-blue-600 hover:underline" href={`/admin/orders/${order.id}`}>
                상세보기
              </Link>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
