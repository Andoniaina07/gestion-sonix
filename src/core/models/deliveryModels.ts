// Types de livraison
export enum DeliveryType {
  STANDARD = 'STANDARD',
  EXPRESS = 'EXPRESS',
  SAME_DAY = 'SAME_DAY',
}

// Statuts de livraison (techniques, ne pas modifier si utilisés avec le backend)
export enum DeliveryStatus {
  PENDING = 'PENDING',
  CONFIRMED_ADMIN = 'CONFIRMED_ADMIN',
  CONFIRMED_DRIVER = 'CONFIRMED_DRIVER',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

// Libellés en français pour l'affichage
export const DeliveryStatusLabels: Record<DeliveryStatus, string> = {
  [DeliveryStatus.PENDING]: 'En attente',
  [DeliveryStatus.CONFIRMED_ADMIN]: 'Confirmée par l\'admin',
  [DeliveryStatus.CONFIRMED_DRIVER]: 'Confirmée par le livreur',
  [DeliveryStatus.PICKED_UP]: 'Récupérée',
  [DeliveryStatus.IN_TRANSIT]: 'En cours de livraison',
  [DeliveryStatus.DELIVERED]: 'Livrée',
  [DeliveryStatus.CANCELLED]: 'Annulée',
};

// Interface de livraison
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

// DTO pour mise à jour du statut
export interface UpdateDeliveryStatusDto {
  status: DeliveryStatus;
  driverId?: string;
}

export interface UpdateDeliveryPriceDto {
  delivery_price: number;
}