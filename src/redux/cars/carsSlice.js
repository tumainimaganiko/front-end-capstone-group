import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { TOKENKEY } from '../../util/auth';

const baseUrl = 'https://car-rental-api-91yl.onrender.com/api/v1/car';

const initialState = {
  cars: [],
  isLoading: false,
  error: null,
};

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async () => {
    const response = await axios.get(baseUrl);
    console.log(response.data);
    return response.data;
  },
);

export const addCar = createAsyncThunk(
  'cars/addCar',
  async (car) => {
    const response = await axios.post(baseUrl, car.car, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem(TOKENKEY))}`,
      },
    });
    console.log(response.data);
    return response.data;
  },
);

export const deleteCar = createAsyncThunk(
  'cars/deleteCar',
  async (id) => {
    await axios.delete(`${baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem(TOKENKEY))}`,
      },
    });
    return id;
  },
);

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCars.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchCars.fulfilled, (state, action) => ({
        ...state,
        cars: [...state.cars, ...action.payload],
        isLoading: false,
      }))
      .addCase(fetchCars.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error.message,
      }))
      .addCase(deleteCar.fulfilled, (state, action) => ({
        ...state,
        cars: state.cars.filter((car) => car.id !== action.payload),
      }));
  },
});

export default carsSlice.reducer;
