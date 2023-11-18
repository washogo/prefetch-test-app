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

/** サーバー側でもクライアント側でもMyAppコンポーネントが実行されるようにする */
// サーバー側でReduxのstoreが初期化され、各ページで状態が共有されることでエラー情報も共有されることになる
MyApp.getInitialProps = async (context: AppContext) => {
  return {};
};
