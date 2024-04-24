import { db } from "@/utils/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

// Read
export const getFirebaseData = async (nameCollection: string) => {
  const data = collection(db, nameCollection);
  const dataSnapshot = await getDocs(data);
  const dataList = dataSnapshot.docs.map((doc: any) => {
    return { ...doc.data(), ...{ id: doc.id } };
  });
  return dataList;
};

// Create
export const addFirebaseData = async (nameCollection: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, nameCollection), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Delele
export const deleteFirebaseData = async (
  nameCollection: string,
  id: string
) => {
  try {
    await deleteDoc(doc(db, nameCollection, id));
  } catch (e) {
    console.error("Error delete document: ", e);
  }
};
