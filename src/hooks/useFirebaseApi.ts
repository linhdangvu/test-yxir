const API =
  "https://firestore.googleapis.com/v1/projects/test-yxir/databases/(default)/documents/Dashboard";

import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";

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
