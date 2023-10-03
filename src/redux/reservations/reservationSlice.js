import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { TOKENKEY } from '../../util/auth';

const initialState = {
  reservations: [],
  isLoading: false,
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
  async (reservationData) => {
    try {
      const response = await axios.post(baseUrl, reservationData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem(TOKENKEY))}`,
        },
      });
      // thunkAPI.dispatch(fetchReservations());
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

console.log(JSON.parse(localStorage.getItem(TOKENKEY)));
const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReservations.fulfilled, (state, action) => ({
      ...state,
      reservations: action.payload,
    }));

    builder.addCase(createReservation.pending, (state) => ({
      ...state,
      isLoading: true,
    }));

    builder.addCase(createReservation.fulfilled, (state, action) => ({
      ...state,
      reservations: action.payload,
      isLoading: false,
    }));
  },
});

export default reservationSlice.reducer;
