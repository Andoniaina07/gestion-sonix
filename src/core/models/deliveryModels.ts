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

export const DeliveryStatusLabels: Record<DeliveryStatus, string> = {
  [DeliveryStatus.PENDING]: "En attente",
  [DeliveryStatus.CONFIRMED_ADMIN]: "Confirmée par Admin",
  [DeliveryStatus.CONFIRMED_DRIVER]: "Confirmée par Chauffeur",
  [DeliveryStatus.PICKED_UP]: "Pris en charge",
  [DeliveryStatus.IN_TRANSIT]: "En cours de livraison",
  [DeliveryStatus.DELIVERED]: "Livrée",
  [DeliveryStatus.CANCELLED]: "Annulée",
};

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

export interface UpdateDeliveryPriceDto {
  delivery_price: number;
}
