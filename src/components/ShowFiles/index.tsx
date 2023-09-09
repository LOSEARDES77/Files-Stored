import React from "react";
import styles from "@/components/ShowFiles/Files.module.scss";
import { fetchFiles } from "@/hook/fetchFiles";
import Card from "../Common/imgCard";
import { AiFillFileText, AiFillFolder } from "react-icons/ai";

export default function ShowFiles() {
  let { fileList } = fetchFiles();
  const openFile = (imageLink: string) => {
    window.open(imageLink);
  };
  return (
    <div className={styles.fileGrid}>
      {fileList.map(
        (file: { imageLink: "", imageName: "", isFolder: false, folderName: "" }) => {
          return (
            <div>
              <div
                className={`bg-info ${styles.file}`}
                onClick={() => openFile(file.imageLink)}
              >
                {file.isFolder ? (
                  <><AiFillFolder size={80} color="#f8fefc" /><p className={styles.lable}>{file.folderName}</p></>
                ) : (
                  <><AiFillFileText size={80} color="#f8fefc" /><p className={styles.lable}>{file.imageName}</p></>
                )}
              </div>
            </div>
          );
        },
      )}
    </div>
  );
}
