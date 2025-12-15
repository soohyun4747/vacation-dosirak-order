export type UserRole = 'customer' | 'admin' | 'driver';

export interface MockUser {
  id: string;
  role: UserRole;
  name: string;
  password: string;
  redirect: string;
  description: string;
}

export const mockUsers: MockUser[] = [
  {
    id: 'customer',
    role: 'customer',
    name: '홍길동 고객',
    password: 'customer123',
    redirect: '/customer/order',
    description: '도시락을 주문하고 배송 상태를 확인하는 고객용 계정',
  },
  {
    id: 'admin',
    role: 'admin',
    name: '관리자 김운영',
    password: 'admin123',
    redirect: '/admin/orders',
    description: '주문 현황 관리와 배송기사 배정용 관리자 계정',
  },
  {
    id: 'driver',
    role: 'driver',
    name: '배송기사 박배달',
    password: 'driver123',
    redirect: '/driver/deliveries',
    description: '배송 목록 확인과 배송 완료 처리용 배송기사 계정',
  },
];

export const roleLabels: Record<UserRole, string> = {
  customer: '고객',
  admin: '관리자',
  driver: '배송기사',
};
