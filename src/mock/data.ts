import { Address, Driver, Order } from '../types';

const baseAddress: Address = {
  id: 'addr-1',
  main: '부산 해운대구 송정2로13번길 40',
  detail: '101동 1203호',
  entranceCode: '1234',
};

export const drivers: Driver[] = [
  { id: 'driver-1', name: '김기사', phone: '010-1111-2222' },
  { id: 'driver-2', name: '이가이드', phone: '010-3333-4444' },
  { id: 'driver-3', name: '박드라이버', phone: '010-5555-6666' },
];

const now = new Date();
const formatDate = (date: Date) => date.toISOString();

const buildOrder = (id: string): Order => {
  const created = new Date(now);
  created.setHours(created.getHours());
  const delivery = new Date(now);
  delivery.setDate(delivery.getDate() + 1);

  return {
    id: `${id}`,
    customerId: `customer`,
    customerName: `정수현`,
    customerPhone: `010-1234-5678`,
    address: { ...baseAddress, detail: `${100}동 ${1000}호` },
    createdAt: formatDate(created),
    deliveryDate: formatDate(delivery),
    items: [
      { menuId: 'menu-1', name: '김밥도시락', unitPrice: 6900, quantity: 3 },
      { menuId: 'menu-2', name: '덮밥도시락', unitPrice: 6900, quantity: 1 },
    ],
    totalPrice: 6900 * 3 + 6900,
    status: 'CONFIRMED',
  };
};

export const orders: Order[] = [
  buildOrder('202512041127'),
  buildOrder('202512141230'),
  buildOrder('202512141304'),
  buildOrder('202512030728'),
];
