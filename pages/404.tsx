// Error 404
import Layout from "../components/layout";
import Link from "next/link";
import { useRouter } from "next/router";

export default function FourOhFour() {
  const router = useRouter();
  return (
    <Layout>
      <h1>
        404 - No Match found for <code>{router.asPath}</code>
      </h1>
    </Layout>
  );
}
