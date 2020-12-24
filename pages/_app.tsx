import "../styles/global.css";
import { AppProps } from "next/app";
//import { useEffect } from 'react';

/*
according to 
https://dev.to/felixmohr/setting-up-a-blog-with-next-js-react-material-ui-and-typescript-2m6k

2. In your _app.tsx, apply a useEffect hook to remove the CSS that were injected on server-side from the client-side app:
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])
By doing this, we allow the client to take over styling the app as soon as its ready.

*/

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />; 
}
