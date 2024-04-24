import {
  addFirebaseData,
  deleteFirebaseData,
  getFirebaseData,
} from "./useFirebaseApi";
import { IDatasetsKpi } from "@/interface/kpi";

export const useKpiData = () => {
  const TIME_OUT = 500;

  // get graph data
  const fetchKpiData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = getFirebaseData("KPI");
        resolve(data);
      }, TIME_OUT);
    });
  };

  // delete graph data
  const deleteKpiData = async (id: string) => {
    await deleteFirebaseData("KPI", id);
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

  // add graph data
  const fetchAddKpiData = (kpiData: { datasets: IDatasetsKpi[] }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = addFirebaseData("KPI", kpiData);
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
