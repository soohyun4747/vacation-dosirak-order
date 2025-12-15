import { OrderStatus } from '../../types';

const colorMap: Record<OrderStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  PREPARING: 'bg-amber-100 text-amber-800 border-amber-200',
  DELIVERING: 'bg-orange-100 text-orange-800 border-orange-200',
  COMPLETED: 'bg-green-100 text-green-800 border-green-200',
  CONFIRMED: 'bg-blue-100 text-blue-800 border-blue-200',
  DELIVERED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  CANCELED: 'bg-gray-100 text-gray-700 border-gray-200',
};

export const Badge = ({ status }: { status: OrderStatus }) => (
  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${colorMap[status]}`}>
    {status}
  </span>
);
