import { storage } from "@/firebaseConfig"
import { ref, deleteObject,  } from "firebase/storage"

export const fileDeletion = (file: any, runner: () => void  ) => {
    const storageRef = ref(storage, `files/${file.name}`)
    deleteObject(storageRef).then(() => {
        runner()
    })

}