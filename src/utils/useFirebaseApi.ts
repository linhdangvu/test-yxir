const API =
  "https://firestore.googleapis.com/v1/projects/test-yxir/databases/(default)/documents/Dashboard";

import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";

const getFirebaseData = async (nameCollection: string) => {
  const data = collection(db, nameCollection);
  const dataSnapshot = await getDocs(data);
  const dataList = dataSnapshot.docs.map((doc: any) => doc.data());
  return dataList;
};

export const getKpiData = async () => {
  //   const data = collection(db, "KPI");
  //   const dataSnapshot = await getDocs(data);
  //   const dataList = dataSnapshot.docs.map((doc: any) => doc.data());
  const data = await getFirebaseData("KPI");
  return data;
};
