export enum DeliveryType {
  STANDARD = 'STANDARD',
  EXPRESS = 'EXPRESS',
  SAME_DAY = 'SAME_DAY',
}

export enum DeliveryStatus {
  PENDING = 'PENDING',
  CONFIRMED_ADMIN = 'CONFIRMED_ADMIN',
  CONFIRMED_DRIVER = 'CONFIRMED_DRIVER',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface Delivery {
  id: string;
  pickup_address: string;
  delivery_address: string;
  pickup_latitude: number;
  pickup_longitude: number;
  delivery_latitude: number;
  delivery_longitude: number;
  distanceKm: number;
  delivery_price: number;
  recipient_name: string;
  recipient_phone: string;
  delivery_type: DeliveryType;
  delivery_date?: string;
  package_description?: string;
  precision_pickup_location?: string;
  packageImageUrl?: string;
  status: DeliveryStatus;
  driverId?: string;
  createdAt: string;
}

export interface UpdateDeliveryStatusDto {
  status: DeliveryStatus;
  driverId?: string;
}

