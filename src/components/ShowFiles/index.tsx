import React, { useState } from "react";
import styles from "@/components/ShowFiles/Files.module.scss";
import { useFetchFiles } from "@/hook/fetchFiles";
import { AiFillFileText,  AiOutlineLink } from "react-icons/ai";
import { FcOpenedFolder } from "react-icons/fc";
import { useRouter } from "next/router";
import Image from "next/image";

export default function ShowFiles({
  parentId,
  email,
}: {
  parentId: string;
  email: string;
}) {
  const { fileList } = useFetchFiles(parentId, email);
  const router = useRouter();
  const openFile = (imageLink: string) => {
    window.open(imageLink);
  };
  const [isToastVisible, setToastVisible] = useState(false);
  const showtoast = () => {
    if (isToastVisible) {
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
      return true;
    }
    return false;
  };
  const share = (il: string) => {
    // copy imagelink to clipboard
    navigator.clipboard.writeText(il);
    setToastVisible(true);
  };
  return (
    <>
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
            let fe = "";
            if (file.imageName !== "") {
              if (file.imageName) {
                const a = file.imageName as string;
                fe = a.split(".").pop() ?? "";
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
                  > <div className={styles.imageLink}>
                    <FcOpenedFolder size={80} color="#f8fefc" />
                    </div>
                    <p className={styles.lable}>{file.folderName}</p>
                  </div>
                ) : (
                  <div className={`bg-info ${styles.file}`}>
                    <div onClick={() => openFile(file.imageLink)}>
                      {file.imageLink === "" ? (
                        <AiFillFileText size={80} color="#f8fefc" />
                      ) : fe === "mp4" || fe === "webm" ? (
                        <video
                          src={file.imageLink}
                          muted={true}
                          autoPlay={true}
                          className={styles.imageLink}
                        />
                      ) : fe === "jpg" ||
                        fe === "jpeg" ||
                        fe === "png" ||
                        fe === "gif" ||
                        fe === "bmp" ? (
                        <img
                          src={file.imageLink}
                          alt={file.imageName}
                          className={styles.imageLink}
                        />
                      ) : fe === "mp3" ||
                        fe === "wav" ||
                        fe === "ogg" ||
                        fe === "aac" ||
                        fe === "m4a" ||
                        fe === "wma" ||
                        fe === "flac" ? (
                        <audio
                          src={file.imageLink}
                          controls={true}
                          className={styles.audio}
                        />
                      ) : (
                        <div className={styles.imageLink}>
                        <AiFillFileText size={80} color="#f8fefc" />
                        </div>
                      )}
                    </div>
                    <p className={styles.lable}>{file.imageName}</p>  
                      <AiOutlineLink onClick={() => share(file.imageLink)} className={styles.link} size={20} color="#f8fefc" />{" "}
                  </div>
                )}
              </div>
            );
          },
        )}
      </div>
      {showtoast() ? (
        <div className="toast toast-end">
        <div className="alert alert-info">
          <span>Copyed link to clipboard!</span>
        </div>
      </div>
      ) : (
        <></>
      )}
    </>
  );
}
