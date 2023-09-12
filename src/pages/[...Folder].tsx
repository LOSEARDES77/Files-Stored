import React from "react";
import { useRouter } from "next/router";
import TopBar from "@/components/Topbar";
import ShowFiles from "@/components/ShowFiles";
import { useSession } from "@/hook/useSession";
import styles from "./folder.module.scss";
import Button from "@/components/Common/Button";

export default function Folder() {
  const router = useRouter();
  const uuid = router?.query?.id;
  const { isLogin, email } = useSession();
  const checkPermission = () => {
    if (uuid === undefined) {
      router.push("/");
      return;
    }
  };
  return (
    <>
      {isLogin ? (
        <>
          {checkPermission()}
          <TopBar parentId={uuid as string} email={email} />
          <ShowFiles parentId={uuid as string} email={email} />
        </>
      ) : (
        <>
        {// TODO: add some style here to center this //
        }
          <div className={`${styles.nologin} `}>
            Please consider login first!
            <Button btnClass={`btn-info ${styles.btn}`} lable="Go to login" onClick={() => router.push("/auth/login")}/>
          </div>
        </>
      )}
    </>
  );
}
