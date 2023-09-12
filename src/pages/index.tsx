import Head from "next/head";
import HomePage from "@/components/Home";
import { userFetchSession } from "@/hook/useSession";

export default function Home() {
  return (
    <>
      <Head>
        {userFetchSession() ? (
          <title>{userFetchSession()?.email?.split("@")[0]} | Files</title>
        ) : (
          <title>Files Stored</title>
        )}
        <meta name="description" content="A cloud storage app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </>
  );
}
