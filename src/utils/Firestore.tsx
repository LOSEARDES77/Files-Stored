import { database } from "@/firebaseConfig";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

let files = collection(database, "files")

export const addFiles = (imageLink: string, imageName:string) => {
    try {
        addDoc(files, {
        imageLink: imageLink,
        imageName: imageName,
        isFolder: false,
        })
    }catch(e){
        console.log(e)
    }
}

export const addFolder = (payload: {folderName: string, isFolder: boolean, FileList: object}) => {
    try {
        addDoc(files, {
            folderName: payload.folderName,
            isFolder: true,
            FileList: payload.FileList
        })
    }catch(e){
        console.log(e)
    }
}