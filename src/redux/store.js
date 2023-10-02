import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './cars/carsSlice';
import modelsReducer from './cars/modelsSlice';

const store = configureStore({
  reducer: {
    cars: carsReducer,
    models: modelsReducer,
  },
});

export default store;
