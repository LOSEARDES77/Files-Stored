import Head from "next/head";
import HomePage from "@/components/Home";
import { useSession } from "@/hook/useSession";

export default function Home() {
  const { isLogin, email } = useSession();
  return (
    <>
      <Head>
        {isLogin ? (
          <title>{email.split("@")[0]} | Files</title>
        ) : (
          <title>Files Stored</title>
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="description" content="A cloud storage app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </>
  );
}

// TODO: add function to delete files from storage and firestore
