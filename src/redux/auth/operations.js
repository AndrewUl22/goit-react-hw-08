import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global';

export function setToken(token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function clearToken() {
  axios.defaults.headers.common.Authorization = '';
}

export const register = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
        
    try {
      const response = await axios.post('/users/signup', formData);
      setToken(response.data.token);

      return response.data;
    } catch (error) {
      
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', formData);

      setToken(response.data.token);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue(
        'No token provide, to refresh user data.'
      );
    }

    try {
      setToken(token);
      const response = await axios.get('/users/current');

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logOut', async (_, thunkAPI) => {
  try {
    const response = await axios.post('/users/logOut');

    clearToken();

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});