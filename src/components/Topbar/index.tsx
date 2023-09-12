import React from "react";
import { getEmail, userFetchSession } from "@/hook/useSession";
import Button from "@/components/Common/Button";
import styles from "@/components/Topbar/Topbar.module.scss";
import UploadFiles from "../UploadFiles";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export default function TopBar({parentId = ""}:{parentId: string}) {
  const session = userFetchSession();
  const email = getEmail()
  const name = email?.split("@")[0]
  const router = useRouter();
  return (
    <div className={styles.page}>
      {email ? (
        <div className={styles.topbar}>
          <UploadFiles parentId={parentId}/>
          <div className={styles.singout}>
            <span
              className={`text-5xl font-extrabold tracking-tight text-white sm:text-[1.6rem] ${styles.lable}`}
            >
              Welcome {name}
            </span>
              <Button
              btnClass={`btn-error btn-outline ${styles.sobutton}`}
              lable="Sing Out"
              onClick={() => {signOut(auth); router.reload()}}/>
            
          </div>
        </div>
      ) : (
        <div className={styles.center}>
          <h1 className={styles.welcome}>Welcome!</h1>
          <div className={styles.singIn}>
            <Button
              btnClass={`btn-info ${styles.btns}`}
              lable="Login"
              onClick={() => router.push("/auth/login")}
            />
            <Button
              btnClass={`btn-info ${styles.btns}`}
              lable="Sing up"
              onClick={() => router.push("/auth/signup")}
            />
          </div>
          <div className={styles.desc}>
            This is a simple file upload application, where you can upload files
            and folders like google drive.
          </div>
        </div>
      )}
    </div>
  );
}
