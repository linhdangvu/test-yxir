import { IProduct } from "@/interface/product";
import { db } from "@/utils/firebase";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { getFirebaseData } from "./useFirebaseApi";
import { IDatasetsKpi, IKpi } from "@/interface/kpi";

export const useKpiData = () => {
  const TIME_OUT = 500;

  const getKpiData = async () => {
    try {
      const data = await getFirebaseData("KPI");
      return data;
    } catch (e) {
      console.error("Error get document: ", e);
    }
  };

  const fetchKpiData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = getKpiData();
        resolve(data);
      }, TIME_OUT);
    });
  };

  const addKpiData = async (data: { datasets: IDatasetsKpi[] }) => {
    try {
      const docRef = await addDoc(collection(db, "KPI"), data);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteKpiData = async (id: string) => {
    try {
      await deleteDoc(doc(db, "KPI", id));
    } catch (e) {
      console.error("Error delete document: ", e);
    }
  };

  const firebaseToKPI = (datasets: IDatasetsKpi[] | any) => {
    const default_data: any = {
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: false,
            text: "KPI Chart Example",
          },
        },
      },

      data: {
        labels: [
          "Janvier",
          "Fevrier",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juillet",
          "Aout",
          "Septembre",
          "Octobre",
          "Novembre",
          "Decembre",
        ],
        datasets: [],
      },
    };
    default_data["data"]["datasets"] = datasets;
    return default_data;
  };

  const fetchAddKpiData = (kpiData: { datasets: IDatasetsKpi[] }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = addKpiData(kpiData);
        resolve(data);
      }, TIME_OUT);
    });
  };

  return {
    fetchKpiData,
    firebaseToKPI,
    fetchAddKpiData,
    deleteKpiData,
  };
};
