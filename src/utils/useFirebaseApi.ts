const API =
  "https://firestore.googleapis.com/v1/projects/test-yxir/databases/(default)/documents/Dashboard";

import { IProduct } from "@/interface/product";
import { db } from "@/utils/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

export const getFirebaseData = async (nameCollection: string) => {
  const data = collection(db, nameCollection);
  const dataSnapshot = await getDocs(data);
  const dataList = dataSnapshot.docs.map((doc: any) => {
    return { ...doc.data(), ...{ id: doc.id } };
  });
  return dataList;
};

export const getKpiData = async () => {
  const data = await getFirebaseData("KPI");
  return data;
};

export const getProductData = async () => {
  try {
    const data = await getFirebaseData("Product");
    return data;
  } catch (e) {
    console.error("Error get document: ", e);
  }
};

export const addProductData = async (data: IProduct) => {
  try {
    const docRef = await addDoc(collection(db, "Product"), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const deleteProductData = async (id: string) => {
  try {
    await deleteDoc(doc(db, "Product", id));
  } catch (e) {
    console.error("Error delete document: ", e);
  }
};
