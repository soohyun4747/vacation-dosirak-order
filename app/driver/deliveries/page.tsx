'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { Badge } from '../../../src/components/common/Badge';
import { Button } from '../../../src/components/common/Button';
import { Card } from '../../../src/components/common/Card';
import { Input } from '../../../src/components/common/Input';
import { PageHeader } from '../../../src/components/common/PageHeader';
import { orders as mockOrders } from '../../../src/mock/data';
import { Order, OrderItem, OrderStatus } from '../../../src/types';

export default function DriverDeliveriesPage() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [orders, setOrders] = useState<Order[]>(() => [...mockOrders]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const activePointerId = useRef<number | null>(null);

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) => {
        const deliveryDate = new Date(order.deliveryDate).toISOString().slice(0, 10);
        return deliveryDate === date;
      }),
    [date, orders],
  );

  const menuTotals = useMemo(() => {
    const totals = new Map<string, number>();
    filteredOrders.forEach((order) => {
      order.items.forEach((item: OrderItem) => {
        totals.set(item.name, (totals.get(item.name) ?? 0) + item.quantity);
      });
    });

    return Array.from(totals.entries());
  }, [filteredOrders]);

  const completeDelivery = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: 'DELIVERED' as OrderStatus } : order,
      ),
    );
  };

  const resetDateToToday = () => setDate(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    if (!draggingId) return undefined;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerId !== activePointerId.current || !draggingId) return;

      const targetElement = document.elementFromPoint(event.clientX, event.clientY);
      const orderElement = targetElement?.closest('[data-order-id]') as HTMLElement | null;
      const targetId = orderElement?.dataset.orderId ?? null;

      if (!targetId || targetId === draggingId) {
        setDragOverId(targetId === draggingId ? null : targetId);
        return;
      }

      setOrders((prev) => {
        const list = [...prev];
        const fromIndex = list.findIndex((order) => order.id === draggingId);
        const toIndex = list.findIndex((order) => order.id === targetId);
        if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return prev;

        const [moved] = list.splice(fromIndex, 1);
        list.splice(toIndex, 0, moved);
        return list;
      });
      setDragOverId(targetId);
    };

    const stopDragging = (event: PointerEvent) => {
      if (event.pointerId !== activePointerId.current) return;
      activePointerId.current = null;
      setDraggingId(null);
      setDragOverId(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopDragging);
    window.addEventListener('pointercancel', stopDragging);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopDragging);
      window.removeEventListener('pointercancel', stopDragging);
      activePointerId.current = null;
      setDragOverId(null);
    };
  }, [draggingId]);

  const handlePointerDown = (event: ReactPointerEvent, id: string) => {
    event.preventDefault();
    activePointerId.current = event.pointerId;
    setDraggingId(id);
    setDragOverId(id);
  };

  return (
    <div className='space-y-6'>
      <PageHeader title='배송 목록' />
      <Card className='flex items-center justify-center gap-2 text-sm md:justify-between'>
        <Input
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className='max-w-xs'
        />
        <Button onClick={resetDateToToday} className='w-[70px]'>
          오늘
        </Button>
      </Card>

      <Card className='space-y-2 text-sm'>
        <h2 className='text-sm font-semibold text-gray-900'>챙겨갈 메뉴 총합</h2>
        {menuTotals.length === 0 && (
          <p className='text-gray-600'>선택한 날짜의 주문이 없습니다.</p>
        )}
        {menuTotals.length > 0 && (
          <div className='flex flex-wrap gap-3'>
            {menuTotals.map(([name, quantity]) => (
              <span
                key={name}
                className='rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800'
              >
                {name} x {quantity}
              </span>
            ))}
          </div>
        )}
      </Card>

      <Card className='divide-y divide-gray-100'>
        {filteredOrders.length === 0 && (
          <p className='py-3 text-sm text-gray-600'>선택한 날짜의 배송이 없습니다.</p>
        )}

        {filteredOrders.map((order) => {
          const isDragging = draggingId === order.id;
          const isDragOver = dragOverId === order.id && draggingId !== order.id;

          return (
            <div
              key={order.id}
              data-order-id={order.id}
              className={`space-y-4 py-3 transition-colors ${
                isDragging ? 'cursor-grabbing bg-amber-50 shadow-inner' : 'cursor-grab'
              } ${
                isDragOver
                  ? 'rounded-lg border border-amber-200 bg-amber-50/70 shadow-sm'
                  : ''
              }`}
            >
              <div className='flex items-start justify-between gap-3'>
                <div className='flex items-start gap-3'>
                  <button
                    type='button'
                    onPointerDown={(event) => handlePointerDown(event, order.id)}
                    className='mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-700 shadow-inner'
                    aria-label='배송 순서를 변경하려면 길게 누른 뒤 위아래로 드래그하세요'
                    style={{ touchAction: 'none' }}
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-4 w-4'>
                      <path d='M6 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM16 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z' />
                    </svg>
                  </button>
                  <div className='flex flex-col gap-1'>
                    <p className='text-sm font-semibold text-gray-900'>{order.customerName} </p>
                    <p className='text-sm text-gray-600'>{order.address.main}</p>
                    <p className='text-sm text-gray-600'>상세주소: {order.address.detail}</p>
                    {order.address.entranceCode && (
                      <p className='text-sm text-gray-600'>
                        공동현관 비밀번호: {order.address.entranceCode}
                      </p>
                    )}
                    <Link className='text-sm text-amber-700 underline' href={`/driver/deliveries/${order.id}`}>
                      상세보기
                    </Link>
                  </div>
                </div>

                <div className='flex flex-col items-center gap-2 text-sm'>
                  {order.status && <Badge status={order.status} />}

                  <Button
                    className='px-3 py-1 text-sm'
                    onClick={() => completeDelivery(order.id)}
                    disabled={order.status === 'DELIVERED'}
                  >
                    배송 완료
                  </Button>
                </div>
              </div>

              <div className='flex items-center gap-2 text-xs text-gray-500'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='h-4 w-4'
                >
                  <path d='M4 9h16' />
                  <path d='M4 15h16' />
                </svg>
                <span className='font-medium text-gray-600'>
                  길게 누르고 드래그하거나 마우스로 잡아 순서를 바꿔보세요
                </span>
              </div>

              <div className='flex flex-col gap-1 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700'>
                <p className='mb-1 font-semibold text-gray-900'>주문 메뉴</p>
                <div className='flex flex-wrap gap-2'>
                  {order.items.map((item) => (
                    <span key={item.menuId} className='rounded-full bg-white px-3 py-1 shadow-sm'>
                      {item.name} x {item.quantity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
