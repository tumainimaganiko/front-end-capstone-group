import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { TOKENKEY } from '../../util/auth';

const initialState = {
  reservations: [],
  reservationIsLoading: false,
  error: [],
  reservedDatesByCarId: {},
};
const baseUrl = 'https://car-rental-api-91yl.onrender.com/api/v1/rentals';
export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async () => {
  const response = await axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem(TOKENKEY))}`,
    },
  });
  const reservations = response.data;
  const disabledDates = reservations.map((reservation) => reservation.rental_date);

  return { reservations, disabledDates };
});
export const createReservation = createAsyncThunk(
  'reservations/createReservation',
  (reservationData) => (
    axios.post(baseUrl, reservationData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem(TOKENKEY))}`,
      },
    })
      .then((response) => response.data)),
);
const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => ({
        ...state,
        isLoading: true,
      }))

      .addCase(fetchReservations.rejected, (state, action) => ({
        ...state,
        error: action.error,
        isLoading: false,
      }))

      .addCase(fetchReservations.fulfilled, (state, action) => ({
        ...state,
        reservations: action.payload,
        isLoading: false,
      }))

      .addCase(createReservation.pending, (state) => ({
        ...state,
        reservationIsLoading: true,
        error: [],
      }))
      .addCase(createReservation.fulfilled, (state, action) => ({
        ...state,
        reservations: action.payload,
        reservationIsLoading: false,
        error: [],
      }))
      .addCase(createReservation.rejected, (state, action) => ({
        ...state,
        reservationIsLoading: false,
        error: action.error,
      }));
  },
});
export default reservationSlice.reducer;
