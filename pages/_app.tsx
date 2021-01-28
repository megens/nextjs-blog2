import "../styles/global.css";
import { AppProps } from "next/app";
import React from "react";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  //return <Component {...pageProps} />;
  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  );
}
