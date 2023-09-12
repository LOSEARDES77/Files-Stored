import { onSnapshot, collection } from "firebase/firestore"
import { database } from "@/firebaseConfig"
import { useState, useEffect } from "react"

let files = collection(database, "files")

export const fetchFiles =  (parentId: string, email: string) => {
    const [fileList, setFileList] = useState<ArrayType>([{
        imageLink: "", id: ""
    }])

    const getFiles = () => {
        if (parentId === "") {
          onSnapshot(files, (response) => {
            setFileList(
              response.docs
                .map((item) => {
                  const data = item.data();
                  return { ...data, id: item.id, parentId: data.parentId, email: data.owner };
                })
                .filter((item) => item.parentId === "" && item.email === email)
            );
          });
        } else {
          onSnapshot(files, (response) => {
            setFileList(
              response.docs
                .map((item) => {
                  const data = item.data();
                  return { ...data, id: item.id, parentId: data.parentId, email: data.owner };
                })
                .filter((item) => item.parentId === parentId && item.email === email)
            );
          });
        }
    };

    useEffect(() => {
        getFiles()
    }, [parentId, email])
    return {fileList}
}