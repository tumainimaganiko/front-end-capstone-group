import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { TOKENKEY } from '../../util/auth';

const initialState = {
  reservations: [],
  isLoading: false,
  error: '',
};

const baseUrl = 'https://car-rental-api-91yl.onrender.com/api/v1/rentals';

export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async () => {
  const response = await axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem(TOKENKEY))}`,
    },
  });
  return response.data;
});

export const createReservation = createAsyncThunk(
  'books/createReservation',
  (reservationData) => (
    axios.post(baseUrl, reservationData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem(TOKENKEY))}`,
      },
    })
      .then((response) => response.data)),
);

console.log(JSON.parse(localStorage.getItem(TOKENKEY)));
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

      .addCase(fetchReservations.fulfilled, (state, action) => ({
        ...state,
        reservations: action.payload,
        isLoading: false,
      }))

      .addCase(fetchReservations.rejected, (state, action) => ({
        ...state,
        error: action.error,
        isLoading: true,
      }))

      .addCase(createReservation.pending, (state) => ({
        ...state,
        isLoading: true,
      }))

      .addCase(createReservation.fulfilled, (state, action) => ({
        ...state,
        reservations: action.payload,
        isLoading: false,
      }))

      .addCase(createReservation.rejected, (state, action) => ({
        ...state,
        isLoading: true,
        error: action.error,
      }));
  },
});

export default reservationSlice.reducer;
