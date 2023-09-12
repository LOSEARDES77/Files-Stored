import React from "react";
import styles from "@/components/ShowFiles/Files.module.scss";
import { fetchFiles } from "@/hook/fetchFiles";
/* import Card from "../Common/imgCard"; */
import { AiFillFileText, AiFillVideoCamera, AiOutlineLink } from "react-icons/ai";
import { FcOpenedFolder } from "react-icons/fc";
import { useRouter } from "next/router";
import { getEmail } from "@/hook/useSession";


export default function ShowFiles({ parentId, email }: { parentId: string, email: string }) {
  let { fileList } = fetchFiles( parentId, email );
  const router = useRouter();
  const openFile = (imageLink: string) => {
    window.open(imageLink);
  };
  const share = (il: string) => {
    // copy imagelink to clipboard
    navigator.clipboard.writeText(il);
  };
  return (
    <div className={styles.fileGrid}>
      {fileList.map(
        (file: {
          id: "";
          uuid: "";
          imageLink: "";
          imageName: "";
          isFolder: boolean;
          folderName: "";
        }) => {
          let fe = ""
          if (file.imageName !== "") {
            if (file.imageName) {
              let a = file.imageName as string;
              fe = a.split(".").pop() || "";
            }
          }
          return (
            <div key={file.id}>
              {file.isFolder ? (
                <div
                  className={`bg-info ${styles.file}`}
                  onClick={() => {
                    router.push(`/folder?id=${file.uuid}`);
                  }}
                >
                  <FcOpenedFolder size={80} color="#f8fefc" />
                  <p className={styles.lable}>{file.folderName}</p>
                </div>
              ) : (
                <div
                  className={`bg-info ${styles.file}`}
                >
                  <div onClick={() => openFile(file.imageLink)}>
                  {file.imageLink === "" ? (
                    <AiFillFileText size={80} color="#f8fefc" />
                  ) : fe === "mp4" || fe === "webm" ? (
                    <video src={file.imageLink} muted={true} autoPlay={true} className={styles.imageLink} />
                  ): fe === "jpg" || fe === "jpeg" || fe === "png" || fe === "gif" || fe === "bmp" ? (
                    <img src={file.imageLink} className={styles.imageLink} />
                  ): fe === "mp3" || fe === "wav" || fe === "ogg" || fe === "aac" || fe === "m4a" || fe === "wma" || fe === "flac" ? (
                    <audio src={file.imageLink} controls={true} className={styles.audio} />
                  ) : (
                    <AiFillFileText size={80} color="#f8fefc" />
                  )}
                  </div>
                  <p className={styles.lable}>{file.imageName}</p>
                  <div onClick={() => share(file.imageLink)} className={`${styles.share}`}> <AiOutlineLink size={30} color="#f8fefc" /> </div>
                </div>
              )}
            </div>
          );
        }
      )}
    </div>
  );
}
