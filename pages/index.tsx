import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import DateComponent from "../components/date"; 
import { GetStaticProps } from "next";

export default function Home(
  {buildTimeStamp, allPostsData}
  // RfM NOTE that I haven't typed these correctly. Not sure how to do that.

  /*
  {
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}
*/
) {
  return (
    <Layout home> 
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello. I'm Rob. I'm an actuary, coder, blockchain developer and
          sailor.
        </p>
        <p>
          (Build Time: {buildTimeStamp} )
        </p>
        
        <p>
          (This is a sample website - you’ll be building a site like this in{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <DateComponent dateString={date} />
              </small>
            </li>
          ))}
        </ul>
        
          
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  //let unix_timestamp = 1549312452
  let timestamp:number = Date.now();
  let buildDate:Date = new Date(timestamp);
  let buildHours:string = buildDate.getHours().toString();
  let buildMinutes:string = "0" + buildDate.getMinutes();
  let buildSeconds:string = "0" + buildDate.getSeconds();
  const buildTimeStamp:string = buildHours+":"+buildMinutes.substr(-2)+":"+buildSeconds.substr(-2)
  const allPostsData = getSortedPostsData(); 
  return {
    props: {
      allPostsData,
      buildTimeStamp
    },
  };
};
