'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Button } from '../../../src/components/common/Button';
import { Card } from '../../../src/components/common/Card';
import { Input } from '../../../src/components/common/Input';
import { PageHeader } from '../../../src/components/common/PageHeader';
import { useCart } from '../../../src/context/CartContext';
import { menuItems } from '../../../src/mock/menu';
import { Address } from '../../../src/types';

const recentAddresses: Address[] = [
  { id: '1', main: '서울시 강남구 테헤란로 123', detail: '101동 1203호', entranceCode: '1234' },
  { id: '2', main: '서울시 서초구 서초대로 45', detail: '302동 503호', entranceCode: '0000' },
];

const mealPlanImage =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80';

type WeekdayOption = { label: string; displayDate: string; iso: string };

const getWeekdayOptions = (): WeekdayOption[] => {
  const today = new Date();
  const currentDay = today.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  const labels = ['월', '화', '수', '목', '금'];
  return labels.map((label, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    const displayDate = `${date.getMonth() + 1}/${date.getDate()}`;
    return { label, displayDate, iso: date.toISOString() };
  });
};

export default function CustomerOrderPage() {
  const { addToCart, totalCount, subtotal } = useCart();
  const [mainAddress, setMainAddress] = useState(recentAddresses[0].main);
  const [detail, setDetail] = useState(recentAddresses[0].detail);
  const [entranceCode, setEntranceCode] = useState(recentAddresses[0].entranceCode ?? '');
  const weekdayOptions = useMemo(() => getWeekdayOptions(), []);
  const [selectedDate, setSelectedDate] = useState<WeekdayOption>(weekdayOptions[0]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const totalDisplay = useMemo(() => new Intl.NumberFormat('ko-KR').format(subtotal), [subtotal]);

  const handleAdd = (id: string, delta: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, (prev[id] ?? 1) + delta) }));
  };

  const handleAddToCart = (menuId: string) => {
    const menu = menuItems.find((item) => item.id === menuId)!;
    const quantity = Math.max(1, quantities[menuId] ?? 1);
    addToCart(menu, quantity, selectedDate.iso, `${selectedDate.label} (${selectedDate.displayDate})`);
  };

  const handleRecentChange = (id: string) => {
    const found = recentAddresses.find((addr) => addr.id === id);
    if (found) {
      setMainAddress(found.main);
      setDetail(found.detail);
      setEntranceCode(found.entranceCode ?? '');
    }
  };

  return (
    <div className="space-y-6 pb-32">
      <PageHeader
        title="도시락 주문"
        backHref="/"
        description="배송 날짜 → 메뉴 → 수량 → 장바구니 순서로 간편하게 주문하세요"
      />

      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-800">
              1
            </span>
            <h2 className="text-sm font-semibold text-gray-900">배송지</h2>
          </div>
          <Button variant="secondary">주소 검색</Button>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
          <span className="font-semibold text-amber-700">최근 배송지</span>
          {recentAddresses.map((addr) => (
            <Button
              key={addr.id}
              variant="ghost"
              className="rounded-full border border-amber-200 px-3 py-1 text-xs"
              onClick={() => addr.id && handleRecentChange(addr.id)}
            >
              {addr.main}
            </Button>
          ))}
        </div>
        <Input
          placeholder="배송지 주소를 입력하세요"
          value={mainAddress}
          onChange={(e) => setMainAddress(e.target.value)}
        />
        <div className="grid gap-2 md:grid-cols-2">
          <Input placeholder="상세주소" value={detail} onChange={(e) => setDetail(e.target.value)} />
          <Input
            placeholder="공동현관 비밀번호 (선택)"
            value={entranceCode}
            onChange={(e) => setEntranceCode(e.target.value)}
          />
        </div>
      </Card>

      <Card className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-800">
            2
          </span>
          <h2 className="text-sm font-semibold text-gray-900">주문 날짜</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {weekdayOptions.map((date) => (
            <button
              type="button"
              key={date.iso}
              onClick={() => setSelectedDate(date)}
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left shadow-sm transition ${
                selectedDate.iso === date.iso
                  ? 'border-amber-400 bg-amber-50 ring-2 ring-amber-100'
                  : 'border-gray-100 bg-white hover:border-amber-200'
              }`}
            >
              <div>
                <p className="text-sm font-semibold text-gray-900">{date.label}요일</p>
                <p className="text-xs text-gray-600">{date.displayDate}</p>
              </div>
              {selectedDate.iso === date.iso && <span className="text-sm font-bold text-amber-600">선택됨</span>}
            </button>
          ))}
        </div>
      </Card>

      <Card className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-800">
            3
          </span>
          <h2 className="text-sm font-semibold text-gray-900">이번주 식단</h2>
        </div>
        <div className="overflow-hidden rounded-lg border border-amber-100">
          <Image
            src={mealPlanImage}
            alt="이번주 식단표"
            width={800}
            height={400}
            className="h-64 w-full object-cover"
          />
        </div>
      </Card>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-800">
            4
          </span>
          <h2 className="text-sm font-semibold text-gray-900">메뉴 선택</h2>
        </div>
        <p className="text-xs text-gray-600">선택한 날짜를 기준으로 메뉴 → 수량 → 장바구니 담기 순서로 진행됩니다.</p>
        <div className="grid gap-3">
          {menuItems.map((menu) => (
            <Card key={menu.id} className="flex flex-col gap-3 sm:flex-row">
              {menu.imageUrl && (
                <div className="relative h-24 w-full overflow-hidden rounded-md sm:h-28 sm:w-32">
                  <Image src={menu.imageUrl} alt={menu.name} fill className="object-cover" />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{menu.name}</p>
                    <p className="text-xs text-gray-500">{menu.description}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">₩{menu.price.toLocaleString()}</span>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-amber-700">{selectedDate.label} · {selectedDate.displayDate}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:justify-end">
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" onClick={() => handleAdd(menu.id, -1)}>
                        –
                      </Button>
                      <span className="w-8 text-center text-sm font-semibold">{quantities[menu.id] ?? 1}</span>
                      <Button variant="secondary" onClick={() => handleAdd(menu.id, 1)}>
                        +
                      </Button>
                    </div>
                    <Button onClick={() => handleAddToCart(menu.id)} disabled={!selectedDate}>
                      장바구니 담기
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="fixed bottom-4 left-0 right-0 mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-2xl border border-amber-100 bg-white px-4 py-3 shadow-lg">
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
