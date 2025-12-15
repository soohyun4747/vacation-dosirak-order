'use client';

import Link from 'next/link';
import { Button, IconButton } from '../../../src/components/common/Button';
import { Card } from '../../../src/components/common/Card';
import { PageHeader } from '../../../src/components/common/PageHeader';
import { useCart } from '../../../src/context/CartContext';

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, totalCount } = useCart();

  return (
    <div className="space-y-6">
      <PageHeader title="장바구니" backHref="/customer/order" />

      <Card className="space-y-3">
        {items.length === 0 && <p className="text-sm text-gray-600">장바구니가 비어 있습니다.</p>}
        {items.map((item) => (
          <div
            key={`${item.menu.id}-${item.deliveryDate}`}
            className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3 last:border-none"
          >
            <div>
              <p className="text-sm font-semibold text-gray-900">{item.menu.name}</p>
              <p className="text-xs text-amber-700">배송일: {item.deliveryLabel}</p>
              <p className="text-xs text-gray-500">단가 ₩{item.menu.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  onClick={() => updateQuantity(item.menu.id, item.deliveryDate, item.quantity - 1)}
                >
                  –
                </Button>
                <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                <Button
                  variant="secondary"
                  onClick={() => updateQuantity(item.menu.id, item.deliveryDate, item.quantity + 1)}
                >
                  +
                </Button>
              </div>
              <div className="text-right text-sm font-semibold text-gray-900">
                ₩{(item.menu.price * item.quantity).toLocaleString()}
              </div>
              <IconButton aria-label="삭제" onClick={() => removeItem(item.menu.id, item.deliveryDate)}>
                🗑️
              </IconButton>
            </div>
          </div>
        ))}
      </Card>

      <Card className="space-y-2">
        <div className="flex justify-between text-sm text-gray-700">
          <span>아이템 수</span>
          <span>{totalCount}개</span>
        </div>
        <div className="flex justify-between text-base font-semibold text-gray-900">
          <span>합계</span>
          <span>₩{subtotal.toLocaleString()}</span>
        </div>
      </Card>

      <div className="flex gap-3">
        <Link href="/customer/order" className="flex-1">
          <Button variant="secondary" className="w-full">
            주문 계속하기
          </Button>
        </Link>
        <Link href="/customer/checkout" className="flex-1">
          <Button className="w-full">결제하기</Button>
        </Link>
      </div>
    </div>
  );
}
