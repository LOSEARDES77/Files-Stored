import { onSnapshot, collection } from "firebase/firestore"
import { database } from "@/firebaseConfig"
import { useState, useEffect } from "react"

let files = collection(database, "files")

export const fetchFiles =  ({parentId, email}:{parentId:string, email: string}) => {
    const [fileList, setFileList] = useState<ArrayType>([{
        imageLink: "", id: ""
    }])

    const getFiles =  () => {
        if (parentId === ""){
            onSnapshot(files, (response) => {
                setFileList(
                    response.docs
                        .map((item) => {
                            const data = item.data();
                            return { ...data, id: item.id, parentId: data.parentId, email: data.email };
                        })
                        .filter((item) => item.parentId === "")
                );
            });
        }else{
            onSnapshot(files, (response) => {
                setFileList(response.docs.map((item) => {
                    return { ...item.data(), id: item.id, parentId: item.data().parentId }
                }).filter((item) => item.parentId === parentId)
                )
            })
        }
    }

    useEffect(() => {
        getFiles()
    }, [parentId])
    return {fileList}
}