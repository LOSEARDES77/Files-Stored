import React, { ChangeEvent, useRef, useState } from "react";
import styles from "./Upload.module.scss";
import Button from "../Common/Button";
import { fileUpload } from "@/utils/fileUpload";
import Progress from "@/components/Common/Progress";
import { addFolder } from "@/utils/Firestore";
import { v4 as randUUID } from "uuid";
import { useRouter } from "next/router";
import { AiFillHome } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSession } from "@/hook/useSession";

export default function UploadFiles({ parentId = "" }: { parentId: string }) {
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFolderVisible, setFolderVisible] = useState(false);
  const [folderName, setFolderName] = useState("");
  const folderId = () => {
    return randUUID();
  };
  const { email } = useSession();
  const showtoast = () => {
    if (progress === 100) {
      setTimeout(() => {
        setProgress(0);
      }, 3000);
      return true;
    }
    return false;
  };
  const router = useRouter();
  const uploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    let file = event.target.files?.[0];
    fileUpload(file, setProgress, parentId, email as string);
  };

  const handleAddFileClick = () => {
    fileInputRef.current?.click();
  };
  const uploadFolder = () => {
    let fn = "";
    fn = folderName;
    if (fn === "" || fn === " " || fn === null) return;
    if (fn.length > 20) {
      alert("Folder name should be less than 20 characters");
      setFolderName("");
      return;
    }
    while (true) {
      if (fn.startsWith(" ")) {
        fn = fn.trimStart();
      } else {
        break;
      }
    }
    fn = fn.trimEnd();
    let payload = {
      uuid: folderId(),
      folderName: folderName,
      isFolder: true,
      FileList: [],
      parentId: parentId || "",
      email: email as string,
    };
    addFolder(payload);
    setFolderName("");
  };
  return (
    <div className={`${styles.Upload}`}>
      {parentId !== "" ? (
        <>
          <Button
            btnClass={`btn-info ${styles.home} ${styles.btn}`}
            lable={<AiFillHome />}
            onClick={() => router.push("/")}
          />

          <Button
            btnClass={`btn-info ${styles.btn}`}
            lable={<IoMdArrowRoundBack/>}
            onClick={() => router.back()}
          />
        </>
      ) : (
        <></>
      )}
      <Button
        onClick={handleAddFileClick}
        btnClass={`btn-info ${styles.btn}`}
        lable="Add File"
      />
      <input
        ref={fileInputRef}
        onChange={(event) => uploadFile(event)}
        type="file"
        className={styles.hidden}
      />
      <Button
        btnClass={`btn-info ${styles.btn}`}
        lable="Add Folder"
        onClick={() => setFolderVisible(!isFolderVisible)}
      />

      {isFolderVisible ? (
        <div className={styles.folderinput}>
          <input
            type="text"
            placeholder="Type here"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className={`input input-bordered w-full max-w-xs ${styles.btn}`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                uploadFolder();
              }
            }}
          />
          <Button
            btnClass={`${styles.btn}`}
            lable="Add"
            onClick={uploadFolder}
          />
        </div>
      ) : (
        <></>
      )}
      {progress === 0 || progress === 100 ? (
        <></>
      ) : (
        <div
          className={`tooltip tooltip-info tooltip-open ${styles.progTooltip}`}
          data-tip={`${progress}%`}
        >
          <Progress progress={progress} />
        </div>
      )}
      {showtoast() ? (
        <div className="toast toast-end">
        <div className="alert alert-success">
          <span>File uploades successfully!</span>
        </div>
      </div>
      ): (<></>)}
    </div>
  );
}
