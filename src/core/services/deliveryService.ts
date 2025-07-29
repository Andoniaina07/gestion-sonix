import api from "../../lib/api";
import { UpdateDeliveryStatusDto,UpdateDeliveryPriceDto } from "../models/deliveryModels";

export const getAllDeliveries = async () => {
  const res = await api.get("/deliveries");
  return res.data;
};

export const uploadDeliveryImage = async (id: string, image: File) => {
  const formData = new FormData();
  formData.append("packageImage", image);
  const res = await api.post(`/deliveries/${id}/with-image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getAvailableDeliveries = async () => {
  const res = await api.get("/deliveries/available");
  return res.data;
};

export const getMyDeliveries = async () => {
  const res = await api.get("/deliveries/my-deliveries");
  return res.data;
};

export const confirmAdminDelivery = async (id: string, driverId?: string) => {
  const res = await api.patch(`/deliveries/${id}/confirm-admin`, { driverId });
  return res.data;
};


export const confirmDriverDelivery = async (id: string) => {
  const res = await api.patch(`/deliveries/${id}/confirm-driver`);
  return res.data;
};

export const updateDeliveryStatus = async (id: string, data: UpdateDeliveryStatusDto) => {
  const res = await api.patch(`/deliveries/${id}/status`, data);
  return res.data;
};

export const getDriverCurrentDelivery = async () => {
  const res = await api.get("/deliveries/driver-delivery");
  return res.data;
};

export const updateDeliveryPrice = async (id: string, data: UpdateDeliveryPriceDto) => {
  const res = await api.put(`/deliveries/${id}`, data);
  return res.data;
};
