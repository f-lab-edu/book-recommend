import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import { globalStyles } from '@/styles/globalStyles';
import Provider from '@/provider/Provider';
import Layout from './layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Layout>
        <Global styles={globalStyles} />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
