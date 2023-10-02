import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { TOKENKEY } from '../../util/auth';

const baseUrl = 'https://car-rental-api-91yl.onrender.com/api/v1/model';

const initialState = {
  models: [],
  isLoading: false,
  error: null,
};

export const fetchModels = createAsyncThunk('models/fetchModels', async () => {
  const token = JSON.parse(localStorage.getItem(TOKENKEY));

  try {
    const response = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw Error(error.response?.data?.message || 'Failed to fetch models');
  }
});

const modelsSlice = createSlice({
  name: 'models',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchModels.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchModels.fulfilled, (state, action) => {
        state.models = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchModels.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default modelsSlice.reducer;
