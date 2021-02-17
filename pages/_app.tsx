import "../styles/global.css";
import { AppProps } from "next/app";
import React, { useState } from "react";
import Head from "next/head";
import theme from "../components/ui/Theme";
import { ThemeProvider } from "@material-ui/styles";
import MyHeader from "../components/ui/Header";
import Footer from "../components/ui/Footer";

export default function App({ Component, pageProps }: AppProps) {
  const [tabValue, setTabValue] = useState<number | false>(false);
  const [selectedIndexServices, setSelectedIndexServices] = useState<
    number | undefined
  >(0);
  const [selectedIndexTools, setSelectedIndexTools] = useState<
    number | undefined
  >(0);

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
        <MyHeader
          tabValue={tabValue}
          setTabValue={setTabValue}
          selectedIndexServices={selectedIndexServices}
          setSelectedIndexServices={setSelectedIndexServices}
          selectedIndexTools={selectedIndexTools}
          setSelectedIndexTools={setSelectedIndexTools}
        />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </React.Fragment>
  );
}
