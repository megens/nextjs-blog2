import "../styles/global.css";
import { AppProps } from "next/app";
import React from "react";
import Head from "next/head";
import theme from "../components/ui/Theme";
import { ThemeProvider } from "@material-ui/styles";
import MyHeader from "../components/ui/Header";
import Footer from "../components/ui/Footer";

export default function App({ Component, pageProps }: AppProps) {
  //return <Component {...pageProps} />;
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
        </Head>
        <MyHeader />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </React.Fragment>
  );
}
