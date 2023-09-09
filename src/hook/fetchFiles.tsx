import { onSnapshot, collection } from "firebase/firestore"
import { database } from "@/firebaseConfig"
import { useState, useEffect } from "react"

let files = collection(database, "files")

export const fetchFiles =  () => {
    const [fileList, setFileList] = useState<ArrayType>([{
        imageLink: "", id: ""
    }])
    

    useEffect(() => {
      return onSnapshot(files, (response) => {
        setFileList(response.docs.map((item) => {
            return { ...item.data(), id: item.id}
        }))
        })  
    }, [])
    return {fileList}
}