import React from "react";
import { userFetchSession } from "@/hook/useSession";
import { signIn, signOut } from "next-auth/react";
import Button from "@/components/Common/Button";
import styles from "@/components/Topbar/Topbar.module.scss";
import UploadFiles from "../UploadFiles";

export default function TopBar() {
  let session = userFetchSession();
  return (
    <div className={styles.page}>
      {session ? (
        <div>
          <UploadFiles />
          <div className={styles.singout}>
            <span
              className={`text-5xl font-extrabold tracking-tight text-white sm:text-[1.6rem] ${styles.lable}`}
            >
              Welcome {session.user.name}
            </span>
            
            <details className="dropdown mb-32"><summary className="dropdown-button">
            <img
                className={styles.profilaImg}
                src={session?.user.image as string}
                alt=""
              />
              </summary>
              <div className="dropdown-content"><Button
              btnClass={`btn-error btn-outline ${styles.sobutton}`}
              lable="Sing Out"
              onClick={() => signOut()}
            /></div>
            </details>
            
          </div>
        </div>
      ) : (
        <div className={styles.center}>
          <h1 className={styles.welcome}>Welcome!</h1>
          <Button
            btnClass="btn-info"
            lable="Sing in"
            onClick={() => signIn()}
          />
          <div className={styles.desc}>
            This is a simple file upload application, where you can upload files
            and folders like google drive.
          </div>
        </div>
      )}
    </div>
  );
}
