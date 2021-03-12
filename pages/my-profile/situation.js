// https://dev.to/mgranados/how-to-build-a-simple-login-with-nextjs-and-react-hooks-255

import Head from "next/head";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import Link from "next/link";
import cookie from "cookie";

import authenticated from "../../utils/authenticator";

function Situation() {
  console.log("start");

  return (
    <div>
      <Head>
        <title>Welcome to Situation page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>Situation</h1>
    </div>
  );
}

export default authenticated(Situation);
