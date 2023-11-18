import { store } from '@/contexts/store';
import '@/styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  return {};
};
