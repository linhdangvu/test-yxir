import { IProduct } from "@/interface/product";
import { db } from "@/utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import {
  addFirebaseData,
  deleteFirebaseData,
  getFirebaseData,
} from "./useFirebaseApi";
import { useState } from "react";

export const useProduct = () => {
  const [productData, setProductData] = useState<IProduct[]>([]);
  const TIME_OUT = 500;

  // set data for product state, but not working well ???
  const setData = (data: IProduct[]) => {
    setProductData(data);
  };

  // get product data
  const fetchProductData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = getFirebaseData("Product");
        resolve(data);
      }, TIME_OUT);
    });
  };

  // modify data on firebase
  const editProductData = async (id: string, data: any) => {
    try {
      const docRef = await updateDoc(doc(db, "Product", id), data);
      console.log("Document edit with ID: ", docRef);
      //   return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // delete data
  const deleteProductData = async (id: string) => {
    await deleteFirebaseData("Product", id);
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

  // add product data
  const fetchAddProductData = (prod: IProduct) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = addFirebaseData("Product", prod);
        resolve(data);
      }, TIME_OUT);
    });
  };

  return {
    productData,
    deleteProductData,
    fetchProductData,
    firebaseToProduct,
    fetchAddProductData,
    setData,
    editProductData,
  };
};
