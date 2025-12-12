'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Button } from '../../../src/components/common/Button';
import { Card } from '../../../src/components/common/Card';
import { Input } from '../../../src/components/common/Input';
import { PageHeader } from '../../../src/components/common/PageHeader';
import { Select } from '../../../src/components/common/Select';
import { useCart } from '../../../src/context/CartContext';
import { menuItems } from '../../../src/mock/menu';
import { Address } from '../../../src/types';

const recentAddresses: Address[] = [
  { id: '1', main: '서울시 강남구 테헤란로 123', detail: '101동 1203호', entranceCode: '1234' },
  { id: '2', main: '서울시 서초구 서초대로 45', detail: '302동 503호', entranceCode: '0000' },
];

const dateOptions = ['오늘', '내일', '모레'];

export default function CustomerOrderPage() {
  const { addToCart, totalCount, subtotal } = useCart();
  const [selectedAddress, setSelectedAddress] = useState<Address>(recentAddresses[0]);
  const [detail, setDetail] = useState(selectedAddress.detail);
  const [entranceCode, setEntranceCode] = useState(selectedAddress.entranceCode ?? '');
  const [selectedDate, setSelectedDate] = useState(dateOptions[0]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const totalDisplay = useMemo(() => new Intl.NumberFormat('ko-KR').format(subtotal), [subtotal]);

  const handleAdd = (id: string, delta: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, (prev[id] ?? 1) + delta) }));
  };

  const handleAddToCart = (menuId: string) => {
    const menu = menuItems.find((item) => item.id === menuId)!;
    addToCart(menu, quantities[menuId] ?? 1);
  };

  const handleRecentChange = (id: string) => {
    const found = recentAddresses.find((addr) => addr.id === id);
    if (found) {
      setSelectedAddress(found);
      setDetail(found.detail);
      setEntranceCode(found.entranceCode ?? '');
    }
  };

  return (
    <div className="space-y-6 pb-28">
      <PageHeader title="도시락 주문" backHref="/" description="주소를 선택하고 메뉴를 장바구니에 담아보세요" />

      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">배송지</h2>
          <Button variant="secondary">주소 검색</Button>
        </div>
        <Select value={selectedAddress.id} onChange={(e) => handleRecentChange(e.target.value)}>
          {recentAddresses.map((addr) => (
            <option key={addr.id} value={addr.id}>
              {addr.main}
            </option>
          ))}
        </Select>
        <Input placeholder="상세주소" value={detail} onChange={(e) => setDetail(e.target.value)} />
        <Input placeholder="공동현관 비밀번호 (선택)" value={entranceCode} onChange={(e) => setEntranceCode(e.target.value)} />

        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-900">주문 날짜</p>
          <div className="flex gap-2">
            {dateOptions.map((date) => (
              <Button
                key={date}
                variant={selectedDate === date ? 'primary' : 'secondary'}
                onClick={() => setSelectedDate(date)}
                className="flex-1"
              >
                {date}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">메뉴 선택</h2>
        <div className="grid gap-3">
          {menuItems.map((menu) => (
            <Card key={menu.id} className="flex gap-3">
              {menu.imageUrl && (
                <div className="relative h-20 w-24 overflow-hidden rounded-md">
                  <Image src={menu.imageUrl} alt={menu.name} fill className="object-cover" />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{menu.name}</p>
                    <p className="text-xs text-gray-500">{menu.description}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">₩{menu.price.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" onClick={() => handleAdd(menu.id, -1)}>
                      –
                    </Button>
                    <span className="w-8 text-center text-sm font-semibold">{quantities[menu.id] ?? 1}</span>
                    <Button variant="secondary" onClick={() => handleAdd(menu.id, 1)}>
                      +
                    </Button>
                  </div>
                  <Button onClick={() => handleAddToCart(menu.id)}>장바구니 담기</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="fixed bottom-4 left-0 right-0 mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-white px-4 py-3 shadow-lg">
        <div className="flex flex-col text-sm">
          <span className="font-semibold text-gray-900">장바구니 {totalCount}개</span>
          <span className="text-gray-600">합계 ₩{totalDisplay}</span>
        </div>
        <Link href="/customer/cart">
          <Button className="whitespace-nowrap">장바구니로 이동</Button>
        </Link>
      </div>
    </div>
  );
}
