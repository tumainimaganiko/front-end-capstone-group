import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { TOKENKEY } from '../../util/auth';
import car1 from '../../images/car1.png';
import car2 from '../../images/car2.png';
import car3 from '../../images/car3.png';

const baseUrl = 'http://localhost:3000/api/....';

const initialState = {
  cars: [{
    id: 1,
    name: 'Car 1',
    image: car1,
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: '25$',
    city: 'Paris',
  },
  {
    id: 2,
    name: 'Car 2',
    image: car2,
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: '12$',
    city: 'Paris',
  },
  {
    id: 3,
    name: 'Car 3',
    image: car3,
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: '20$',
    city: 'Paris',
  },
  {
    id: 4,
    name: 'Car 4',
    image: car2,
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: '35$',
    city: 'Paris',
  },
  {
    id: 5,
    name: 'Car 5',
    image: car2,
    details: 'Lorem ipsum ',
    price: '29$',
    city: 'Paris',
  },
  {
    id: 6,
    name: 'Car 6',
    image: car3,
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: '5$',
    city: 'Paris',
  }],
  isLoading: false,
  error: null,
};

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async () => {
    const response = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKENKEY)}`,
      },
    });
    return response.data;
  },
);

export const addCar = createAsyncThunk(
  'cars/addCar',
  async (car) => {
    const response = await axios.post(baseUrl, car, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKENKEY)}`,
      },
    });
    return response.data;
  },
);

export const deleteCar = createAsyncThunk(
  'cars/deleteCar',
  async (id) => {
    await axios.delete(`${baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKENKEY)}`,
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
      .addCase(fetchCars.fulfilled, (state, action) => ({
        ...state,
        cars: action.payload,
        isLoading: false,
      }))
      .addCase(deleteCar.fulfilled, (state, action) => ({
        ...state,
        cars: state.cars.filter((car) => car.id !== action.payload),
      }));
  },
});

export default carsSlice.reducer;
