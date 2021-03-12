// https://dev.to/mgranados/how-to-build-a-simple-login-with-nextjs-and-react-hooks-255

import Head from "next/head";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import Link from "next/link";
import cookie from "cookie";

function Dashboard() {
  console.log("start");

  const verifierURL = "/api/me";
  /*const fetcher = async function (args) {
    const res = await fetch(args);
    return res.json();
  };
  */
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, revalidate } = useSWR(verifierURL, fetcher);

  //const { data, revalidate } = useSWR(verifierURL, fetcher);
  if (error) return <div>Error validating access.</div>;

  if (!data) return <div>Loading...</div>;
  let loggedIn = false;
  if (data.email) {
    loggedIn = true;
  }
  return (
    <div>
      <Head>
        <title>Welcome to landing page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>Simplest login</h1>

      <h2>Proudly using Next.js, Mongodb and deployed with Now</h2>
      {loggedIn && (
        <>
          <p>Welcome {data.email}!</p>
          <button
            onClick={async () => {
              //cookie.remove("token");
              // make api call to remove cookie
              await fetch("/api/logout");
              revalidate();
            }}
          >
            Logout
          </button>
        </>
      )}
      {!loggedIn && (
        <>
          <Link href="/loginForm">Login</Link>
          <p>or</p>
          <Link href="/registerForm">Register</Link>
        </>
      )}
    </div>
  );
}

export default Dashboard;
