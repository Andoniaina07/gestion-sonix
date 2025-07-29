import { createSlice } from "@reduxjs/toolkit";
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
      // ALL
      .addCase(fetchAllDeliveries.fulfilled, (state, action) => {
        state.deliveries = action.payload;
      })

      // AVAILABLE
      .addCase(fetchAvailableDeliveries.fulfilled, (state, action) => {
        state.available = action.payload;
      })

      // MY
      .addCase(fetchMyDeliveries.fulfilled, (state, action) => {
        state.myDeliveries = action.payload;
      })

      // DRIVER CURRENT
      .addCase(fetchDriverDelivery.fulfilled, (state, action) => {
        state.driverCurrent = action.payload;
      })

      // CONFIRMATIONS & STATUS
      .addCase(adminConfirmDelivery.fulfilled, () => {})
      .addCase(driverConfirmDelivery.fulfilled, () => {})
      .addCase(changeDeliveryStatus.fulfilled, () => {})
      .addCase(sendDeliveryImage.fulfilled, () => {})

      // UPDATE PRICE
      .addCase(changeDeliveryPrice.fulfilled, (state, action) => {
        const updated = action.payload;

        const index = state.deliveries.findIndex(d => d.id === updated.id);
        if (index !== -1) {
          state.deliveries[index] = updated;
        }

        const myIndex = state.myDeliveries.findIndex(d => d.id === updated.id);
        if (myIndex !== -1) {
          state.myDeliveries[myIndex] = updated;
        }

        if (state.driverCurrent?.id === updated.id) {
          state.driverCurrent = updated;
        }
      });
  },
});

export default deliverySlice.reducer;

