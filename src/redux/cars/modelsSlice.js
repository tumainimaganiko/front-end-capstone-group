import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { TOKENKEY } from '../../util/auth';

const baseUrl = 'https://car-rental-api-91yl.onrender.com/api/v1/model';

const initialState = {
  models: [],
  isLoading: false,
  error: null,
};

export const fetchModels = createAsyncThunk(
  'models/fetchModels',
  async () => {
    const token = localStorage.getItem(TOKENKEY);
    const response = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

export const addModel = createAsyncThunk(
  'models/addModel',
  async (model) => {
    const token = localStorage.getItem(TOKENKEY);
    const response = await axios.post(baseUrl, model, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

export const deleteModel = createAsyncThunk(
  'models/deleteModel',
  async (id) => {
    const token = localStorage.getItem(TOKENKEY);
    await axios.delete(`${baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  },
);

const modelsSlice = createSlice({
  name: 'models',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchModels.fulfilled, (state, action) => ({
        ...state,
        models: action.payload,
        isLoading: false,
      }))
      .addCase(deleteModel.fulfilled, (state, action) => ({
        ...state,
        models: state.models.filter((model) => model.id !== action.payload),
      }));
  },
});

export default modelsSlice.reducer;
