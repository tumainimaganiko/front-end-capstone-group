import { configureStore } from '@reduxjs/toolkit';
import reservationReducer from './reservations/reservationSlice';
import carsReducer from './cars/carsSlice';

const store = configureStore({
  reducer: {
    reservations: reservationReducer,
    cars: carsReducer,
  },
});

export default store;
