import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  reservations: [
    {
      rentDate: '2001',
      returnDate: '2009',
      city: 'Dar es Salaam',
      car: { name: 'Mercedez Benz' },
      amount: '$1500',
    },
    {
      rentDate: '2021',
      returnDate: '2023',
      city: 'Niger',
      car: { name: 'BMW' },
      amount: '$1000',
    },
    {
      rentDate: '2017',
      returnDate: '2029',
      city: 'Kigali',
      car: { name: 'Porsche' },
      amount: '$2345',
    },
    {
      rentDate: '1998',
      returnDate: '2005',
      city: 'Algeria',
      car: { name: 'Mc Laren' },
      amount: '$4500',
    },
  ],
};

const baseUrl = 'http://localhost:3000/api/....';

export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async () => {
  const response = await axios.get(`${baseUrl}/reservations`);
  return response.data;
});

export const createReservation = createAsyncThunk(
  'books/createReservation',
  async (reservationData, thunkAPI) => {
    const response = await axios.post(
      `${baseUrl}/reservations/`,
      reservationData,
    );
    thunkAPI.dispatch(fetchReservations());
    return response.data;
  },
);

const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReservations.fulfilled, (state, action) => ({
      ...state,
      reservations: action.payload,
    }));
  },
});

export default reservationSlice.reducer;
