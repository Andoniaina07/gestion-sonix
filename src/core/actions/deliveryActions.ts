import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllDeliveries,
  getAvailableDeliveries,
  getMyDeliveries,
  confirmAdminDelivery,
  confirmDriverDelivery,
  uploadDeliveryImage,
  updateDeliveryStatus,
  getDriverCurrentDelivery,
} from "../../core/services/deliveryService";
import { UpdateDeliveryStatusDto } from "../..//core/models/deliveryModels";

export const fetchAllDeliveries = createAsyncThunk("deliveries/fetchAll", getAllDeliveries);
export const fetchAvailableDeliveries = createAsyncThunk("deliveries/fetchAvailable", getAvailableDeliveries);
export const fetchMyDeliveries = createAsyncThunk("deliveries/fetchMine", getMyDeliveries);
export const fetchDriverDelivery = createAsyncThunk("deliveries/fetchDriver", getDriverCurrentDelivery);

export const sendDeliveryImage = createAsyncThunk(
  "deliveries/uploadImage",
  async ({ id, image }: { id: string; image: File }) => {
    return await uploadDeliveryImage(id, image);
  }
);

export const adminConfirmDelivery = createAsyncThunk(
  "deliveries/confirmAdmin",
  async (id: string) => {
    return await confirmAdminDelivery(id);
  }
);

export const driverConfirmDelivery = createAsyncThunk(
  "deliveries/confirmDriver",
  async (id: string) => {
    return await confirmDriverDelivery(id);
  }
);

export const changeDeliveryStatus = createAsyncThunk(
  "deliveries/updateStatus",
  async ({ id, data }: { id: string; data: UpdateDeliveryStatusDto }) => {
    return await updateDeliveryStatus(id, data);
  }
);
