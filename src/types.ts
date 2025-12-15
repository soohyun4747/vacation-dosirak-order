export type OrderStatus = 'PENDING' | 'PREPARING' | 'DELIVERING' | 'COMPLETED';

export interface Address {
  id?: string;
  main: string;
  detail: string;
  entranceCode?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  recentAddresses: Address[];
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

export interface CartItem {
  menu: MenuItem;
  quantity: number;
  deliveryDate: string;
  deliveryLabel: string;
}

export interface OrderItem {
  menuId: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  address: Address;
  createdAt: string;
  deliveryDate: string;
  items: OrderItem[];
  totalPrice: number;
  driverId?: string;
  driverName?: string;
}
