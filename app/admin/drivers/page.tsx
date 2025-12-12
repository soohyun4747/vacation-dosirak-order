'use client';

import { Card } from '../../../src/components/common/Card';
import { PageHeader } from '../../../src/components/common/PageHeader';
import { drivers, orders } from '../../../src/mock/data';

export default function AdminDriversPage() {
  const stats = drivers.map((driver) => {
    const assigned = orders.filter((o) => o.driverId === driver.id);
    const completed = assigned.filter((o) => o.status === 'COMPLETED').length;
    return {
      driver,
      assignedCount: assigned.length,
      completed,
      pending: assigned.length - completed,
    };
  });

  return (
    <div className="space-y-6">
      <PageHeader title="배송기사 현황" backHref="/admin/orders" />
      <div className="grid gap-4 sm:grid-cols-2">
        {stats.map(({ driver, assignedCount, completed, pending }) => (
          <Card key={driver.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">{driver.name}</p>
                <p className="text-xs text-gray-500">{driver.phone}</p>
              </div>
              <span className="text-xs text-gray-600">오늘 배정 {assignedCount}건</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>완료</span>
              <span className="font-semibold text-green-600">{completed}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>미완료</span>
              <span className="font-semibold text-amber-600">{pending}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
