import Link from 'next/link';
import { Button } from '../src/components/common/Button';
import { Card } from '../src/components/common/Card';
import { PageHeader } from '../src/components/common/PageHeader';

const roles = [
  { title: '고객 주문하기', href: '/customer/order', desc: '도시락을 주문하고 배송 상태를 확인하세요.' },
  { title: '관리자 대시보드', href: '/admin/orders', desc: '주문을 관리하고 배송기사를 배정하세요.' },
  { title: '배송기사 앱', href: '/driver/deliveries', desc: '오늘의 배송 목록과 상세를 확인하세요.' },
];

export default function Home() {
  return (
    <div className="space-y-6">
      <PageHeader title="주문/배송 시스템" description="고객 · 관리자 · 배송기사 전용 화면" />
      <div className="grid gap-4">
        {roles.map((role) => (
          <Card key={role.title}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-gray-900">{role.title}</h2>
                <p className="text-sm text-gray-600">{role.desc}</p>
              </div>
              <Link href={role.href}>
                <Button className="whitespace-nowrap">바로가기</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
