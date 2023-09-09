import Head from "next/head";
import HomePage from "@/components/Home";

export default function Home() {
  return (
    <>
      <Head>
        <title>Files Stored</title>
        <meta name="description" content="A google drive clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </>
  );
}
