import { IProduct } from "@/interface/product";
import { db } from "@/utils/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getFirebaseData } from "./useFirebaseApi";
import { useState } from "react";

export const useProduct = () => {
  const [productData, setProductData] = useState<IProduct[]>([]);
  const TIME_OUT = 500;

  const setData = (data: IProduct[]) => {
    setProductData(data);
  };

  const getData = () => {
    return productData;
  };

  const fetchProductData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = getFirebaseData("Product");
        resolve(data);
      }, TIME_OUT);
    });
  };

  const addProductData = async (data: IProduct) => {
    try {
      const docRef = await addDoc(collection(db, "Product"), data);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const editProductData = async (id: string, data: any) => {
    try {
      const docRef = await updateDoc(doc(db, "Product", id), data);
      console.log("Document edit with ID: ", docRef);
      //   return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteProductData = async (id: string) => {
    try {
      await deleteDoc(doc(db, "Product", id));
    } catch (e) {
      console.error("Error delete document: ", e);
    }
  };

  const firebaseToProduct = (data: any) => {
    const default_product = {
      title: "Liste de produit",
      columns: [
        { title: "Nom de produit", key: "title", filtered: false },
        { title: "Quantite", key: "qtt", filtered: false },
        { title: "Industry", key: "fac", filtered: false },
        { title: "Date de creation", key: "createdDate", filtered: false },
      ],
      rows: [],
    };

    default_product["rows"] = data;
    return default_product;
  };
  const fetchAddProductData = (prod: IProduct) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = addProductData(prod);
        resolve(data);
      }, TIME_OUT);
    });
  };

  return {
    deleteProductData,
    addProductData,

    fetchProductData,
    firebaseToProduct,
    fetchAddProductData,
    setData,
    getData,
    productData,
    editProductData,
  };
};
