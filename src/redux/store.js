import { configureStore } from '@reduxjs/toolkit';
import reservationReducer from './reservations/reservationSlice';
import carsReducer from './cars/carsSlice';
import modelsReducer from './cars/modelsSlice';

const store = configureStore({
  reducer: {
    reservations: reservationReducer,
    cars: carsReducer,
    models: modelsReducer,
  },
});

export default store;
