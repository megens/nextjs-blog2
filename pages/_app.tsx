import "../styles/global.css";
import { AppProps } from "next/app";
import Header from '../components/ui/header'
import React from 'react'

export default function App({ Component, pageProps }: AppProps) {
  //return <Component {...pageProps} />; 
  return (
  <React.Fragment> 
    <Header/>
    <Component {...pageProps} />
  </React.Fragment>)

}
