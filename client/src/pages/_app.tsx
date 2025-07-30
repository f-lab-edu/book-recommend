import type { AppProps } from "next/app";
import { Global } from "@emotion/react";
import { globalStyles } from "@/styles/globalStyles";
import Provider from "@/provider/Provider";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Provider>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </Provider>
  )
}
