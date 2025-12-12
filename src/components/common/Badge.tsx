import { OrderStatus } from '../../types';

const colorMap: Record<OrderStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  PREPARING: 'bg-blue-100 text-blue-800 border-blue-200',
  DELIVERING: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  COMPLETED: 'bg-green-100 text-green-800 border-green-200',
};

export const Badge = ({ status }: { status: OrderStatus }) => (
  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${colorMap[status]}`}>
    {status}
  </span>
);
