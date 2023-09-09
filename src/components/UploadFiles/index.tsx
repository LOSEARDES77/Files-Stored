import React, { ChangeEvent, useRef, useState } from "react";
import styles from "./Upload.module.scss";
import Button from "../Common/Button";
import { fileUpload } from "@/utils/fileUpload";
import Progress from "@/components/Common/Progress";
import { set } from "zod";
import { addFolder } from "@/utils/Firestore";

export default function UploadFiles() {
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFolderVisible, setFolderVisible] = useState(false);
  const [folderName, setFolderName] = useState("");
  const uploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    let file = event.target.files?.[0];
    fileUpload(file, setProgress);
  };

  const handleAddFileClick = () => {
    fileInputRef.current?.click();
  };

  const uploadFolder = () => {
    let payload = {
      folderName: folderName,
      isFolder: true,
      FileList: [],
    };
    addFolder(payload)
    setFolderName("")
  };
  return (
    <div
      className={`font-extrabold tracking-tight text-white sm:text-[1.6rem] ${styles.Upload}`}
    >
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
          />
          <Button btnClass={`${styles.btn}`} lable="Add" onClick={uploadFolder} />
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
    </div>
  );
}
