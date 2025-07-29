import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllDeliveries,
  fetchAvailableDeliveries,
  fetchMyDeliveries,
  fetchDriverDelivery,
  adminConfirmDelivery,
  driverConfirmDelivery,
  changeDeliveryStatus,
  sendDeliveryImage,
  changeDeliveryPrice,
} from "../actions/deliveryActions";
import { Delivery } from "../models/deliveryModels";

interface DeliveryState {
  deliveries: Delivery[];
  available: Delivery[];
  myDeliveries: Delivery[];
  driverCurrent: Delivery | null;
  loading: boolean;
  error: string | null;
}

const initialState: DeliveryState = {
  deliveries: [],
  available: [],
  myDeliveries: [],
  driverCurrent: null,
  loading: false,
  error: null,
};

const deliverySlice = createSlice({
  name: "deliveries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ===== FETCH ALL DELIVERIES =====
      .addCase(fetchAllDeliveries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDeliveries.fulfilled, (state, action: PayloadAction<Delivery[]>) => {
        state.deliveries = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllDeliveries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des livraisons.";
      })

      // ===== FETCH AVAILABLE DELIVERIES =====
      .addCase(fetchAvailableDeliveries.fulfilled, (state, action: PayloadAction<Delivery[]>) => {
        state.available = action.payload;
      })

      // ===== FETCH MY DELIVERIES =====
      .addCase(fetchMyDeliveries.fulfilled, (state, action: PayloadAction<Delivery[]>) => {
        state.myDeliveries = action.payload;
      })

      // ===== FETCH DRIVER CURRENT DELIVERY =====
      .addCase(fetchDriverDelivery.fulfilled, (state, action: PayloadAction<Delivery>) => {
        state.driverCurrent = action.payload;
      })

      // ===== ADMIN CONFIRM DELIVERY =====
      .addCase(adminConfirmDelivery.fulfilled, (state, action: PayloadAction<Delivery>) => {
        const updated = action.payload;
        const index = state.deliveries.findIndex((d) => d.id === updated.id);
        if (index !== -1) state.deliveries[index] = updated;
      })

      // ===== DRIVER CONFIRM DELIVERY =====
      .addCase(driverConfirmDelivery.fulfilled, (state, action: PayloadAction<Delivery>) => {
        const updated = action.payload;
        const index = state.deliveries.findIndex((d) => d.id === updated.id);
        if (index !== -1) state.deliveries[index] = updated;
        if (state.driverCurrent?.id === updated.id) {
          state.driverCurrent = updated;
        }
      })

      // ===== CHANGE DELIVERY STATUS =====
      .addCase(changeDeliveryStatus.fulfilled, (state, action: PayloadAction<Delivery>) => {
        const updated = action.payload;
        const index = state.deliveries.findIndex((d) => d.id === updated.id);
        if (index !== -1) state.deliveries[index] = updated;
      })

      // ===== SEND DELIVERY IMAGE =====
      .addCase(sendDeliveryImage.fulfilled, (state, action: PayloadAction<Delivery>) => {
        const updated = action.payload;
        const index = state.deliveries.findIndex((d) => d.id === updated.id);
        if (index !== -1) state.deliveries[index] = updated;
      })

      // ===== CHANGE DELIVERY PRICE =====
      .addCase(changeDeliveryPrice.fulfilled, (state, action: PayloadAction<Delivery>) => {
        const updated = action.payload;

        const index = state.deliveries.findIndex((d) => d.id === updated.id);
        if (index !== -1) state.deliveries[index] = updated;

        const myIndex = state.myDeliveries.findIndex((d) => d.id === updated.id);
        if (myIndex !== -1) state.myDeliveries[myIndex] = updated;

        if (state.driverCurrent?.id === updated.id) {
          state.driverCurrent = updated;
        }
      });
  },
});

export default deliverySlice.reducer;
