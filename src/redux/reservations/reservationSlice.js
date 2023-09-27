import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reservations: [],
};
const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    createReservation: (state, action) => {
      state.reservations.push(action.payload);
    },
  },
  extraReducers: {},
});

export const { createReservation } = reservationSlice.actions;

export default reservationSlice.reducer;
