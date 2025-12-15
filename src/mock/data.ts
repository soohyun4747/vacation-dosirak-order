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
  buildOrder('202512041121'),
  buildOrder('202512141232'),
  buildOrder('202512141303'),
  buildOrder('202512030724'),
  buildOrder('202512041125'),
  buildOrder('202512141236'),
  buildOrder('202512141307'),
  buildOrder('202512030728'),
  buildOrder('202512041129'),
  buildOrder('2025121412310'),
  buildOrder('2025121413011'),
  buildOrder('2025120307212'),
  buildOrder('2025120411213'),
  buildOrder('2025121412314'),
  buildOrder('2025121413015'),
  buildOrder('2025120307216'),
  buildOrder('2025120411217'),
  buildOrder('2025121412318'),
  buildOrder('2025121413019'),
  buildOrder('2025120307220'),
  buildOrder('2025120411221'),
  buildOrder('2025121412322'),
  buildOrder('2025121413023'),
  buildOrder('2025120307224'),
  buildOrder('2025120411225'),
  buildOrder('2025121412326'),
  buildOrder('2025121413027'),
  buildOrder('2025120307228'),
  buildOrder('2025120411229'),
  buildOrder('2025121412330'),
  buildOrder('2025121413031'),
  buildOrder('2025120307232'),
  buildOrder('2025120411233'),
  buildOrder('2025121412334'),
  buildOrder('2025121413025'),
  buildOrder('2025120307236'),
  buildOrder('2025120411237'),
  buildOrder('2025121412338'),
  buildOrder('2025121413039'),
  buildOrder('2025120307240'),
  buildOrder('2025120411241'),
  buildOrder('2025121412342'),
  buildOrder('2025121413043'),
  buildOrder('2025120307244'),
  buildOrder('2025120411245'),
  buildOrder('2025121412346'),
  buildOrder('2025121413047'),
  buildOrder('2025120307248'),
];
