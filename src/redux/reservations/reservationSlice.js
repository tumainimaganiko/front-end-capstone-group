import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { TOKENKEY } from '../../util/auth';

const initialState = {
  reservations: [],
};

const baseUrl = 'https://car-rental-api-91yl.onrender.com/api/v1/rentals';

export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async () => {
  const response = await axios.get(baseUrl);
  return response.data;
});

export const createReservation = createAsyncThunk(
  'books/createReservation',
  async (reservationData, thunkAPI) => {
    try {
      const response = await axios.post(baseUrl, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem(TOKENKEY))}`,
        },
        reservationData
      });
      thunkAPI.dispatch(fetchReservations());
      return response.data;
    } catch (error) {
      throw error;
    }
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
