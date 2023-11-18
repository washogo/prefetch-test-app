import { createSlice } from '@reduxjs/toolkit';

export const errorSlice = createSlice({
  name: 'error',
  initialState: {
    value: null,
  },
  reducers: {
    setError: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setError } = errorSlice.actions;

export default errorSlice;
