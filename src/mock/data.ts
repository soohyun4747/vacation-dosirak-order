import { Address, Driver, Order, OrderStatus } from '../types';

const baseAddress: Address = {
  id: 'addr-1',
  main: '서울시 강남구 테헤란로 123',
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

const buildOrder = (id: number, status: OrderStatus, driverIndex?: number): Order => {
  const created = new Date(now);
  created.setHours(created.getHours() - id);
  const delivery = new Date(now);
  delivery.setDate(delivery.getDate() + (id % 3));
  const driver = driverIndex !== undefined ? drivers[driverIndex] : undefined;

  return {
    id: `order-${id}`,
    customerId: `customer-${id}`,
    customerName: `고객 ${id}`,
    customerPhone: `010-0000-00${id}${id}`,
    address: { ...baseAddress, id: `addr-${id}`, detail: `${100 + id}동 ${1000 + id}호` },
    orderDate: formatDate(delivery),
    createdAt: formatDate(created),
    items: [
      { menuId: 'menu-1', name: '김밥도시락', unitPrice: 9000, quantity: 1 + (id % 2) },
      { menuId: 'menu-2', name: '덮밥도시락', unitPrice: 11000, quantity: 1 },
    ],
    totalPrice: 9000 * (1 + (id % 2)) + 11000,
    status,
    driverId: driver?.id,
    driverName: driver?.name,
  };
};

export const orders: Order[] = [
  buildOrder(1, 'PENDING'),
  buildOrder(2, 'PREPARING', 0),
  buildOrder(3, 'DELIVERING', 1),
  buildOrder(4, 'COMPLETED', 2),
];
