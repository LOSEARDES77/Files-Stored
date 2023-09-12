import { database } from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const files = collection(database, "files");

export const addFiles = (
  imageLink: string,
  imageName: string,
  parentId: string,
  email: string
) => {
  try {
    addDoc(files, {
      imageLink: imageLink,
      imageName: imageName,
      isFolder: false,
      parentId: parentId,
      owner: email
    });
  } catch (e) {
    console.log(e);
  }
};

export const addFolder = (payload: {
  uuid: string;
  folderName: string;
  isFolder: boolean;
  FileList: object;
  parentId: string;
  email: string;
}) => {
  try {
    addDoc(files, {
      uuid: payload.uuid,
      folderName: payload.folderName,
      isFolder: true,
      FileList: payload.FileList,
      parentId: payload.parentId,
      owner: payload.email
    });
  } catch (e) {
    console.log(e);
  }
};
