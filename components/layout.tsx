import React from "react";
import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import MyHeader from "./ui/Header";
import Footer from "./ui/Footer";
//import theme from "./ui/Theme";
//import { ThemeProvider } from "@material-ui/styles";

const name = "Robert M (TypeScript)";

export const siteTitle = "Ockham Actuarial";

// RfM: moved ThemeProvider to _app.tsx
export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <React.Fragment>
      {
        //      <ThemeProvider theme={theme}>
        //      <MyHeader/>>
      }
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="ockham actuarial ltd" />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className={home ? styles.container : styles.thincontainer}>
        <main>{children}</main>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
      </div>

      {
        //  <Footer/>
        //  </ThemeProvider>
      }
    </React.Fragment>
  );
}
