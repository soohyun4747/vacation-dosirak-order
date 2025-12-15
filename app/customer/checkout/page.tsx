'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Button } from '../../../src/components/common/Button';
import { Card } from '../../../src/components/common/Card';
import { Checkbox } from '../../../src/components/common/Checkbox';
import { PageHeader } from '../../../src/components/common/PageHeader';
import { useCart } from '../../../src/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const deliverySummary = useMemo(
    () => Array.from(new Set(items.map((item) => item.deliveryLabel))),
    [items],
  );
  const [method, setMethod] = useState<'card' | 'transfer'>('card');
  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState('');

  const handlePay = () => {
    setMessage('결제가 완료되었습니다! 주문내역 페이지로 이동합니다.');
    clear();
    setTimeout(() => router.push('/customer/orders'), 800);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="결제" backHref="/customer/cart" />

      <Card className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">주문 요약</h2>
        <div className="text-sm text-gray-700">
          <p>배송지: 입력한 주소로 배송됩니다.</p>
          <p>배송일: {deliverySummary.length > 0 ? deliverySummary.join(', ') : '미선택'}</p>
        </div>
        <div className="space-y-2 text-sm">
          {items.map((item) => (
            <div key={item.menu.id} className="flex justify-between">
              <span>
                {item.menu.name} ({item.deliveryLabel}) x {item.quantity}
              </span>
              <span>₩{(item.menu.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-semibold text-gray-900">
            <span>총 금액</span>
            <span>₩{subtotal.toLocaleString()}</span>
          </div>
        </div>
      </Card>

      <Card className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">결제 수단</h2>
        <div className="flex gap-3 text-sm">
          <Button
            variant={method === 'card' ? 'primary' : 'secondary'}
            className="flex-1"
            onClick={() => setMethod('card')}
          >
            카드
          </Button>
          <Button
            variant={method === 'transfer' ? 'primary' : 'secondary'}
            className="flex-1"
            onClick={() => setMethod('transfer')}
          >
            계좌이체
          </Button>
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} /> 결제에 동의합니다.
        </label>
      </Card>

      {message && <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">{message}</div>}

      <div className="flex gap-3">
        <Link href="/customer/cart" className="flex-1">
          <Button variant="secondary" className="w-full">
            뒤로 가기
          </Button>
        </Link>
        <Button className="flex-1" disabled={!agree || items.length === 0} onClick={handlePay}>
          결제하기
        </Button>
      </div>
    </div>
  );
}
