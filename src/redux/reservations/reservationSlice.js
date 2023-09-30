import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  reservations: [],
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
