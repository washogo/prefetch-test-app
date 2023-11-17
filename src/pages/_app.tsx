import '@/styles/globals.css';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { AppContext, AppProps } from 'next/app';
import { Provider } from 'react-redux';

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

export const store = configureStore({
  reducer: {
    error: errorSlice.reducer,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
