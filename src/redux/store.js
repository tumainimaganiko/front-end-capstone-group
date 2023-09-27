import { configureStore } from '@reduxjs/toolkit';
import reservationReducer from './reservations/reservationSlice';

const store = configureStore({
  reducer: {
    reservations: reservationReducer,
  },
});

export default store;
